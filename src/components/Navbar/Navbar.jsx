import React,{useContext} from 'react';
import { Link } from "react-router-dom"; 
import clsx from 'clsx';

import { makeStyles } from '@mui/styles'
import { useTheme, alpha } from '@mui/material/styles';
import {
  AppBar,Toolbar,List,Typography,ListItem,ListItemText,
  Drawer, Box, IconButton, InputBase
} from '@mui/material';
import {
  Search as SearchIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle
} from '@mui/icons-material'
import Badge from '@mui/material/Badge';

import UserContext from '../../context/context' 

const drawerWidth = 240;

// For search icon refer : https://codesandbox.io/s/zwgu4?file=/demo.js
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    ...theme.typography.fontPrime,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  heading : {
    ...theme.typography.fontPrime,
    fontSize : "2rem",
    fontWeight : "600",
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }, 
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    background: '#white',
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    background: theme.palette.primary.main,
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  menuElement : {
    ...theme.typography.fontPrime
  },
  notifContainer:{
    // position:"fixed",
    [theme.breakpoints.up('md')]: {
      display:"none"
    },
  },
  button: {
    margin: "0.5rem",
    width: "6rem",
    height: "2.8rem",
    borderRadius:"10%"
  }
 
}));

export default function Navbar({open,setOpen}) {
  const classes = useStyles();
  const theme = useTheme();
  const { userData,setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
      token: null,
      loggedIn:false
    });
    localStorage.setItem('auth-token', '');
    console.log("logging out");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar  elevation={0} color="primary" position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
        <Toolbar>
            <Box display="flex" width="30%">
              <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, open && classes.hide)}>
                <MenuIcon />
              </IconButton>
              <Typography component="span" variant="h6" noWrap className={classes.heading}>
                SeniorMentor
              </Typography>
            </Box>
            <Box display="flex" width="70%" justifyContent="space-between">
              <Box display="flex" className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
                
              </Box>
              <Box display="flex" mr={0.5}>
                <IconButton aria-label="show new notifications" color="inherit" component={Link} to="/notifications">
                  <Badge badgeContent={'+'} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  // aria-controls={}
                  aria-haspopup="true"
                  // onClick={}
                  color="inherit"
                  component={Link}
                  to="/profile"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
            </Box>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open} classes={{paper: classes.drawerPaper,}}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List>
            <ListItem button component={Link} to={'/'} key="0">
              <ListItemText primary="Home" />
            </ListItem>

            {(!userData.loggedIn || !userData.token ) && (
              <ListItem button component={Link} to={'/login'} key="1">
              <ListItemText primary="Login" />
            </ListItem>
            )}
            
            {(!userData.loggedIn || !userData.token ) && (
              <ListItem button component={Link} to={'/register'} key="2">
              <ListItemText primary="Register" />
            </ListItem>
            )}
            
            {userData.loggedIn && (
            <ListItem button component={Link} to={'/community'} key="3">
              <ListItemText primary="Community" />
            </ListItem>
            )}

            {userData.loggedIn && (
            <ListItem button component={Link} to={'/chat'} key="4">
              <ListItemText primary="Chat" />
            </ListItem>
            )}

            {userData.loggedIn && userData.token && (
            <ListItem button component={Link} to={`/profile/view/${userData.token.userId}`} key="5">
              <ListItemText primary="My Profile" />
            </ListItem>
            )}

            {userData.loggedIn && (
            <ListItem className={classes.notifContainer} button component={Link} to={'/notifications'} key="6">
              <ListItemText primary="Notifications" />
            </ListItem>
            )}

            {userData.loggedIn && (
              <ListItem button onClick={logout} component={Link} to={'/'} key="7">
              <ListItemText primary="Logout" />
            </ListItem>)
            }
           
        </List>
      </Drawer>
      
        
    </div>
  );
}