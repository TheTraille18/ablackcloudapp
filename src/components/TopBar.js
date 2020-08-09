import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { Auth } from 'aws-amplify';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';

export default function TopBar(props){
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState("")
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const [isLogged, setIsLogged] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    useEffect(() => {
      try {
        async function AuthUser(){
          const authedUser = await Auth.currentAuthenticatedUser();
          setUser(authedUser.username)
          console.log(authedUser);
          setIsLogged(true)
        }
        AuthUser()
      }catch(err){
        console.log(err)
      }
    },[])

    const handleLogin = () => {
      props.openLogin()
    }

    const handleUserMenu = (event) => {
      setAnchorEl(event.currentTarget);
      setOpenUserMenu(!openUserMenu )
    }

    const handleClose = () => {
      setOpenUserMenu(!openUserMenu)
    }

    const handleSignOut = () => {
      props.openConfirm()
    }
    const handleOpen = () => {
        setOpen(!open)
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
        userMenuStyle: {
          position: 'absolute',
          top: '0px',
          right: '100', 
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
    const loginSignOut = () => {
        if (user){
          return (
            <div className={classes.userNameStyle}>
              <AccountCircleIcon />
              <Button onClick={handleUserMenu} color="inherit">{user} </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openUserMenu}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSignOut} >Sign Out</MenuItem>
              </Menu>
            </div>
          )
        }else{
          return (
            <div className={classes.userNameStyle}>
              <Button onClick={handleLogin} color="inherit">Login </Button>
            </div>
          )
        }
    }
    
    return (
      <div>
        <AppBar classes={{ root: classes.root }}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            {loginSignOut()}
          </Toolbar>
        </AppBar>
      </div>
 
    )
} 