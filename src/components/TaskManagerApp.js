import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { API, graphqlOperation } from 'aws-amplify';
import { createTask, deleteTask } from '../graphql/mutations'
import { onCreateTask, onUpdateTaskStatus, onDeleteTask } from '../graphql/subscriptions'
import { getUserTasks } from '../graphql/queries'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';

export default function TaskManagerApp(props) {
    const [tasks, setTasks] = useState([])
    const taskRef = useRef(tasks)
    const [numTasks, setNumTasks] = useState(0)
    const [currentUser, setCurrentUser] = useState()
    const [reRender, setRerender] = useState(false) //Used to rerender after updateTaskStatus
    const reRenderRef = useRef(reRender)

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
            if (props) {
                const queryInput = {
                    User: props.user
                }
                getTasks(queryInput)
                let numOfTasks = tasks === null ? 0 : tasks.length
                setNumTasks(numOfTasks)
                setCurrentUser(currentUser)
            }

        } catch (err) {
            console.log(err)
        }
        const createTaskListener = API.graphql(graphqlOperation(onCreateTask))
            .subscribe({
                next: taskData => {
                    const newTask = taskData.value.data.onCreateTask
                    const currentTaskCreated = taskRef.current
                    let appendTask
                    if (currentTaskCreated !== null) {
                        appendTask = [...currentTaskCreated, newTask]
                    } else {
                        appendTask = [newTask]
                    }

                    setTasks(appendTask)
                    taskRef.current = appendTask
                }
            })
        const updateTaskListener = API.graphql(graphqlOperation(onUpdateTaskStatus))
            .subscribe({
                next: taskData => {
                    const updatedTask = taskData.value.data.onUpdateTaskStatus
                    const currentTasks = taskRef.current
                    currentTasks.forEach(task => {
                        if (task.TaskName === updatedTask.TaskName) {
                            task.TaskStatus = "Inactive"
                            Rerender()
                        }
                    })
                }
            })
        const deleteTaskListener = API.graphql(graphqlOperation(onDeleteTask))
            .subscribe({
                next: taskData => {
                    const deleteTask = taskData.value.data.onDeleteTask
                    const currentTask = taskRef.current
                    if (currentTask) {
                        const updateTaskAfterDelete = currentTask.filter(task => task.TaskName !== deleteTask.TaskName)
                        setTasks(updateTaskAfterDelete)
                        taskRef.current = updateTaskAfterDelete
                    } else {
                        setTasks([])
                    }
                }
            })
        return () => {
            createTaskListener.unsubscribe()
            updateTaskListener.unsubscribe()
            deleteTaskListener.unsubscribe()
        }
    }, [])

    const ResetFormText = () => {
        setValues({
            ...values, "taskName": "",
            "taskDescription": "",
            "taskRunTime": "",
            "hour": "0",
            "minute": "0",
            "seconds": "0"
        });
    }

    const Rerender = () => {
        const render = !reRenderRef.current
        setRerender(render)
        reRenderRef.current = render
    }
    const getTasks = async (userInput) => {
        try {
            console.log("Getting Tasks")
            const appsyncQuery = await API.graphql(graphqlOperation(getUserTasks, userInput))
            var TaskItems = appsyncQuery.data.getUserTasks
            TaskItems = TaskItems === null ? [] : TaskItems
            setTasks(TaskItems)
            taskRef.current = TaskItems
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeleteTask = async (User, TaskName) => {
        const deleteTaskInput = {
            User,
            TaskName,
        }
        try {
            await API.graphql(graphqlOperation(deleteTask, deleteTaskInput))
            let newNumTasks = numTasks - 1
            setNumTasks(newNumTasks)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreateTask = async event => {
        event.preventDefault();
        let MAX_NUM_TASKS = 5  //Max Num a single user can create
        if (tasks.length < MAX_NUM_TASKS) {
            var runTimeSeconds = (parseInt(values.hour) * 3600) + (parseInt(values.minute) * 60) + parseInt(values.seconds)
            const user = {
                User: props.user,
                TaskName: values.taskName,
                Description: values.taskDescription,
                TaskRunTime: String(runTimeSeconds)
            }
            try {
                await API.graphql(graphqlOperation(createTask, user))
                ResetFormText()
                //let newNumTasks = numTasks + 1
                //setNumTasks(newNumTasks)
                //await getTasks()
            } catch (err) {
                console.log(err)
            }
        } else {
            alert("Max Num of Task Reached")
        }
    }

    const handleChange = name => event => {
        const currentValue = event.target.value
        setValues({ ...values, [name]: currentValue });
    }

    const renderTasks = () => {
        let itemNum = 1;
        if (tasks == null) {
            return (
                <div>
                </div>
            )
        }
        if (tasks.length > 0) {
            return (
                tasks.map(task => {
                    itemNum++
                    let statusColor = task.TaskStatus === "Active" ? 'green' : 'red'
                    return (
                        <Grid item key={itemNum}>
                            <div className="container">
                                <div className={classes.taskBackDrop}>
                                </div>
                                <Card className={classes.taskCard}>
                                    <CardHeader className={classes.margin}
                                        avatar={
                                            <AccessAlarmRoundedIcon
                                                style={{ color: `${statusColor}` }}
                                            />
                                        }
                                        title={task.TaskName}
                                        subheaderTypographyProps={{ color: "primary" }}
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
        number: {
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0
            }
        },
        taskContainer: {
            position: 'absolute',
            top: 50,
        },
        taskFormBackground: {
            position: 'relative',
            top: 0,
            left: -250,
            width: 500,
            height: 320,
            color: 'white',
            backgroundColor: theme.palette.common.white,
            opacity: 0.08

        },
        taskFormTitle: {
            position: 'relative',
            top: 10
        },
        taskForm: {
            width: 500,
            left: -250,
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
        createTaskButton: {
            color: 'white',
            border: '1px solid',
        },
        taskCard: {
            position: 'absolute',
            top: 375,
            width: 300,
            backgroundColor: 'transparent !important',
            color: 'white'
        },
        taskBackDrop: {
            position: "relative",
            top: 60,
            height: 300,
            width: 300,
            backgroundColor: theme.palette.common.black,
            opacity: 0.3,
        },
        taskAvatar: {
            backgroundColor: "red",
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },

    }))
    const classes = useStyles();
    const taskCreationForm = () => {
        return (
            <form className={classes.taskForm} onSubmit={handleCreateTask}>
                <h2 className={classes.taskFormTitle} >Create New Task</h2>
                <div className={classes.margin}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-basic"
                                required
                                value={values.taskName}
                                name="taskName"
                                label="Task Name"
                                autoComplete="off"
                                InputProps={{ className: classes.textForm }}
                                InputLabelProps={{ className: classes.textFont }}
                                onChange={handleChange('taskName')} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-basic"
                                required
                                value={values.taskDescription}
                                name="taskDescription"
                                label="Task Description"
                                autoComplete="off"
                                InputProps={{ className: classes.textForm }}
                                InputLabelProps={{ className: classes.textFont }}
                                onChange={handleChange('taskDescription')} />
                        </Grid>
                        <Grid item xs={12} >
                            <Grid container direction="row" justify="center" alignItems="center">
                                <TextField
                                    className={classes.number}
                                    id="standard-basic"
                                    required
                                    value={values.hour}
                                    name="hour"
                                    label="hour"
                                    type="number"
                                    autoComplete='off'
                                    min={0}
                                    max={1}
                                    style={{ width: '20%' }}
                                    InputProps={{ className: classes.textForm }}
                                    InputLabelProps={{ className: classes.textFont }}
                                    onChange={handleChange('hour')} />
                                <TextField
                                    className={classes.number}
                                    id="standard-basic"
                                    required
                                    value={values.minute}
                                    name="minute"
                                    label="minute"
                                    type="number"
                                    autoComplete='off'
                                    style={{ width: '20%' }}
                                    InputProps={{ className: classes.textForm }}
                                    InputLabelProps={{ className: classes.textFont }}
                                    onChange={handleChange('minute')} />
                                <TextField
                                    className={classes.number}
                                    id="standard-basic"
                                    required
                                    value={values.seconds}
                                    name="seconds"
                                    label="seconds"
                                    type="number"
                                    autoComplete='off'
                                    style={{ width: '20%' }}
                                    InputProps={{ className: classes.textForm }}
                                    InputLabelProps={{ className: classes.textFont }}
                                    onChange={handleChange('seconds')} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} margin="10">
                            <Button className={classes.createTaskButton} type="submit" variant="outlined" >Create Task</Button>
                        </Grid>
                    </Grid>
                </div>
            </form>
        )
    }
    return (
        <div>
            <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
                <Grid item>
                    <p className={classes.appTitle}>
                        Task Manager App
                    </p>
                </Grid>
                <Grid item>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <div className={classes.taskContainer}>
                                <div className={classes.taskFormBackground} >
                                </div>
                                {taskCreationForm()}
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