import { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip } from "recharts";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { analyticsApi, publicApi } from '../../utils/apis'
import { clientGet } from '../../utils/apiClient'
import { getRandCol } from '../../utils/helpers'


const eventResultsTable = (eventResults) => {
  return (
    <Table sx={{ minWidth: 200 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>College Name</TableCell>
          <TableCell align="right">Attendee Count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          eventResults.map((data,idx)=>{
            return (
              <TableRow
                key={idx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell align="right">{data.value}</TableCell>
                  
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

const eventResultsPieChart = (eventResults) => {
  return (
    <PieChart width={400} height={400}>
      <Tooltip />
      <Pie
          dataKey="value"
          isAnimationActive={false}
          data={eventResults}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
      />
  </PieChart>
  )
}

export default function EventAnalytics() {
    const [events, setEvents] = useState([]);
    const [colleges, setColleges] = useState({});
    const [selectedEvent, setSelectedEvent] = useState({});
    const [eventResults, setEventResults] = useState(null);

    useEffect(()=>{
        clientGet(publicApi.colleges(), {})
        .then((res)=>{
            res.data.forEach((clg) => {
              setColleges((prev) => { prev[clg._id] = clg; return prev; } );
            });
        });
        
        clientGet(analyticsApi.events(),{},true)
        .then((res)=>{
            res = res.data.map((data) => {
                return {
                    ...data,
                    label: data.title
                };
            });
            console.log(res);
            setEvents(res);
        });
        
    },[]); 
    
    const getEventAnalytics = async (id) => {
        if(!id) { return null; }
        let res = (await clientGet(analyticsApi.particularEvent(id),{},true))?.data;
        let result = [];
        res.forEach((elem)=>{
          result.push({
            name: colleges[elem._id].name,
            id: elem._id,
            value: elem.count,
            fill:getRandCol()
          })
        })
        setEventResults(result)
    }   

    return (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} padding={1}>
              <Grid item xs={12} sm={6}>
                <Paper sx={{p:1}}>
                  <Autocomplete
                      loading
                      id="combo-box-demo"
                      options={events}
                      sx={{ width: "80%" }}
                      renderInput={(params) => <TextField {...params} label="Events" />}
                      onChange={(e,v)=>{  setSelectedEvent(v); getEventAnalytics(v?._id); }}
                  />
                  {
                    eventResults && eventResultsTable(eventResults)
                  }
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Paper>
                <Box sx={{ml:2}}>
                  {
                    eventResults && eventResultsPieChart(eventResults)
                  }
                </Box>
              </Paper>
              </Grid>
            </Grid>
          </Box>
        </div>
    )
}