import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import EventAnalytics from './EventAnalytics'
import PostAnalytics from "./PostAnalytics";

 
export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }} textAlign="center">
      <TabContext value={value}>
        <Box sx={{ml:2, borderBottom: 1, borderColor: 'divider' }}>
          <TabList 
          onChange={handleChange} 
          aria-label="lab API tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          >
            <Tab label="Events" value="1" />
            <Tab label="Posts" value="2" />
            <Tab label="Misc" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <EventAnalytics />
        </TabPanel>
        <TabPanel value="2">
          <PostAnalytics />
        </TabPanel>
        <TabPanel value="3"> Work in Progress </TabPanel>
      </TabContext>
    </Box>
  );
}
