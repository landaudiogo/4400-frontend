import React, {useState} from 'react'; 
import {makeStyles} from '@material-ui/core'
import Header from './components/Header'
import SideMenu from './components/SideMenu'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '100%',
    },
    break: {
        width: '100%',
        height:0,
    },
    mainPage: {
        flexGrow: 1,
        display: 'flex', 
        flexDirection: 'column',
    },
    mainComponent: {
        flexGow: 1
    }
}))

const MainLayout = ({MainComponent}) => {
    const classes = useStyles();
    const [sideBarStatus, setSideBarStatus] = useState(false);

    return (
        <div className={classes.root}>
            <SideMenu sideBarStatus={sideBarStatus} setSideBarStatus={setSideBarStatus}/>
            <div className={classes.mainPage}>
                <Header setSideBarStatus={setSideBarStatus}/>
                <MainComponent/>
            </div>
        </div>
    )
}

export default MainLayout;