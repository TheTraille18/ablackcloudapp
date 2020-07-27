import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import App from '../App.css'

export default function TaskManagerApp(){
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
    }))
    return(
        <div>
            <p className="App-title">
                Coming Soon
            </p>
        </div>
    )

}