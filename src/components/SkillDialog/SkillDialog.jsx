import React,{useState,useEffect,useContext} from 'react'

import UserContext from '../../context/context'
import { TextField,Chip,Grid,Button,Dialog, DialogTitle,DialogContent,DialogActions,DialogContentText} from '@material-ui/core';
import {Typography,Box,Select,MenuItem,FormControl,InputLabel} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


import axios from 'axios'

import { useForm } from '../../utils/hook';

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
    secondRow:{
      marginTop:"2rem"
    }
  }))

export default function SkillDialog(props) {
    const classes = useStyles();
    const { userData } = useContext(UserContext);

    const { onClose, open,data} = props;
    const[skills,setSkills]=useState([])
    const[skillName,setSkillName]=useState('')
    useEffect(()=>{
        setSkills(
            data)
    },[props.data])


    const handleClose = () => {
        onClose(open);
    };

    
    const onChange=(event)=>{
        setSkillName(event.target.value);
    }
    const handleDelete=(skill)=>{
        axios.delete(`http://localhost:5000/skill`,{
            skill
        },{
          headers:{
              authorization: userData.tokenNumber
      }
      })
      .then((res)=>{
        onClose(open);
        console.log(res);
      })
      .catch((err)=>{
          console.log(err);
      })

    }

    const onSubmit=()=>{
        axios.post(`http://localhost:5000/skill`,{
        skill:skillName
        },{
          headers:{
              authorization: userData.tokenNumber
      }
      })
      .then(()=>{
        onClose(open);
        setSkillName('')
      })
        
    }
  return (
     <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose} 
      aria-labelledby="simple-dialog-title" 
      open={open}>
      <DialogContent>
          <Grid container direction="row" spacing={1}>
          <Grid item xs={12}>
          {skills && skills.length!==0 && skills.map((skill,index)=>(
                <Chip  onDelete={()=>handleDelete(skill.skill)} className={classes.skillnames} key={index} color="primary" label={skill.skill}/>
         ))}
          
            </Grid>
              <Grid item xs={12}>
                <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                label="Add Skills"
                name="skills"
                autoFocus
                value={skillName}
                onChange={onChange}
                />
            </Grid>
        </Grid>
      
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button disabled={(skillName!=='')?false:true} onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      
      </Dialog>
  );
}
