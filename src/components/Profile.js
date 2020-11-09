import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Auth } from 'aws-amplify';

export default function Profile(){
    const [values, setValues] = useState({
        user: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    })
    const useStyles = makeStyles((theme) => ({
        profileForm: {
            position: 'absolute',
            top: 100,
            left: 550,
            width: 1000
        },
        profileFormBackground: {
            position: 'absolute',
            top: 100,
            left: 500,
            backgroundColor: theme.palette.common.white,
            height: 850,
            width: 1000,
            opacity: 0.05
        },
        profileTitle: {
            position: 'absolute',
            color: "white",
            fontSize: 50,
            left: 300
        },
        textFont: {
            color: "white",
        },
        textFormFields: {
            position: 'absolute',
            top: 200,
            width: 1000
        },
        textForm: {
            color: 'white',
            width: "300px",
            "&::name": {
                color: "white"
            },
            // normal style
            "&::before": {
                color: 'white',
                borderColor: "white"
            },
            // hover style
            "&:hover:not(.Mui-disabled):before": {
                borderColor: "red"
            },
            // focus style
            "&::after": {
                borderColor: "white"
            },
        },
        container: {
            color: 'white'
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        try {
            async function AuthUser(){
                const authenticatedUser = await Auth.currentAuthenticatedUser();
                console.log(authenticatedUser)
                let currentUser = authenticatedUser.username
                let email = authenticatedUser.attributes.email
                setValues({...values, 
                    "user": currentUser,
                    "email": email
                })
            }
        AuthUser()
        }catch(err){
            console.log(err)
        }
    },[])

    return (
        <div>
            <Grid container direction="column" className={classes.container} >
                <Grid item >
                    <div className={classes.profileFormBackground}></div>
                    <form className={classes.profileForm}>
                        <Grid container direction="column">
                            <Grid item className={classes.profileTitle}>
                                <h2>Profile</h2>
                            </Grid>
                            <Grid container direction="column" className={classes.textFormFields} justify="center" alignItems="flex-start" spacing={2}>
                                <Grid item>
                                    <TextField
                                        id="standard-basic" 
                                        required 
                                        value={values.user} 
                                        name="UserName" 
                                        label="UserName"
                                        width={300}
                                        
                                        InputProps={{className: classes.textForm}}
                                        InputLabelProps={{className: classes.textFont, width: 100}}
                                        />
                                </Grid>
                                <Grid item >
                                    <TextField
                                        id="standard-basic" 
                                        required 
                                        //value={values.taskName} 
                                        name="FirstName" 
                                        label="First Name"
                                        InputProps={{className: classes.textForm}}
                                        InputLabelProps={{className: classes.textFont}}
                                        />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-basic" 
                                        required 
                                        //value={values.taskName} 
                                        name="lastName" 
                                        label="Last Name"
                                        InputProps={{className: classes.textForm}}
                                        InputLabelProps={{className: classes.textFont}}
                                        />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-basic" 
                                        required 
                                        //value={values.taskName} 
                                        name="phoneNumber" 
                                        label="Phone Number"
                                        InputProps={{className: classes.textForm}}
                                        InputLabelProps={{className: classes.textFont}}
                                        />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="standard-basic" 
                                        required 
                                        value={values.email} 
                                        name="email" 
                                        label="Email"
                                        type="email"
                                        InputProps={{className: classes.textForm}}
                                        InputLabelProps={{className: classes.textFont}}
                                        />
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}