import React, {useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TopBar from './components/TopBar'
import Modal from '@material-ui/core/Modal';
import Login from './components/Login';
import { Auth, Cache } from 'aws-amplify';
import history from './history'


import Welcome from './components/Home';
import TaskManagerApp from './components/TaskManagerApp'

import './App.css';

function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignOutConfirm, setSignOutConfirm] = useState(false)

  const handleClose = () => {
    setOpenLogin(!openLogin)
  }

  const SignOut = async () => {
    try {
      await Auth.signOut();
      console.log("Signing Out")
      Cache.setItem('CurrentUser', "")
      Cache.setItem('AUTH_USER_TOKEN_KEY', "")
      toggleSignOut()
    } catch (error) {
        console.log('error signing out: ', error);
    }

  }

  const toggleSignOut = () => {
    setSignOutConfirm(!openSignOutConfirm)
  }

  const toggleLogin = () => {
    setOpenLogin(!openLogin)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'transparent !important'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    userNameStyle: {
      position: 'absolute',
      right: '100px', 
    },
    signOutModal: {
      position: 'absolute',
      backgroundColor: 'black',
      width: 200,
      color: 'white',
      right: '45%', 
      top: '30%',
      border: '2px solid #050',
      borderColor: 'black',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      backgroundSize: "cover",
      ' & h2': {
        position: 'relative',
        left: '25%',
        width: 100,
      },
      ' & div': {
        position: 'relative',
        left: '15%',
        width: 180,
      }
    },
    login: {
      position: 'absolute',
      width: 400,
      right: '40%', 
      top: '30%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid black',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  return (
    <div className="App">
      <Modal
          open={openSignOutConfirm}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
        <div className={classes.signOutModal}>
          <h2>Sign Out</h2>
          <div>
            <Button type="submit" onClick={toggleSignOut} color="inherit">No</Button>
            <Button type="submit" onClick={SignOut} color="inherit">Yes</Button>
          </div>
        </div>
      </Modal>
      <Modal
          open={openLogin}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
      <div className={classes.login}>
        <Login closeLogin={handleClose}/>
      </div>
      </Modal>
      <div>
        <Router history={history}>
        <TopBar openConfirm={toggleSignOut} openLogin={toggleLogin}/>
          <div>
              <Switch>
                  <Route path="/" exact component={Welcome}/>
                  <Route path="/taskmanagerapp" component={TaskManagerApp}/>
              </Switch>
          </div>
        </Router>
      </div>
    </div>
    
  );
}

export default App;