import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Amplify from "@aws-amplify/core";
import awsmobile from '../aws-exports';
import { Auth, Cache } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ForgotPasswordInput from "./ForgotPasswordInput";
import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import '../App.css';

Amplify.configure(awsmobile)

const Login = (props) => {
    const [loginValues, setLoginValues] = useState({
        username: "",
        password: ""
    })
    const [userForgotPassword, setUserForgotPassword] = useState("")
    const [renderState, setRenderState] = useState("Login")


    const handleLoginSubmit =  async event => {
        event.preventDefault();
        try {
        const user = await Auth.signIn(loginValues.username, loginValues.password)
        await Auth.currentAuthenticatedUser()
        .then(() => {
            Cache.setItem('CurrentUser', loginValues.username)
            localStorage.setItem("user",loginValues.username)
            Cache.setItem('AUTH_USER_TOKEN_KEY', user.signInUserSession.accessToken.jwtToken)
            props.UserLogin()
        })
        .catch(err => {
            alert(err.message)
        })
        }catch(err){
            console.log(err)
            loginErrorMessage(err.message)
        }
    }

    const handleLoginChange = name => event => {
        event.preventDefault();
        const currentValue = event.target.value
        if (name === "userPasswordReset"){
            setUserForgotPassword(currentValue)
        }else {
            setLoginValues({ ...loginValues, [name]: currentValue});
        }
    }

    const handleSignUp = () => {
        props.toggleSignUp()
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
          flexGrow: 1,
        },
        textForm: {
            color: 'white',
            "&::name": {
                color: "white"
            },
        },
        loginButton: {
            color: 'white',
            border: '1px solid',
        },
        textField: {
            position: 'relative',
            left: 50
        },
        textFont: {
            color: "white"
        },
        formButton: {
            position: 'relative',
            top: 40
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
        },

        loginInput: {
            position: 'relative',
            left: "20%"
        },
        loginError: {
            textAlign: 'center',
            ' & p': {
                position: 'relative',
                top: -10
            },
            ' & Button': {
                color: 'white',
                width: 100,
                backgroundColor: 'rgba(45, 8, 177, 0.9)',
                borderColor: 'white'
            },
        },
        forgotButton: {
            color: 'white',
            position: 'relative',
            top: 30
        },
        forgotPasswordMessage: {
            ' & Textfield' : {
                color: 'white'
            }
        },
        forgotPasswordTextForm: {
            color: 'black',
            backgroundColor: 'white'
        },
        forgotPasswordTextFont: {
            color: 'white',
            backgroundColor: 'white'
        },
        signUpText: {
            color: 'blue'
        },
        forgotPasswordModal: {
            textAlign: 'center',
            position: 'relative',
            color: 'white',
            left: '42%',
            top: '35%',
            width: 400,
            height: 190,
            outline: 'none',
            ' & h1': {
                position: 'relative',
                top: 10
            },
            ' & Button': {
                position: 'relative',
                top: 10,
                color: 'white',
                width: 100,
                backgroundColor: 'rgba(45, 8, 177, 0.9)',
                borderColor: 'white'
            }
        }
      }));
      const classes = useStyles();

      const onCloseMsg = () => {
        setLoginValues({ ...loginValues, 
            "username": "",
            "password": "",});
      }

    const loginErrorMessage = (message) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={classes.loginError}>
                        <h1>Error</h1>
                        <p>{message}</p>
                        <Button variant="outlined" color="primary" onClick={onClose} >
                            OK
                        </Button>
                    </div>
                );
            },
            afterClose: () => {onCloseMsg()}
        });   
    }
    console.log("State:",renderState)
    if (renderState === "Login"){
        return (
            <div>
                <div className={classes.loginFormBackground}>
                </div>
                <div className={classes.loginForm}>
                     
                <form id="login-form" >
                    <h2 id="simple-modal-title">Login</h2>
                        <Grid container direction="column" >
                            <Grid item>
                                <div className={classes.loginInput}>
                                <Grid container direction="row">
                                    <Grid item>
                                        <TextField 
                                            id="standard-basic" 
                                            required 
                                            value={loginValues.username} 
                                            name="username" 
                                            label="Username"
                                            autoComplete='off'
                                            InputProps={{className: classes.textForm}}
                                            InputLabelProps={{className: classes.textFont}}
                                            onChange={handleLoginChange('username')}/>
                                    </Grid>
                                    <Grid item>
                                        <TextField 
                                        id="standard-basic" 
                                        required 
                                        value={loginValues.password} 
                                        name="password"
                                        type="password" 
                                        label="Password" 
                                        InputProps={{className: classes.textForm}}
                                        InputLabelProps={{className: classes.textFont}}
                                        onChange={handleLoginChange('password')}/>
                                    </Grid>
                                    
                                </Grid>
                                </div>
                            </Grid>
                            <Grid item>
                                <Button className={classes.forgotButton} onClick={() => {
                                    setRenderState("Forgot Password")
                                }}>
                                    Forgot Password
                                </Button>
                            </Grid>
                        </Grid>
                        <div className={classes.formButton}>
                            <Button className={classes.loginButton} type="submit" onClick={handleLoginSubmit} >Login</Button>
                            <div>
                                Need an account?
                                <Button className={classes.signUpText} onClick={(event) => handleSignUp(event)}>Sign Up</Button>
                            </div>
                        </div>
                </form>
                </div>
            </div>
        )
    } else if (renderState === "Forgot Password"){
        return (
            <div>
                <div className={classes.forgotPasswordForm}>
                    <ForgotPasswordInput cancel={() => setRenderState("Login")} reset={() => setRenderState("Login")}/>
                </div>
                
            </div>
        )
    }
        
}
export default Login