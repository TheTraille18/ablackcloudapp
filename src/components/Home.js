import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import AppRender from './AppRender';
import Grid from '@material-ui/core/Grid';

export default function Home(props){
  const images = [
    {
      imageNumber: "1",
      url: `/static/images/clipboard.jpg`,
      title: 'Tasks Manager',
      width: '20%',
      infoLine1: "This is a Serverless implementation",
      infoLine2: "Tof a Task Manager. Each Task will",
      infoLine3: "Thave a timer that will notify a user", 
      infoLine4: "Twhen the task need to be completed"
    },
  ]

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          backgroundColor: 'transparent !important'
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        appTitle: {
          position: 'absolute',
          top: 110,
          fontSize: 85,
          flexGrow: 1,
        },
        userNameStyle: {
          position: 'absolute',
          right: '100px', 
        },
        appContainer: {
            height: 200,
            width: 1800
        },
        focusVisible: {},
      }));
      const classes = useStyles();
    if (props.logged){
      return(
        <div>
            <Grid className={classes.appTitle} container direction="column">
              <Grid item>
                Black Cloud Apps
              </Grid>
              <Grid item>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item className={classes.appContainer}>
                    {images.map((image) => (
                        <AppRender key={image.imageNumber} image={image} />
                    ))}
                  </Grid>
                </Grid>
              </Grid>            
            </Grid>
        </div>
      )
    }else {
      return (
        <div>
          <Redirect to="/" />
        </div>
      )

    }
} 