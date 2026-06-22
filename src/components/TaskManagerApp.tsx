import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { API, graphqlOperation } from 'aws-amplify';
import { createTask, deleteTask } from '../graphql/mutations';
import { onCreateTask, onUpdateTaskStatus, onDeleteTask } from '../graphql/subscriptions';
import { getUserTasks } from '../graphql/queries';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import Typography from '@material-ui/core/Typography';
import { Task, TaskFormValues, TaskManagerAppProps } from '../types';
import { airbnbColors } from '../theme/airbnbTheme';

interface TaskManagerAppComponentProps extends TaskManagerAppProps {
  embedded?: boolean;
}

interface GetUserTasksResult {
  data: {
    getUserTasks: Task[] | null;
  };
}

interface SubscriptionResult<T> {
  value: {
    data: T;
  };
}

export default function TaskManagerApp({ user, embedded = false }: TaskManagerAppComponentProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskRef = useRef<Task[]>(tasks);
  const [numTasks, setNumTasks] = useState(0);
  const [reRender, setRerender] = useState(false);
  const reRenderRef = useRef(reRender);

  const [values, setValues] = useState<TaskFormValues>({
    taskName: '',
    taskDescription: '',
    taskRunTime: '',
    hour: '0',
    minute: '0',
    seconds: '0',
  });

  const useStyles = makeStyles((theme) => ({
    page: {
      maxWidth: embedded ? 'none' : 1280,
      margin: '0 auto',
      padding: embedded ? 0 : theme.spacing(3, 3, 6),
    },
    pageTitle: {
      fontWeight: 700,
      fontSize: '1.75rem',
      color: '#ffffff',
      marginBottom: theme.spacing(3),
      textAlign: 'left',
      textShadow: '0 1px 8px rgba(0,0,0,0.4)',
    },
    formCard: {
      maxWidth: 420,
      padding: theme.spacing(3),
      borderRadius: 12,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      marginBottom: theme.spacing(4),
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    },
    formTitle: {
      fontWeight: 600,
      fontSize: '1.125rem',
      marginBottom: theme.spacing(2),
      color: '#ffffff',
      textAlign: 'left',
      textShadow: '0 1px 6px rgba(0,0,0,0.4)',
    },
    textField: {
      '& .MuiOutlinedInput-root': {
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        '& fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.35)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(255, 255, 255, 0.55)',
        },
        '&.Mui-focused fieldset': {
          borderColor: airbnbColors.rausch,
        },
      },
      '& .MuiInputLabel-outlined': {
        color: 'rgba(255, 255, 255, 0.75)',
      },
      '& .MuiInputLabel-outlined.Mui-focused': {
        color: '#ffffff',
      },
    },
    number: {
      marginRight: theme.spacing(1),
      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
    createTaskButton: {
      backgroundColor: airbnbColors.rausch,
      color: '#fff',
      padding: '10px 20px',
      '&:hover': {
        backgroundColor: '#e04e52',
      },
    },
    taskCard: {
      borderRadius: 12,
      border: `1px solid ${airbnbColors.border}`,
      boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
      height: '100%',
      transition: 'box-shadow 0.15s ease',
      '&:hover': {
        boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
      },
    },
    media: {
      height: 140,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    sectionTitle: {
      fontWeight: 700,
      fontSize: '1.25rem',
      color: '#ffffff',
      marginBottom: theme.spacing(2),
      textAlign: 'left',
      textShadow: '0 1px 8px rgba(0,0,0,0.4)',
    },
  }));
  const classes = useStyles();

  const rerender = () => {
    const render = !reRenderRef.current;
    setRerender(render);
    reRenderRef.current = render;
  };

  async function fetchTasks(userInput: { User: string }) {
    try {
      console.log('Getting Tasks');
      const appsyncQuery = (await API.graphql(
        graphqlOperation(getUserTasks, userInput)
      )) as GetUserTasksResult;
      const taskItems = appsyncQuery.data.getUserTasks ?? [];
      setTasks(taskItems);
      taskRef.current = taskItems;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    fetchTasks({ User: user });

    const createTaskListener = (API.graphql(graphqlOperation(onCreateTask)) as {
      subscribe: (handlers: {
        next: (taskData: SubscriptionResult<{ onCreateTask: Task }>) => void;
      }) => { unsubscribe: () => void };
    }).subscribe({
      next: (taskData) => {
        const newTask = taskData.value.data.onCreateTask;
        const currentTaskCreated = taskRef.current;
        const appendTask =
          currentTaskCreated !== null ? [...currentTaskCreated, newTask] : [newTask];

        setTasks(appendTask);
        taskRef.current = appendTask;
      },
    });

    const updateTaskListener = (API.graphql(graphqlOperation(onUpdateTaskStatus)) as {
      subscribe: (handlers: {
        next: (taskData: SubscriptionResult<{ onUpdateTaskStatus: Task }>) => void;
      }) => { unsubscribe: () => void };
    }).subscribe({
      next: (taskData) => {
        const updatedTask = taskData.value.data.onUpdateTaskStatus;
        const currentTasks = taskRef.current;
        currentTasks.forEach((task) => {
          if (task.TaskName === updatedTask.TaskName) {
            task.TaskStatus = 'Inactive';
            rerender();
          }
        });
      },
    });

    const deleteTaskListener = (API.graphql(graphqlOperation(onDeleteTask)) as {
      subscribe: (handlers: {
        next: (taskData: SubscriptionResult<{ onDeleteTask: Task }>) => void;
      }) => { unsubscribe: () => void };
    }).subscribe({
      next: (taskData) => {
        const deletedTask = taskData.value.data.onDeleteTask;
        const currentTask = taskRef.current;
        if (currentTask) {
          const updateTaskAfterDelete = currentTask.filter(
            (task) => task.TaskName !== deletedTask.TaskName
          );
          setTasks(updateTaskAfterDelete);
          taskRef.current = updateTaskAfterDelete;
        } else {
          setTasks([]);
        }
      },
    });

    return () => {
      createTaskListener.unsubscribe();
      updateTaskListener.unsubscribe();
      deleteTaskListener.unsubscribe();
    };
  }, [user]);

  const resetFormText = () => {
    setValues({
      ...values,
      taskName: '',
      taskDescription: '',
      taskRunTime: '',
      hour: '0',
      minute: '0',
      seconds: '0',
    });
  };

  const handleDeleteTask = async (taskUser: string, taskName: string) => {
    const deleteTaskInput = {
      User: taskUser,
      TaskName: taskName,
    };
    try {
      await API.graphql(graphqlOperation(deleteTask, deleteTaskInput));
      setNumTasks(numTasks - 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateTask = async (event: React.FormEvent) => {
    event.preventDefault();
    const maxNumTasks = 5;
    if (tasks.length < maxNumTasks) {
      const runTimeSeconds =
        parseInt(values.hour, 10) * 3600 +
        parseInt(values.minute, 10) * 60 +
        parseInt(values.seconds, 10);
      const taskInput = {
        User: user,
        TaskName: values.taskName,
        Description: values.taskDescription,
        TaskRunTime: String(runTimeSeconds),
      };
      try {
        await API.graphql(graphqlOperation(createTask, taskInput));
        resetFormText();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Max Num of Task Reached');
    }
  };

  const handleChange = (name: keyof TaskFormValues) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentValue = event.target.value;
    setValues({ ...values, [name]: currentValue });
  };

  const renderTasks = () => {
    let itemNum = 1;
    if (tasks == null) {
      return <div />;
    }
    if (tasks.length > 0) {
      return tasks.map((task) => {
        itemNum += 1;
        const statusColor = task.TaskStatus === 'Active' ? 'green' : 'red';
        return (
          <Grid item xs={12} sm={6} md={4} key={itemNum}>
            <Card className={classes.taskCard}>
              <CardHeader
                avatar={
                  <AccessAlarmRoundedIcon style={{ color: statusColor }} />
                }
                title={task.TaskName}
                subheader={task.Description}
              />
              <CardMedia
                className={classes.media}
                image="/static/images/clipboard.jpg"
                title={task.TaskName}
              />
              <CardContent>
                Task run time: {task.TasKRunTime ?? task.TaskRunTime}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleDeleteTask(task.User, task.TaskName)}
                  color="primary"
                  variant="outlined"
                >
                  End Task
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      });
    }
    return null;
  };

  const taskCreationForm = () => (
    <form onSubmit={handleCreateTask}>
      <Typography className={classes.formTitle} component="h2">
        Create a new task
      </Typography>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            fullWidth
            required
            className={classes.textField}
            value={values.taskName}
            name="taskName"
            label="Task name"
            variant="outlined"
            onChange={handleChange('taskName')}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            required
            className={classes.textField}
            value={values.taskDescription}
            name="taskDescription"
            label="Description"
            variant="outlined"
            onChange={handleChange('taskDescription')}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <TextField
                className={`${classes.number} ${classes.textField}`}
                fullWidth
                required
                value={values.hour}
                name="hour"
                label="Hours"
                type="number"
                variant="outlined"
                onChange={handleChange('hour')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={`${classes.number} ${classes.textField}`}
                fullWidth
                required
                value={values.minute}
                name="minute"
                label="Minutes"
                type="number"
                variant="outlined"
                onChange={handleChange('minute')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className={`${classes.number} ${classes.textField}`}
                fullWidth
                required
                value={values.seconds}
                name="seconds"
                label="Seconds"
                type="number"
                variant="outlined"
                onChange={handleChange('seconds')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button className={classes.createTaskButton} type="submit" variant="contained">
            Create task
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <div className={classes.page}>
      {!embedded && (
        <Typography className={classes.pageTitle} component="h1">
          Task Manager
        </Typography>
      )}
      <div className={classes.formCard}>{taskCreationForm()}</div>
      <Typography className={classes.sectionTitle} component="h2">
        Your tasks
      </Typography>
      <Grid container spacing={3}>
        {renderTasks()}
      </Grid>
    </div>
  );
}
