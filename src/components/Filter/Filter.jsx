import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardHeader, Divider} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import {clientGet} from "../../utils/apiClient";
import {publicApi} from "../../utils/apis";
import { colors } from "../../utils/constants";

export default function Filter({ setCollege, setTag, applyFilter}) {

  const [colleges, setColleges] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    clientGet(publicApi.colleges(), {})
      .then((res)=>{
        res = res.data.map((data) => {
          return {
            id: data._id,
            label: data.name
          }
        });
        setColleges(res);
      });

    clientGet(publicApi.tags(), {})
      .then((res)=>{
        res = res.data.map((data) => {
          return {
            id: data._id,
            label: data.name
          }
        });
        setTags(res)
      })
  },[]);

  return (
    <Card sx={{mb:1, position: 'fixed', width: "16%",  background:colors.primary}}>
      <CardHeader title="Filter"/>
      <Divider />
      <CardActions>
        <Paper style={{width:"97%", padding:"1rem"}}>
          <Autocomplete
            sx={{mb:1}}
            fullWidth
            loading
            id="combo-box-demo"
            options={ colleges }
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="College"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
            onChange={(e,v)=>{  setCollege(v?.id) }}
          />
          <Autocomplete
            fullWidth
            loading
            id="combo-box-demo"
            options={ tags }
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password', // disable autocomplete and autofill
                }}
              />
            )}
            onChange={(e,v)=>{  setTag(v?.id) }}
          />
          <Button
            sx={{mt:1, background:colors.themeMain}}
            variant={"contained"}
            onClick={() => applyFilter()}
          > Filter </Button>
        </Paper>
      </CardActions>
    </Card>
  )
}
