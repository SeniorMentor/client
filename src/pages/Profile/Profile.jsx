import React,{useEffect,useContext,useState} from 'react';
import axios from 'axios'

import {Typography,Grid,Button,Chip,IconButton} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import { makeStyles } from '@mui/styles';

import defaultUser from '../../assets/img/defaultUser.jpg'

import UserContext from '../../context/context'

import UserInfoMenu from '../../components/UserInfoMenu/UserInfoMenu'
import IntroDialog from '../../components/IntroDialog/IntroDialog';
import SkillDialog from '../../components/SkillDialog/SkillDialog'
import { profileApi } from '../../utils/apis';
import { clientGet } from '../../utils/apiClient';
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const useStyles = makeStyles((theme) => ({
  
  messageAndFriends:{
    marginTop:"1rem",
    marginBottom:"1rem",
  },
  skillnames:{
    margin:"3px"
  },
  profileImage:{
    width: "80%",
    height: "100%",
    objectFit:"contain",
  },
  editprofileImage:{
    width: "80%",
    height: "80%",
    objectFit:"contain",
  },
  secondRow:{
    marginTop:"2rem"
  },
  mediainput: {
    display: 'none',
  },

}))
export default function Profile() {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  
  const[response, setResponse] = useState({});
  const[changeflag,setChangeflag]=useState(0)
  const[editflag,setEditFlag]=useState(false)
  const[introOpen,setIntroOpen]=useState(false)
  const[skillOpen,setSkillOpen]=useState(false)
  const[imageData,setImageData]=useState('')

  const handleIntroDialogOpen = () => {
      setIntroOpen(true);
  };
  const handleIntroDialogClose = () => {
    setIntroOpen(false);
  }; 

  const handleSkillDialogOpen = () => {
    setSkillOpen(true);
};
const handleSkillDialogClose = () => {
  setSkillOpen(false);
}; 

  let userId = null;
  if(userData && userData.token) {
    userId = userData.token.userId;
  }
  const arr = window.location.href.split("/"); 
  const currentProfileId = arr[arr.length-1];
  useEffect(() => {
    let endpoint = (currentProfileId === 'profile') ? profileApi.point() : profileApi.get(currentProfileId); 
    clientGet(endpoint,null,true)
      .then((res) => {
        const resp = res.data;
        setResponse(resp);
        setImageData(resp.imageLink)
      })
  }, [changeflag])

  function uploadImage(e) {
    // console.log(e.target.files);
    
    // stores a readable instance of 
    let imageFormObj = new FormData();
    imageFormObj.append("attachment", e.target.files[0]);

    // the image being uploaded using multer
    axios.put(`${process.env.REACT_APP_API_ENDPOINT}/profile`,imageFormObj,{
            headers:{
                authorization: userData.tokenNumber
        }})
        .then((responsenew)=>{
          setResponse(responsenew)
          // setImageData(responsenew.imageLink)
          setChangeflag(changeflag+1)
        })
  } 
  return (
    <Grid container>
      <Grid container direction="row" sx={{p:3}}>
        <Grid item xs={12} sm={4}>
          <img 
            className={editflag?classes.editprofileImage:classes.profileImage} 
            src={imageData?imageData:defaultUser} 
            alt=""
          />
          {editflag && (
            <>
          <input
          onChange={(event)=>{uploadImage(event)}}
          accept="image/*"
          className={classes.mediainput}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file" >
          <Button  size="medium" variant="contained" color="primary" component="span" style={{marginTop:"1rem", marginLeft:"0.5rem"}}>
            Upload
          </Button>
        </label>
        </>
        )}

        </Grid>
        
        <Grid item xs={11} sm={7}> 
          <Grid>
            <Typography variant="h4">{response.firstName} {response.lastName}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{response.year} , {response.branch}</Typography>
            
            <Typography variant="h6">About</Typography>
            <Typography variant="body1">{response.bio}</Typography>
          </Grid>
          <Grid className={classes.messageAndFriends}>
            {/* <Button color="primary">Add Friend</Button> */}
            {((userId!==response._id)) && <Button  color="primary">Message</Button>}
            {/* <Button  color="primary" startIcon={<CheckIcon />}>Friends</Button> */}
            {(userId===response._id) && (<Button  color="primary" onClick={(()=>{setEditFlag(!editflag)})}>{editflag?"Done":"Edit Profile"}</Button>)}
          </Grid>
        </Grid>
        {editflag && (
          <Grid item xs={1}>
          <IconButton aria-label="Comment" onClick={handleIntroDialogOpen} size="large">
              <CreateIcon />
            </IconButton>
          </Grid>

        )}
        
      </Grid>
      <Grid container  direction="row" sx={{p:3}}>
        <Grid item xs={12} sm={3}>
            <Typography variant="h6">Skills 
            

            </Typography>
            
            {response.skills && response.skills.length!==0 && response.skills.map((skill,index)=>(
              <Chip className={classes.skillnames} key={index} color="primary" label={skill.skill}/>
           ))}
           
          
        </Grid>
        <Grid item sm={1}>
        {editflag && (
          <Grid item xs={1}>
            <IconButton aria-label="Comment" onClick={handleSkillDialogOpen} size="large">
              <CreateIcon />
            </IconButton>
          </Grid>

        )}
        </Grid>
        <Grid  className={classes.secondRow} item xs={12} sm={8}>
          <UserInfoMenu editflag={editflag} changeflag={changeflag} setChangeflag={setChangeflag} data={response}/>      
        </Grid>
      </Grid>
      
      <IntroDialog data={response} open={introOpen} changeflag={changeflag} setChangeflag={setChangeflag} onClose={handleIntroDialogClose}/>
      <SkillDialog data={response.skills} changeflag={changeflag} setChangeflag={setChangeflag} open={skillOpen} onClose={handleSkillDialogClose}/>

  </Grid>
  );
}
