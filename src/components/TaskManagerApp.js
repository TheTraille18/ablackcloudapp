import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import Backdrop from '@material-ui/core/Backdrop';


export default function TaskManagerApp(){
    const [authToken, setAuthToken] = useState()
    const [tasks, setTasks] = useState()
    const [numTasks, setNumTasks] = useState()
    const [currentUser, setCurrentUser] = useState()

    //Task details
    const [values, setValues] = useState({
        taskName: "",
        taskDescription: "",
        taskRunTime: "",
        hour: "0",
        minute: "0",
        seconds: "0"
    })

    useEffect(() => {
        try {
            async function AuthUser(){
                const session = await Auth.currentSession()
                let tempToken = session.getIdToken().getJwtToken()
                setAuthToken(tempToken)
                const authenticatedUser = await Auth.currentAuthenticatedUser();
                let currentUser = authenticatedUser.username
                const headers = {
                    'Authorization' : "Bearer " + tempToken,
                    'Content-Type': 'application/json'
                }
                const response = await axios.get('https://k6n8ccthi7.execute-api.us-east-1.amazonaws.com/PROD/getusertasks', {
                    params: {
                        user: currentUser
                    },
                    headers: headers
                })
                setNumTasks(response.data.length)
                setTasks(response.data)
                setCurrentUser(currentUser)           
          }
          AuthUser()
        }catch(err){
          console.log(err)
        }
      },[])
    
    const getTasks = async () => {
        const headers = {
            'Authorization' : "Bearer " + authToken,
            'Content-Type': 'application/json'
        }
        try {
            const response = await axios.get('https://k6n8ccthi7.execute-api.us-east-1.amazonaws.com/PROD/getusertasks', {
                params: {
                    user: currentUser
                },
                headers: headers
            })
            console.log(response.data)
            setTasks(response.data)
        }catch(err){
            console.log(err)
        }
    }

    const handleDeleteTask = async (User, TaskName) => {
        console.log("Deleting Task")
        const headers = {
            'Authorization' : "Bearer " + authToken,
            'Content-Type': 'application/json'
        }
        const task = {
            User,
            TaskName,
        }
        try {
            const res = await axios.post('https://k6n8ccthi7.execute-api.us-east-1.amazonaws.com/PROD/deletetasks', (task), {headers})
            await getTasks()
            let newNumTasks = numTasks - 1
            setNumTasks(newNumTasks)
            console.log("Response", res)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const handleCreateTask = async event => {
        event.preventDefault();
        let MAX_NUM_TASKS = 5   //Max Num a single user can create
        if (numTasks < MAX_NUM_TASKS){
            console.log("Creating Task")
            const headers = {
                'Authorization' : "Bearer " + authToken,
                'Content-Type': 'application/json'
            }
            var runTimeSeconds = (parseInt(values.hour) * 3600) + (parseInt(values.minute) * 60) + parseInt(values.seconds)
            const user = {
                User: currentUser,
                TaskName: values.taskName,
                Description: values.taskDescription,
                TaskRunTime: String(runTimeSeconds)
            }
            try {
                const res = await axios.post('https://k6n8ccthi7.execute-api.us-east-1.amazonaws.com/PROD/createtask', (user), {headers})
                console.log("Response",res)
                console.log(res.data)
                let newNumTasks = numTasks + 1
                setNumTasks(newNumTasks)
                await getTasks()
            }catch(err){
                console.log(err)
            }
        }else {
            console.log("Max Num of Task Reached")
            alert("Max Num of Task Reached")
        }
    }

    const handleChange = name => event => {
        const currentValue = event.target.value
        setValues({ ...values, [name]: currentValue});
    }

    const renderTasks = () => {
        let itemNum = 1;
        if (tasks !== undefined){
            return(
            tasks.map(task => {
                itemNum++
                console.log("Status", task.taskRunTime)
                let statusColor = task.Status === "Active" ? 'green' : 'red'
                return (
                    <Grid item key={itemNum}>
                        <div className="container">
                            <div className={classes.taskBackDrop}>
                            </div>
                            <Card className={classes.taskCard}>
                            <CardHeader className={classes.margin}
                                avatar={
                                    <AccessAlarmRoundedIcon
                                        style={{ color: `${statusColor}`}}
                                    />
                                }
                                title={task.TaskName}
                                subheaderTypographyProps={{color:"primary"}}
                                subheader={task.Description}
                            >
                            </CardHeader>
                            <CardMedia className={classes.media}
                                image="static/images/clipboard.jpg"
                            />
                            <CardContent>
                                Task Run Time: {task.TasKRunTime}
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleDeleteTask(task.User, task.TaskName)} color="primary">
                                    End Task
                                </Button>
                            </CardActions>
                        </Card> 
                        </div>
                        
                        
                    </Grid>
                )
            })
            )
        }

    }
    
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            position: 'absolute',
            top: 200,
        },
        taskFormBackGround: {
            width: 500,
            height: 320,
            color: 'white',
            backgroundColor: theme.palette.common.white,
            opacity: 0.05
           
        },
        taskFormTitle: {
            position: 'relative',
            top: 15
        },
        taskForm: {
            width: 500,
            color: 'white',
            position: 'absolute',
            top: 0
        },
        appTitle: {
            position: 'relative',
            top: -200,
            fontSize: 100
        },
        margin: {
            color: 'white',
        },
        textForm: {
            color: 'white',
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
            }
        },
        textFont: {
            color: "white"
        },
        taskCard: {
            position: 'absolute',
            top: 375,
            width: 300,
            backgroundColor: 'transparent !important',
            color: 'white'
        },
        taskBackDrop: {
            height: 300,
            width: 300,
            backgroundColor: theme.palette.common.black,
            opacity: 0.3,
        },
        taskAvatar:{
            backgroundColor: "red",
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },

    }))
    const classes = useStyles();
    return(
        <div>
            <Grid className={classes.root} container direction="column" justify="center" alignItems="center" spacing={5}>
            <Grid itme>
            <p className={classes.appTitle}>
                Task Manager App
            </p>
            </Grid>
            <Grid item>
                <Grid container direction="row" justify="center">
                    <Grid item>
                        <div className="container">
                        <div className={classes.taskFormBackGround} >
                        </div>
                            <form className={classes.taskForm} onSubmit={handleCreateTask}>
                            <h2 className={classes.taskFormTitle} >Create New Task</h2>
                            <div className={classes.margin}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="standard-basic" 
                                            required 
                                            value={values.taskName} 
                                            name="taskName" 
                                            label="Task Name"
                                            InputProps={{className: classes.textForm}}
                                            InputLabelProps={{className: classes.textFont}}
                                            onChange={handleChange('taskName')}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            id="standard-basic" 
                                            required 
                                            value={values.taskDescription} 
                                            name="taskDescription" 
                                            label="Task Description" 
                                            InputProps={{className: classes.textForm}}
                                            InputLabelProps={{className: classes.textFont}}
                                            onChange={handleChange('taskDescription')}/>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Grid container direction="row" justify="center" alignItems="center">
                                        <TextField 
                                            id="standard-basic" 
                                            required 
                                            value={values.hour} 
                                            name="hour" 
                                            label="hour" 
                                            style={{width: '20%'}}
                                            InputProps={{className: classes.textForm}}
                                            InputLabelProps={{className: classes.textFont}}
                                            onChange={handleChange('hour')}/>
                                        <TextField 
                                            id="standard-basic" 
                                            required 
                                            value={values.minute} 
                                            name="minute" 
                                            label="minute"
                                            style={{width: '20%'}}
                                            InputProps={{className: classes.textForm}}
                                            InputLabelProps={{className: classes.textFont}}
                                            onChange={handleChange('minute')}/>
                                        <TextField 
                                            id="standard-basic" 
                                            required 
                                            value={values.seconds} 
                                            name="seconds" 
                                            label="seconds" 
                                            style={{width: '20%'}}
                                            InputProps={{className: classes.textForm}}
                                            InputLabelProps={{className: classes.textFont}}
                                            onChange={handleChange('seconds')}/>
                                        </Grid>
                                        
                                    </Grid>
                                    <Grid item xs={12} margin="10">
                                        <Button type="submit" variant="contained" color="primary" >Create Task</Button>
                                    </Grid>
                                </Grid>
                            </div>
                    </form>
                        </div>
                    
                    </Grid>

                </Grid>
           
            </Grid>
            <Grid item>
                <Grid container spacing={5} >
                    {renderTasks()}
                </Grid>
                
            </Grid>
            </Grid>
        </div>
    )

}