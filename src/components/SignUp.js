import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';
import Grid from '@material-ui/core/Grid';
import { confirmAlert } from 'react-confirm-alert'; 
import '../App.css';

export default function SignUp(props){
    const [code, setCode] = useState("")
    const [enterCode, setEnterCode] = useState(false)

    //Validations
    const [doesPasswordsMatch, setPasswordMatch] = useState(true)
    const [isEmail, setIsEmail] = useState(true)
    const [isValidPassword, setIsValidPassword] = useState(true)

    //Helper Text
    const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState("")
    const [emailHelperText, setEmailHelperText] = useState("")
    const [passwordHelperText, setPasswordHelperText] = useState("")

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
        textField: {
            position: 'relative',
            left: 100
        },
        formButton: {
            position: 'relative',
            top: 30
        },
        signInCode: {
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
        confirmCode: {
            textAlign: 'center',
            ' & h1': {
                position: 'relative',
                
            },
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
            ' & TextField' : {
                position: 'relative',
            }
        },
        code: {
            position: 'relative',
            top: -20
        },
        codeTextForm: {
            color: 'black',
            backgroundColor: 'white'
        },
        codeTextFont: {
            color: 'white',
            backgroundColor: 'white'
        },
        signUpFormBackground: {
            position: 'relative',
            top: 200,
            left: 750,
            width: 500,
            height: 200,
            color: 'white',
            backgroundColor: theme.palette.common.white,
            opacity: 0.08
        },
        signUpForm: {
            position: 'relative',
            left: 750,
            top: -10
        },
        signUpButton: {
            position: 'relative',
            left: "-20%"
        }
    }));
    const classes = useStyles();

    const SignUpAuth = async (username, password, email) => {
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            })
            .then(() => {
                setEnterCode(true)
                //confirmationCode()
            })
            .catch(error => {
                alert(error.message)
                return null
            })

        }catch(error){
            alert(error)
        }
    }

    const passwordMatch = () => {
        if (values.password !== values.confirmPassword){
            setPasswordMatch(false)
            setConfirmPasswordHelperText("Password Mismatch")
        }
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
        else if (name === "code"){
            setCode(currentValue)
        }
    }

    const emailValidator = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

    const confirmationCode = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Grid container direction="column" className={classes.confirmCode}>
                    <Grid item>
                        <h1>Enter code</h1>
                    </Grid>
                    <Grid item>
                        <TextField className={classes.code}
                            id="standard-basic" 
                            required 
                            value={code}
                            name="code" 
                            label="code"
                            autoComplete='off'
                            InputProps={{className: classes.codeTextForm}}
                            InputLabelProps={{className: classes.codeTextFont}}
                            onChange={handleChange('code')}/>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={() => {
                            confirmSignUp(values.username, code)
                            .then((confirm) => {
                                if (confirm != null){
                                    onClose()
                                }
                            })
                        }}>
                        Enter
                        </Button>
                    </Grid>
                </Grid>
                );
            },
            afterClose: () => {handleLogin()}
        });   
    }

    const handleSignUpSubmit = async event => {
        event.preventDefault();
        var validProperties = isEmail && isValidPassword && doesPasswordsMatch
        if (validProperties){
            await SignUpAuth(values.username, values.password, values.email)
            //setConfirm(true)
        }
    }
    const confirmSignUp = async (username, code) => {
        try {
            await Auth.confirmSignUp(username, code)
            return 0
        } catch (error) {
            alert(error.message)
            return null
        }
    }

    const handleLogin = () => {
        props.toggleSignUp()
    }

    //Sign Up details
    const [values, setValues] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    })

    return (
        <div>
            <div className={classes.signUpFormBackground}>

            </div>
            {enterCode ? confirmationCode() : <div></div>}
       
        <div className={classes.signUpForm}>
        <h2 id="simple-modal-title">Sign Up</h2>
        <form id="signup-form">
            <Grid container direction="column" className={classes.textField} justify="center">
                <Grid item>
                    <Grid container direction="row">
                        <Grid item>
                            <TextField 
                            id="standard-basic" 
                            required 
                            value={values.name} 
                            name="username" 
                            label="Username"
                            autoComplete='off'
                            InputProps={{className: classes.textForm}}
                            InputLabelProps={{className: classes.textForm}}
                            onChange={handleChange('username')}/>
                        </Grid>
                        <Grid item>
                            <TextField 
                                required
                                id="standard-basic"
                                error={!isEmail} 
                                value={values.email} 
                                name="email" 
                                type="email" 
                                label="Email"
                                autoComplete='off'
                                InputProps={{className: classes.textForm}}
                                InputLabelProps={{className: classes.textForm}}
                                onBlur={emailValidator} 
                                onChange={handleChange('email')}
                                helperText={emailHelperText}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="row">
                        <Grid item>
                            <TextField 
                                required
                                id="standard-basic"
                                error={!isValidPassword}
                                value={values.password} 
                                name="password" 
                                type="password" 
                                label="Password" 
                                InputProps={{className: classes.textForm}}
                                InputLabelProps={{className: classes.textForm}}
                                onChange={handleChange('password')}
                                helperText={passwordHelperText}/>
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                error={!doesPasswordsMatch}
                                id="standard-basic" 
                                value={values.confirmPassword} 
                                name="password" 
                                type="password"
                                label="Confirm Password"
                                InputProps={{className: classes.textForm}}
                                InputLabelProps={{className: classes.textForm}}
                                onChange={handleChange('confirmPassword')}
                                onFocus={passwordMatch}
                                helperText={confirmPasswordHelperText}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <div className={classes.signUpButton}>
                        <Button className={classes.textForm} type="submit" onClick={event => handleSignUpSubmit(event)}>Submit</Button>
                        <Button className={classes.textForm} onClick={handleLogin }>Login</Button>
                    </div>
                </Grid>
            </Grid>
        </form>
        </div>
        
    </div>
    )
}