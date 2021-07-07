import React, {useRef, useEffect} from 'react';
import {
    makeStyles,
    Paper,
    Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%', 
        height: '100%', 
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.7)',
        transition: 'opacity 0.3s ease-out',
    }, 
    sideBar: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        width: 300, 
        position: 'absolute',
        backgroundColor: '#707070',
        '& p': {
            marginLeft: 20
        }
    }
}));

const visible = {
    visibility: 'visible', 
    opacity: '1'
}

const notVisible = {
    visibility: 'hidden', 
    opacity: '0'
}



const SideMenu = ({sideBarStatus, setSideBarStatus}) => {
    const classes = useStyles()

    return (
        <div className={classes.root} style={sideBarStatus ? visible : notVisible}>
            <Paper className={classes.sideBar} elevation={24} >
                <p>huuuu</p>
                <p>this</p>
                <p>is</p>
                <p>test</p>
                <Button variant='contained' color='primary' onClick={() => {setSideBarStatus(false)}}>x</Button>
            </Paper>
        </div>
    )
}

export default SideMenu