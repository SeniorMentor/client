import React, {useState} from 'react'
// import { Form, Field } from 'react-final-form'
//import MuiThemeProvider from '@mui/styles/MuiThemeProvider'
import { ThemeProvider } from "@mui/styles";
// import getMuiTheme from '@mui/styles/getMuiTheme'
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import {Avatar,Button,TextField,Grid,Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

// const TextFieldAdapter = ({ input, meta, ...rest }) => (
//   <TextField
//     {...input}
//     {...rest}
//     onChange={(event, value) => input.onChange(value)}
//     errorText={meta.touched ? meta.error : ''}
//   />
// )
 
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}
 
export default function Component() {

  const [dateTime, setDateTime] = useState(new Date());
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  console.log(name);
  const handleChange = (newValue) => {
    setDateTime(newValue);
  };

  const handleSubmit = () => {

  };

  return (
    <ThemeProvider >
            <Grid container justifyContent="center" align="center" component="main" maxWidth="xs">
                <Grid item xs={6} md={6} lg={5}> 
                    <h1><EventTwoToneIcon sx={{ fontSize: 30 }}/> Add Event </h1>
                    <form onSubmit={handleSubmit}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Event Name"
                            defaultValue={name}
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                        />
                        <TextField
                            required
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            maxRows={4}
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                        />
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <DesktopDatePicker
                                style={{display:"inline"}}
                                label="Date"
                                inputFormat="MM/dd/yyyy"
                                value={dateTime}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <TimePicker
                                style={{display:"inline"}}
                                label="Time"
                                value={dateTime}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>   
                        </Stack>
                    </LocalizationProvider>
                    <Button
                        sx={{mt:2,  width: '50%'}}
                        type="submit"
                        color="secondary"
                        variant="contained"
                    >
                        Add Event
                    </Button>
                        
                    </form>
                </Grid>
            </Grid>
    </ThemeProvider>
  );
}
 