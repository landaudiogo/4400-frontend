import React, { useContext } from "react";
import {Redirect} from 'react-router-dom'
import {
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core'
import MainLayout from '../../components/MainLayout/index.js'
import { useUserCookie } from "../../components/hooks/useUserCookie.js";
import Exercise from './components/Exercise'



const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width:'100%',
  }, 
  gridItem: {
    padding: theme.spacing(5)
  }
}));


function CenterComponent(props) {
  const classes=useStyles()
  const {user, loading} = useUserCookie()

  return (
    <>
      {!user && !loading && <Redirect to='/login'/>}  
      {user && 
        (user.user_permission === 'admin' 
          && 
            <Grid container className={classes.root}>
              <Grid item className={classes.gridItem} xs={12} lg={6}>
                <Exercise/>
              </Grid>

              <Grid item className={classes.gridItem} xs={12} lg={6}>
                <Exercise/>
              </Grid>
            </Grid>
          || 
            <Redirect to='/home'/>
        )
      }
    </>
  );
  
}

const Admin = () => {
  return (
    <MainLayout MainComponent={CenterComponent}/>
  )
}

export default Admin;