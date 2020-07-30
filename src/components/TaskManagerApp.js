import React, {useState} from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Cache } from 'aws-amplify';
import axios from 'axios';
import App from '../App.css'
import { createChainedFunction } from '@material-ui/core';

export default function TaskManagerApp(){
    
    //Task details
    const [values, setValues] = useState({
        taskName: "",
        taskDescription: "",
        taskRunTime: "",
    })

    const handleCreateTask = event => {
        event.preventDefault();
        console.log("Creating Task")
        const headers = {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials' : true,
            'Auth' : Cache.getItem('AUTH_USER_TOKEN_KEY'),
            'Content-Type': 'application/json'
        }
        const user = {
            User: Cache.getItem('CurrentUser'),
            TaskName: values.taskName,
            Description: values.taskDescription,
            TaskRunTime: values.taskRunTime
        }
        console.log(user)
        axios.post('https://k6n8ccthi7.execute-api.us-east-1.amazonaws.com/PROD', (user), headers)
        .then(res => {
            console.log(res)
            console.log(res.data)
        })
    }

    const handleChange = name => event => {
        const currentValue = event.target.value
        setValues({ ...values, [name]: currentValue});
    }
    
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        taskForm: {
            position: 'absolute',
            top: 250,
            width: 500,
            left: 700,
            backgroundColor: theme.palette.common.white,
        },
        margin: {
            margin: theme.spacing(1)
        }
    }))
    const classes = useStyles();
    return(
        <div>
            <p className="App-title">
                Task Manager App
            </p>
                <form className={classes.taskForm} onSubmit={handleCreateTask}>
                        <h2>Task Name</h2>
                        <div className={classes.margin}>
                            <Grid item xs={12}>
                                <TextField 
                                    id="standard-basic" 
                                    required 
                                    value={values.taskName} 
                                    name="taskName" 
                                    label="Task Name" 
                                    onChange={handleChange('taskName')}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="standard-basic" 
                                    required 
                                    value={values.taskDescription} 
                                    name="taskDescription" 
                                    label="Task Description" 
                                    onChange={handleChange('taskDescription')}/>
                            </Grid>
                            <Grid item xs={12}>
                            <TextField 
                                id="standard-basic" 
                                required 
                                value={values.taskRunTime} 
                                name="taskRunTime" 
                                label="Task Run Time" 
                                onChange={handleChange('taskRunTime')}/>
                            </Grid>
                            <Grid item xs={12} spacing={5}>
                                <Button type="submit" variant="contained" color="primary" >Create Task</Button>
                            </Grid>
                        </div>
                </form>
        </div>
    )

}