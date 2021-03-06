import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { KeyboardDatePicker } from '@material-ui/pickers'

import { TextField,Grid,Button,Dialog,DialogContent,DialogActions} from '@mui/material';
import { makeStyles } from '@mui/styles';


import UserContext from '../../context/context'
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

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

export default function ProjectCardDialog(props) {
  const classes = useStyles();
    const { userData } = useContext(UserContext);

    const { onClose, open,data,changeflag,setChangeflag} = props;
    const[startDate,setStartDate]=useState(null)
    const[endDate,setEndDate]=useState(null)


    const[values,setValues]=useState({})

    useEffect(()=>{
        setValues({
            title:data.title,
            description:data.title,
            
        })
        setStartDate(data.startDate)
        setEndDate(data.endDate)
    },[props.data])

    const handleClose = () => {
        onClose(open);
    };

    
    const onChange=(event)=>{
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const onSubmit=()=>{
      if(data.projectId)
      {
      console.log("project", data); 
      axios.put(`${process.env.REACT_APP_API_ENDPOINT}/project`,{
        title:values.title,
        description:values.description,
        startDate:startDate,
        endDate:endDate,
        },{
          headers:{
              authorization: userData.tokenNumber,
      }
      })
      .then(()=>{
        setChangeflag(changeflag+1)
        onClose(open);
      })
        
    }
    else
    {
      axios.post(`${process.env.REACT_APP_API_ENDPOINT}/project`,{
        projectId:data.projectId,
        title:values.title,
        description:values.description,
        startDate:startDate,
        endDate:endDate,
        },{
          headers:{
              authorization: userData.tokenNumber,
      }
      })
      .then(()=>{
        setChangeflag(changeflag+1)
        onClose(open);
      })
        
    }

    
}
    

  

  const handlestartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };


    // useEffect(()=>{
    //     setValues({
    //         firstName:data.firstName,
    //         lastName:data.lastName,
    //         branch:data.branch,
    //         year:data.year
    //     })
    // },[props.data])

    
    
    

  return (
     <Dialog
      fullWidth
      maxWidth="sm"
      onClose={handleClose} 
      aria-labelledby="simple-dialog-title" 
      open={open}>
      <DialogContent>
          <Grid container direction="row" spacing={3}>
              <Grid item xs={12}>
                <TextField
                fullWidth
                multiline
                variant="outlined"
                margin="normal"
                required
                label="Title"
                name="title"
                autoFocus
                value={values.title}
                onChange={onChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                multiline
                fullWidth
                rows="6"
                variant="outlined"
                margin="normal"
                required
                label="Description"
                name="description"
                value={values.description}
                onChange={onChange}
                />
            </Grid>
          <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              style={{display:"inline", marginRight:"5px"}}
              label="Start Date"
              inputFormat="MM/dd/yyyy"
              value={startDate}
              onChange={handlestartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  style={{display:"inline", marginRight:"5px"}}
                  label="End Date"
                  inputFormat="MM/dd/yyyy"
                  value={endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

            </Grid>
        {/*    <Grid item xs={12} sm={6}>*/}
        {/*  <LocalizationProvider utils={AdapterDateFns}>*/}
        {/*  <KeyboardDatePicker*/}
        {/*  fullWidth*/}
        {/*  margin="normal"*/}
        {/*  label="End Date"*/}
        {/*  format="MM/dd/yyyy"*/}
        {/*  name="endDate"*/}
        {/*  value={endDate}*/}
        {/*  onChange={handleEndDateChange}*/}
        {/*  KeyboardButtonProps={{*/}
        {/*    'aria-label': 'change date',*/}
        {/*  }}*/}
        {/*/>*/}
        {/*  </LocalizationProvider>*/}
        {/*  */}
        {/*      */}
        {/*    </Grid>*/}
        {/*    */}
        </Grid>
      
          
        </DialogContent>
        <DialogActions>
        
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Delete
        </Button>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
          
        </DialogActions>
      
      </Dialog>
  );


        }
