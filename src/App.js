import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import './App.css';


function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log("Fasdjiofjaoifjaioj")
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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
    paper: {
      position: 'absolute',
      width: 400,
      left: '40%', 
      top: '30%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const login = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Login</h2>
      <TextField id="standard-basic" label="Username"/>
      <TextField id="standard-basic" label="Password"/>
      <div>
        <Button >Submit</Button>
      </div>
      
    </div>
  );
  return (
    <div>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {login}
      </Modal>
    <div className="App">
      <header className="App-background">
        <AppBar position="static" classes={{ root: classes.root }}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Button onClick={handleOpen} color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <p className="App-title">
          Welcome
        </p>

      </header>
    </div>
    </div>
  );
}

export default App;
