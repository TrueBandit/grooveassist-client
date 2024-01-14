import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyProgressions from '../creativeHub/MyProgressions';
import CommunityProgressions from '../creativeHub/CommunityProgressions';

function CustomTabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CreativeHub() {

  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("userLoggedIn")) {
      navigate('/login');
    }
  }, []);

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h6">Creative Hub</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="My Progressions" {...a11yProps(0)} />
          <Tab label="Community Progressions" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MyProgressions />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CommunityProgressions />
      </CustomTabPanel>
    </Box>
  );
}
