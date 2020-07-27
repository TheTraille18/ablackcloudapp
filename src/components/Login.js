import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Amplify from "@aws-amplify/core";
import awsmobile from '../aws-exports';
import { Auth, Cache } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

Amplify.configure(awsmobile)

async function SignUp(username, password, email){
    try {
        console.log("Signing Up")
        await Auth.signUp({
            username,
            password,
            attributes: {
                email
            }
        })
    }catch(error){
        console.log('error signing up:', error);
        alert(error.message)
    }
}

export default function Login(props){
    const [signUp, setSignUp] = useState(false)
    const [confirm, setConfirm] = useState(false) //Used for confirm code from email
    const [confirmCode, setConfirmCode] = useState("")

    const [loginValues, setLoginValues] = useState({
        username: "",
        password: ""
    })
    
    //Sign Up details
    const [values, setValues] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    })

    //Validations
    const [doesPasswordsMatch, setPasswordMatch] = useState(true)
    const [isEmail, setIsEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)

    //Helper Text
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState("")
    const [emailHelperText, setEmailHelperText] = useState("")
    const [passwordHelperText, setPasswordHelperText] = useState("")

    const CloseLogin = () => {
        props.closeLogin()
    }

    const handleCodeChange = event => {
        setConfirmCode(event.target.value)
    }

    const handleLoginSubmit =  async event => {
        event.preventDefault();
        const user = await Auth.signIn(loginValues.username, loginValues.password)
        Cache.setItem('CurrentUser', loginValues.username)
        Cache.setItem('AUTH_USER_TOKEN_KEY', user.signInUserSession.accessToken.jwtToken)
        console.log("Logining In")
        CloseLogin()
    }
    const handleSignUpSubmit = event => {
        event.preventDefault();
        var validProperties = isEmail && isValidPassword && doesPasswordsMatch
        if (validProperties){
            SignUp(values.username, values.password, values.email)
            setConfirm(true)
        }
    }

    const handleConfirmEmail = event => {
        event.preventDefault();
        console.log(confirmCode)
        Auth.confirmSignUp(values.username,confirmCode)
        .then(() => {
            alert("Confirm successful")
            
            CloseLogin()
        })
        .catch(err => {
            console.log('Error Confirm:', err);
            alert(err.message)
        })
    }

    const handleLoginChange = name => event => {
        const currentValue = event.target.value
        setLoginValues({ ...loginValues, [name]: currentValue});
    }

    const handleChange = name => event => {
        const currentValue = event.target.value
        setValues({ ...values, [name]: currentValue});
        if (name === "confirmPassword"){
            if (values.password === currentValue){
                setPasswordMatch(true)
                setConfirmPasswordHelperText("")
            }
        }
        else if (name === "email"){
            emailValidator()
        }
        else if (name === "password"){
            passwordValidator(currentValue)
        }
    }

    const handleSignUp = () => {
        setSignUp(true);
    }

    const passwordMatch = () => {
        if (values.password !== values.confirmPassword){
            setPasswordMatch(false)
            setConfirmPasswordHelperText("Password Mismatch")
        }
    }

    const emailValidator = () => {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        var isemail = re.test(values.email) 
        setIsEmail(isemail);
        if (isemail){
            setEmailHelperText("")
        }else {
            setEmailHelperText("Invalid Email")
        }
    }

    const passwordValidator = currentPassword => {
        if (currentPassword.length >= 8){
            setIsValidPassword(true)
            setPasswordHelperText("")
        }else {
            setIsValidPassword(false)
            setPasswordHelperText("Password must be 8 Character or more")
        }
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
    if (confirm){
        return (
            <div>
                <form onSubmit={handleConfirmEmail}>
                    <h2>Confirm Email</h2>
                    <TextField 
                        id="standard-basic" 
                        required 
                        value={confirmCode} 
                        name="confirmEmail" 
                        label="Confirm Email" 
                        onChange={handleCodeChange}/>
                    <Button type="submit" variant="contained" color="primary" >Enter Confirmation Code</Button>
                </form>
            </div>
        )
    }
    else if (!signUp){
        return (
            <div classes={{ root: classes.root }}>
                <form id="login-form" onSubmit={handleLoginSubmit}>
                    <h2 id="simple-modal-title">Login</h2>
                    <div>
                        <Button color="primary">Sign In with Google</Button>
                    </div>
                    <TextField 
                        id="standard-basic" 
                        required 
                        value={loginValues.username} 
                        name="username" 
                        label="Username" 
                        onChange={handleLoginChange('username')}/>
                    <TextField 
                        id="standard-basic" 
                        required 
                        value={loginValues.password} 
                        name="password"
                        type="password" 
                        label="Password" 
                        onChange={handleLoginChange('password')}/>
                    <div>
                        <Button type="submit" onClick={handleLoginSubmit} variant="contained" color="primary" >Submit</Button>
                        <Button onClick={(event) => handleSignUp(event)}>Sign Up</Button>
                    </div>
                </form>
            </div>
        )
    }else {
        return (
            <div classes={{ root: classes.root }}>
                <h2 id="simple-modal-title">Sign Up</h2>
                <form id="signup-form" onSubmit={(event) => handleSignUpSubmit(event)}>
                    <TextField 
                        id="standard-basic" 
                        required 
                        value={values.name} 
                        name="username" 
                        label="Username" 
                        onChange={handleChange('username')}/>
                    <TextField 
                        required
                        id="standard-basic"
                        error={!isEmail} 
                        value={values.email} 
                        name="email" 
                        type="email" 
                        label="Email"
                        onBlur={emailValidator} 
                        onChange={handleChange('email')}
                        helperText={emailHelperText}/>
                    <TextField 
                        required
                        id="standard-basic"
                        error={!isValidPassword}
                        value={values.password} 
                        name="password" 
                        type="password" 
                        label="Password" 
                        onChange={handleChange('password')}
                        helperText={passwordHelperText}/>
                    <TextField
                        required
                        error={!doesPasswordsMatch}
                        id="standard-basic" 
                        value={values.confirmPassword} 
                        name="password" 
                        type="password"
                        label="Confirm Password" 
                        onChange={handleChange('confirmPassword')}
                        onFocus={passwordMatch}
                        helperText={confirmPasswordHelperText}/>
                    <div>
                        <Button type="submit" variant="contained" color="primary" >Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}