import { useState, useEffect, useCallback } from 'react';
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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';

import { analyticsApi, publicApi } from '../../utils/apis'
import {clientGet, clientPost} from '../../utils/apiClient'
import { getRandCol } from '../../utils/helpers'


const eventResultsTable = (eventResults) => {
  return (
    <Table sx={{ minWidth: 200 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Tag Name</TableCell>
          <TableCell align="right">Frequency</TableCell>
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

const tagLevel = [
  {
    label: "Level 0",
    value: 0,
  },
  {
    label: "Level 1",
    value: 1,
  },
  {
    label: "Level 2",
    value: 2,
  }
]

export default function PostAnalytics() {
  const [tags, setTags] = useState({});
  const [eventResults, setEventResults] = useState(null);
  const [date, setDate] = useState(new Date());
  useEffect(()=>{
    clientGet(publicApi.tags(), {})
      .then((res)=>{
        res.data.forEach((tag) => {
          setTags((prev) => { prev[tag._id] = tag; return prev; } );
        });
      });

  },[]);

  const getPostAnalytics = (tagLevel) => {
      clientPost(analyticsApi.posts(),{
      tagDepth: tagLevel,
      month: date.getMonth(),
      year: date.getFullYear(),
    },true)
      .then((res) =>{
        res = res.data;
        let result = [];
        Object.keys(res).forEach((id)=>{
          result.push({
            name: tags[id].name,
            value: res[id],
            fill:getRandCol()
          })
        })
        setEventResults(result)
      });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} padding={1}>
          <Grid item xs={12} sm={6}>
            <Paper sx={{p:1}}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DatePicker
                    views={['year', 'month']}
                    label="Year and Month"
                    value={date}
                    onChange={(newValue) => {setDate(newValue);}}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                  />
                  <Autocomplete
                    id="combo-box-demo"
                    options={tagLevel}
                    renderInput={(params) => <TextField {...params} label="Tag Depth" />}
                    onChange={(e,v)=>{ getPostAnalytics(v?.value) }}
                  />
                </Stack>
              </LocalizationProvider>
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
