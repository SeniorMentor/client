import './App.css';
import React,{useState,useEffect} from 'react'
import clsx from 'clsx';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import jwt_decode from "jwt-decode";

import UserContext from './context/context';
import { SocketContext, socket}  from "./context/socketContext"; 
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import Community from './pages/Community/Community'
import EventsPage from './pages/EventsPage/EventsPage'
import MobilePostForm from './pages/MobilePostForm/MobilePostForm'
import Chat from './pages/Chat/Chat' 
import ChatPersonal from './pages/ChatPersonal/ChatPersonal' 
import EachPost from './pages/EachPost/EachPost'
import Intro from './pages/Intro/Intro'
import AddEvent from './pages/Events/AddEvent'
import AnalyticsDashboard from './pages/Analytics/AnalyticsDashboard';
import NotificationPage from "./pages/NotificationPage/NotificationPage";

import { makeStyles } from '@mui/styles';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    marginBottom:"1.5rem"
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft:-drawerWidth,
    marginTop: "5rem",

  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    [theme.breakpoints.down('md')]: {
      display: 'none',}
  },
  postCard:{
    margin:'auto'
  },
  shortcut:{
    position:"fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        display:"none"
      },
}

  
}));


function App() {
  const classes = useStyles();
  const [open,setOpen]=useState(false)
  const [userData, setUserData] = useState({
    token: undefined,
    loggedIn:false,
    tokenNumber:undefined
  });

  
  useEffect(() => {
    const checkLoggedIn = async () => {
      let tokenval = localStorage.getItem('auth-token');
      if (!tokenval || tokenval === '' || jwt_decode(tokenval).exp < Date.now() / 1000) {
        console.log("Expired token reset")
        localStorage.setItem('auth-token', '');
        setUserData({
          token:null,
          loggedIn:false,
          tokenNumber:null
        });
      } else {
        var decoded = jwt_decode(tokenval);
        setUserData({
          token:decoded,
          loggedIn:true,
          tokenNumber:tokenval
        });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <div className={classes.root}>
    <Router>
    <UserContext.Provider value={{ userData, setUserData }}>
      <SocketContext.Provider value={socket}>
        { userData.loggedIn && <Navbar open={open} setOpen={setOpen}/> }
        <div className={clsx(classes.content, {[classes.contentShift]: open })}>
          { userData.loggedIn && <Route exact path="/" component={Home} />}
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/chat/pc/:groupName" component={ChatPersonal} /> {/* Personal chat*/}
          <Route exact path="/community" component={Community} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/view/:id" component={Profile} />
          <Route exact path="/events" component={EventsPage} />
          <Route exact path="/createPost" component={MobilePostForm} />
          <Route exact path="/post/:id" component={EachPost} />
          <Route exact path="/events/add" component={AddEvent} />
          <Route exact path="/analytics" component={AnalyticsDashboard} />
          <Route exact path="/notifications" component={NotificationPage} />
        </div>
        {!userData.loggedIn && <Route exact path="/" component={Intro} />}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        </SocketContext.Provider>
      </UserContext.Provider>
      </Router>
  </div>
  );
}

export default App;
