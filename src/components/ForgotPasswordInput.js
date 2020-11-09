import React, {useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Auth } from 'aws-amplify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import '../App.css';

const ForgotPasswordInput = (props) => {
    const [userForgotPassword, setUserForgotPassword] = useState("")
    const [forgotPasswordCode, setForgotPasswordCode] = useState(false)
    const [passwordHelperText, setPasswordHelperText] = useState("")
    const [isValidPassword, setIsValidPassword] = useState(true)

    //Reset Password Params
    const [resetValues, setResetValues] = useState({
        user: "",
        code: "",
        password: "",
        confirmPassword: ""
    })

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
            left: 20
        },
        textFont: {
            color: "white"
        },
        formButton: {
            position: 'relative',
            top: 50
        },
        forgetInput: {
            position: 'relative',
            left: "20%"
        },
        resetInput: {
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
            position: 'relative',
            top: -25,
            color: 'white'
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
        forgotPasswordForm: {
            position: 'relative',
            left: 750,
            
        },
        resetForm: {
            position: 'relative',
            left: 750,
            top: -100
        },
        forgotPasswordInput: {
            position: 'relative',
            left: 50,
            top: -20
        },
        forgotPasswordFormBackground: {
            position: 'relative',
            top: 200,
            left: 750,
            width: 500,
            height: 200,
            color: 'white',
            backgroundColor: theme.palette.common.white,
            opacity: 0.08
        },
        resetFormBackground: {
            position: 'relative',
            top: 200,
            left: 750,
            width: 500,
            height: 300,
            color: 'white',
            backgroundColor: theme.palette.common.white,
            opacity: 0.08
        },
        loginParams: {
            position: 'relative',
            left: 40,
            width: 400
        },
        resetPasswordCode: {
            position: 'relative',
            left: -35
        }
      }));
      const classes = useStyles();
    
      const sendCodeError = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={classes.loginError}>
                        <h1>Error</h1>
                        <p>No Such User</p>
                        <Button variant="outlined" color="primary" onClick={onClose} >
                            OK
                        </Button>
                    </div>
                );
            },
            afterClose: () => setUserForgotPassword("")
        });   
    }
    
    const sendCodeReset = () => {
        Auth.forgotPassword(userForgotPassword)
        .then(data => {
            console.log(data)            
        })
        .catch(err => {
            console.log(err)
            sendCodeError()
            return false
        })
        return true
    }

    const sendUserName = async () => {
        const codeReset = await sendCodeReset()        
        if (codeReset){
            setForgotPasswordCode(true)
        }
    }
    const handleForgotPasswordChange = name => event => {
        const currentValue = event.target.value
        if (name === "userPasswordReset"){
            setUserForgotPassword(currentValue)
        }
    }
    const handleResetChange = name => event => {
        event.preventDefault();
        const currentValue = event.target.value
        setResetValues({ ...resetValues, [name]: currentValue});
        if (name === "password"){
            passwordValidator(currentValue)
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

    const resetPassword = () => {
        if (resetValues.password === resetValues.confirmPassword && isValidPassword){
            Auth.forgotPasswordSubmit(resetValues.user, resetValues.code, resetValues.confirmPassword)
                .then(data => {
                    console.log(data)
                    props.reset()
                })
                .catch(err => console.log(err));
        }
        
    }

    if (!forgotPasswordCode){
    //if (false){
        return (
            <div>
                <div className={classes.forgotPasswordFormBackground}>
                </div>
                <div className={classes.forgotPasswordForm}>
                    <h1>Forgot Password</h1>
                    <p>Enter User name</p>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <div className={classes.forgotPasswordInput}>
                                <TextField 
                                    id="standard-basic" 
                                    required 
                                    value={userForgotPassword} 
                                    name="userForgotPassword" 
                                    label="User Name"
                                    autoComplete='off'
                                    InputProps={{className: classes.textForm}}
                                    InputLabelProps={{className: classes.textFont}}
                                    onChange={handleForgotPasswordChange('userPasswordReset')}/>
                            </div>

                        </Grid>
                        <Grid item>
                            <Button className={classes.textForm} onClick={sendUserName} >OK</Button>
                            <Button className={classes.textForm} onClick={() => props.cancel()}>Cancel</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )  
    } else {
        return (
            <div>
                <div className={classes.resetFormBackground}>
                </div>
                <div className={classes.resetForm}>
                <h1>Reset Password</h1>
                <p>Check Email for code</p>
                <Grid container direction="column" justify="center" alignItems="flex-end" >
                    <Grid item>
                        <div className={classes.loginParams2}>
                        <Grid container direction="row"  >
                            <Grid item>
                                <TextField 
                                    id="standard-basic" 
                                    required 
                                    value={resetValues.user} 
                                    name="userName"
                                    label="UserName"
                                    autoComplete='off'
                                    InputProps={{className: classes.textForm}}
                                    InputLabelProps={{className: classes.textFont}}
                                    onChange={handleResetChange('user')}/>
                            </Grid>
                                <Grid item>
                                    <TextField 
                                        id="standard-basic" 
                                        required 
                                        value={resetValues.code} 
                                        name="code" 
                                        label="Code"
                                        autoComplete='off'
                                        InputProps={{className: classes.textForm}}
                                        InputLabelProps={{className: classes.textFont}}
                                        onChange={handleResetChange('code')}/>
                                </Grid>
                        </Grid>
                        </div>
                    </Grid>

                <Grid item>
                    <Grid container direction="row">
                        <Grid item>
                            <TextField 
                                id="standard-basic" 
                                required 
                                value={resetValues.password} 
                                error={!isValidPassword}
                                name="password"
                                type="password"
                                label="New Password"
                                autoComplete='off'
                                InputProps={{className: classes.textForm}}
                                InputLabelProps={{className: classes.textFont}}
                                onChange={handleResetChange('password')}
                                helperText={passwordHelperText}/>
                        </Grid>
                        <Grid item>
                            <TextField 
                                id="standard-basic" 
                                required 
                                value={resetValues.confirmPassword} 
                                
                                name="confirmPassword" 
                                type="password"
                                label="confirm Password"
                                autoComplete='off'
                                InputProps={{className: classes.textForm}}
                                InputLabelProps={{className: classes.textFont}}
                                onChange={handleResetChange('confirmPassword')}
                                helperText={passwordHelperText}/>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <div className={classes.resetPasswordCode}>
                            <Button className={classes.textForm} onClick={resetPassword}>Submit</Button>
                            <Button className={classes.textForm} onClick={() => props.cancel()}>Cancel</Button>
                        </div>

                    </Grid>
                </Grid>

            </Grid>

        </div>
            </div>
            
        )
        
    }
 
}

export default ForgotPasswordInput