import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

async function SignUp(username, password, email){
    try {
        const user = await Auth.signUp({
            username,
            password,
            attributes: {
                email          // optional
                // other custom attributes 
            }
        })
        console.log(user)
    }catch(error){
        console.log('error signing up:', error);
    }
}

export default function Login(){
    const [signUp, setSignUp] = useState(false)
    const [values, setValues] = useState({
        username: "",
        password: "",
        email: ""
    })

    const handleLoginSubmit = event => {
        event.preventDefault();
        console.log("Submit")
    }
    const handleSignUpSubmit = event => {
        event.preventDefault();
        console.log(values)
        console.log("event",event)
        SignUp(values.username, values.password, values.email)
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }

    const handleSignUp = (event) => {
        console.log("Sign up page")
        setSignUp(true);
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
    if (!signUp){
        return (
            <div classes={{ root: classes.root }}>
                <form id="login-form" onSubmit={handleLoginSubmit}>
                    <h2 id="simple-modal-title">Login</h2>
                    <TextField id="standard-basic" label="Username"/>
                    <TextField id="standard-basic" label="Password"/>
                    <div>
                        <Button type="submit" variant="contained" color="primary" >Submit</Button>
                        <Button onClick={(event) => handleSignUp(event)}>Sign Up</Button>
                    </div>
                </form>
    
        </div>
        )
    }else {
        return (
            <div classes={{ root: classes.root }}>
                <h2 id="simple-modal-title">Sign In</h2>
                <form id="signup-form" onSubmit={(event) => handleSignUpSubmit(event)}>
                    <TextField id="standard-basic" required value={values.name} name="username" label="Username" onChange={handleChange('username')}/>
                    <TextField id="standard-basic" required value={values.email} name="email" type="email" label="Email" onChange={handleChange('email')}/>
                    <TextField id="standard-basic" required value={values.password} name="password" type="password" label="Password" onChange={handleChange('password')}/>
                    <TextField id="standard-basic" required label="Confirm Password"/>
                    <div>
                        <Button type="submit" variant="contained" color="primary" >Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}