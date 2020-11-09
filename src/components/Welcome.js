import React, {useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Login from './Login'
import SignUp from './SignUp'
import { Redirect } from 'react-router-dom';

export default function Welcome(props){
    const [loggedIn, setLoggedIn] = useState(false)
    const [signUp, setSignUp] = useState(false)
    
    const LoggedIn = () => {
        setLoggedIn(true)
    }

    const UserLogin = () => {
        props.UserLogin()
    }

    const SignUpForm = () => {
        
        setSignUp(!signUp)
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: 'black'
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
            position: 'relative',
            top: 200,
            left: 750,
            fontSize: 100
        },
        loginFormBackground: {
            position: 'relative',
            top: 200,
            left: 750,
            width: 500,
            height: 270,
            color: 'white',
            backgroundColor: theme.palette.common.white,
            opacity: 0.08
        },
        loginForm: {
            position: 'relative',
            left: 750,
            top: -70
        }
      }));
    const classes = useStyles();
    var isLogged = localStorage.getItem("isLogged") === "true"
    if (!isLogged){
        return(
            <div>
                <Grid container direction="row">
                    <div>
                        <Grid item className={classes.title}>
                            Welcome
                        </Grid>
                        <Grid item >
                            <div className={classes.loginFormBackground2}>
                            </div>
                            <div className={classes.loginForm2}>
                                {signUp ?
                                <SignUp toggleSignUp={SignUpForm}/> :
                                <Login loggedIn={LoggedIn} toggleSignUp={SignUpForm} UserLogin={UserLogin}/>}
                            </div>
                        </Grid>
                    </div>
                </Grid>
            </div>
        )
    }else {
        return (
            <div>
                <Redirect to="/apps"  />       
            </div>
        )
    }
}