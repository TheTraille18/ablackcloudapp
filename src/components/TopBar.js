import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { Cache } from 'aws-amplify';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import BlackCloud from '../black-cloud.jpg';

export default function TopBar(props){
    const [open, setOpen] = useState(false);

    const handleLogin = () => {
      props.openLogin()
    }

    const handleSignOut = () => {
      props.openConfirm()
    }
    const handleOpen = () => {
        setOpen(!open)
      }

    const loginSignOut = () => {
        var currentUser = Cache.getItem('CurrentUser')
        if (currentUser){
          return (
            <div className={classes.userNameStyle}>
              <AccountCircleIcon />
              <Button onClick={handleSignOut} color="inherit">{Cache.getItem('CurrentUser')}</Button>
            </div>
          )
        }else{
          return (
            <div>
              <Button onClick={handleLogin} color="inherit">Login</Button>
            </div>
          )
        }
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
          width: 200,
          color: 'white',
          right: '45%', 
          top: '30%',
          border: '2px solid #050',
          borderColor: 'black',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          backgroundImage: `url(${BlackCloud})`,
          backgroundSize: "cover",
          ' & h2': {
            position: 'relative',
            left: '20%',
            width: 100,
          },
          ' & div': {
            position: 'relative',
            left: '10%',
            width: 180,
          }
        },
        paper: {
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
    <AppBar classes={{ root: classes.root }}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        {loginSignOut()}
      </Toolbar>
    </AppBar>
    )
} 