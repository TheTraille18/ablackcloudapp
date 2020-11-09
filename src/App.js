import React, {useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TopBar from './components/TopBar'
import { Auth, Cache } from 'aws-amplify';
import history from './history'
import { confirmAlert } from 'react-confirm-alert'; // Import


import Welcome from './components/Welcome';
import Home from './components/Home';
import TaskManagerApp from './components/TaskManagerApp'
import Profile from './components/Profile'

import './App.css';

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [logged, setLogged] = useState(false)
  const [render, setRender] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
    try {
      AuthUser()
    }catch(err){
      console.log(err)
    }
  },[])

  async function AuthUser(){
    await Auth.currentAuthenticatedUser()
    .then((user) => {
      if (user !== undefined){
        setUser(user.username)
        setLogged(true)
        Cache.setItem("isLogged",true)
        localStorage.setItem("user",user.username)
        localStorage.setItem("isLogged",true)
      }
    })
    .catch((err) => {
      Cache.setItem("isLogged",false)
      console.log(err)
    })
  }

  const UserLogin = () => {
    AuthUser()
    setLogged(true)
    Cache.setItem("isLogged",true)
    localStorage.setItem("isLogged",true)
    renderLoginTopBar()
  }

  const ProtectedRoute = ({component: Comp, logged, path, user }) => {
    var isLogged = localStorage.getItem("isLogged") === "true" 
    var currentUser = localStorage.getItem("user")
    return (
      <Route path={path} 
        render={ props => {
          return isLogged ? <Comp logged={isLogged} user={currentUser} {...props}/> : <Redirect to="/" />

      }}/>
    )
  }

  const SignOut = async () => {
    try {
      await Auth.signOut();
      Cache.setItem("isLogged",false)
      Cache.setItem('CurrentUser', "")
      Cache.setItem('AUTH_USER_TOKEN_KEY', "")
      localStorage.setItem("user","")
      localStorage.setItem("isLogged",false)
      setLogged(false)
      setUser()
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  const renderLoginTopBar = () => {
    setRender(!render)
  }

  const toggleLogin = () => {
    setOpenLogin(!openLogin)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'transparent !important'
    },
    loginError: {
      textAlign: 'center',
      ' & p': {
        position: 'relative',
        top: -10,
      },
      ' & Button': {
        color: 'white',
        width: 100,
        backgroundColor: 'rgba(45, 8, 177, 0.9)',
        borderColor: 'white'
      }
    },
    userNameStyle: {
      position: 'absolute',
      right: '100px', 
    }
  }));
  const classes = useStyles();
  const toggleSignOut = () => {
    confirmSignOut() 
  }
  const confirmSignOut = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={classes.loginError}>
              <h1>Are you sure?</h1>
              <p>You want to sign out?</p>
              <Button variant="outlined" color="primary" onClick={() => {
                SignOut()
                onClose()
              }}>
                Yes
              </Button>
              <Button variant="outlined" color="primary" onClick={onClose} >
                  No
              </Button>
          </div>
        );
      }
    });
  }
  return (
    <div className="App">
      <div>
        <Router history={history}>          
        <TopBar openConfirm={toggleSignOut} openLogin={toggleLogin} renderLogin={renderLoginTopBar} user={user}/>
          <div>
              <Switch>
                  <Route path="/" exact render={(props) => (<Welcome {...props} logged={logged} UserLogin={UserLogin}/>)}/>
                  <ProtectedRoute path="/apps" logged={logged} component={Home}/>
                  <ProtectedRoute path="/taskmanagerapp" user={localStorage.getItem("user")} logged={logged} component={TaskManagerApp}/>
                  <ProtectedRoute path="/profile" logged={logged} component={Profile}/>
              </Switch>
          </div>
        </Router>
      </div>
    </div>
    
  );
}

export default App;