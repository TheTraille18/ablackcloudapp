import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

export default function TopBar(props){
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleUserMenu = (event) => {
      setAnchorEl(event.currentTarget);
      setOpenUserMenu(!openUserMenu )
    }

    const handleClose = () => {
      setOpenUserMenu(!openUserMenu)
    }

    const toProfile = () => {
      setAnchorEl(false)
      setOpenUserMenu(false)
    }

    const handleSignOut = () => {
      props.openConfirm()
      setAnchorEl(false)
      setOpenUserMenu(false)
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
      var currentUser = localStorage.getItem("user")
    const loginSignOut = () => {
        if (currentUser){
          return (
            <div className={classes.userNameStyle}>
              <AccountCircleIcon />
              <Button onClick={handleUserMenu} color="inherit">{currentUser}</Button>
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
                <Link to="/profile" onClick={toProfile} className="ui button primary">
                  <MenuItem >Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleSignOut} >Sign Out</MenuItem>
              </Menu>
            </div>
          )
        }else{
          return (
            <div>
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
            <Link to="/" className="ui button primary">
              <HomeIcon ></HomeIcon>Home
              </Link>
            {loginSignOut()}
          </Toolbar>
        </AppBar>
      </div>
 
    )
} 