import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, useLocation } from 'react-router-dom';
import BlackCloudLogo from './BlackCloudLogo';

const navItems = [
  { label: 'Apps', path: '/apps' },
  { label: 'Resume', path: '/resume' },
];

export default function TopBar() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const useStyles = makeStyles((theme) => ({
    appBar: {
      backgroundColor: 'transparent !important',
      backgroundImage: 'none',
      color: '#ffffff',
      boxShadow: 'none',
      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      textAlign: 'left',
    },
    toolbar: {
      position: 'relative',
      width: '100%',
      minHeight: 56,
      padding: theme.spacing(1, 2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 1.5),
      },
    },
    logo: {
      position: 'absolute',
      top: '50%',
      left: theme.spacing(2),
      transform: 'translateY(-50%)',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      flexShrink: 0,
      padding: '4px 0',
      transition: 'opacity 0.15s ease',
      '&:hover': {
        opacity: 0.92,
      },
      [theme.breakpoints.down('sm')]: {
        left: theme.spacing(1.5),
      },
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    navLink: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
      color: '#ffffff',
      padding: '8px 12px',
      borderRadius: 22,
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
      },
    },
    navLinkActive: {
      backgroundColor: 'rgba(255, 255, 255, 0.18)',
    },
    rightActions: {
      position: 'absolute',
      top: '50%',
      right: theme.spacing(2),
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      zIndex: 2,
      [theme.breakpoints.down('sm')]: {
        right: theme.spacing(1.5),
      },
    },
    hostBtn: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.875rem',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    userMenuBtn: {
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: 21,
      padding: '5px 12px',
      marginLeft: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      color: '#ffffff',
      minWidth: 'auto',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    menuIconBtn: {
      display: 'none',
      color: '#ffffff',
      [theme.breakpoints.down('sm')]: {
        display: 'inline-flex',
      },
    },
    iconLight: {
      color: '#ffffff',
    },
  }));

  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0} color="transparent">
      <Toolbar className={classes.toolbar} disableGutters>
        <Link to="/apps" className={classes.logo} aria-label="A Black Cloud App home">
          <BlackCloudLogo />
        </Link>

        <div className={classes.rightActions}>
          <div className={classes.navLinks}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                className={`${classes.navLink}${
                  location.pathname === item.path ? ` ${classes.navLinkActive}` : ''
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <Button
            className={classes.hostBtn}
            href="https://www.linkedin.com/in/justin-traille-b9a1708a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Button>
          <Button
            className={classes.hostBtn}
            href="https://github.com/TheTraille18/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Button>
          <IconButton size="small" aria-label="Language" className={classes.iconLight}>
            <LanguageIcon fontSize="small" />
          </IconButton>
          <Button
            className={classes.userMenuBtn}
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            aria-label="Open menu"
          >
            <MenuIcon fontSize="small" />
            <AccountCircleIcon fontSize="small" style={{ marginLeft: 8 }} />
          </Button>
          <IconButton
            className={classes.menuIconBtn}
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </div>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            style: {
              borderRadius: 12,
              minWidth: 200,
              boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
            },
          }}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => setMenuAnchor(null)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
