import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import {
  makeStyles,
  Button,
  Paper, 
  TextField,
  AppBar,
  Typography,
} from '@material-ui/core'
import {
  Alert, 
  AlertTitle
} from '@material-ui/lab'
import {useStyles} from './styles'
import serverRequest from '../../../components/ServerRequest'

const defaultValues = {
  'username': '',
  'email': '',
  'password': '',
  'confirmPassword': '',
}
const defaultStatus = {
  'username': false,
  'email': false,
  'password': false,
  'confirmPassword': false,
}
const defaultRequestStatus = {
  processed: false, 
  success: false,
  message: '',
}


export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState(defaultValues)
  const [status, setStatus] = useState(defaultStatus)
  const [requestStatus, setRequestStatus] = useState(defaultRequestStatus)

  function handleClick(e) {
    e.preventDefault()
    let statusObj = {}
    for (let key of Object.keys(values)) {
      if(values[key] === '') {
        setStatus({...status, ...statusObj, [key]: true})
        return
      } else {
        statusObj[key] = false
      }
    }

    if (values.password !== values.confirmPassword) {
      setStatus({...statusObj, confirmPassword:true})
      return
    }
    setStatus({...statusObj})

    serverRequest({
      uri: '/authentication/register/', 
      method: 'POST', 
      data: {
        user_name: values.username,
        user_password: values.password,
        user_email: values.email,
        user_permission: 'user',
      }
    }).then((res) => 
      res.json().then(obj => ({body: obj, status: res.status}))
    ).then(obj => {
      if (obj.status === 201) {
        setRequestStatus({
          processed: true,
          success: true, 
          message: 'User has been successfully created'
        })
        setTimeout(
          () => history.push('/login'), 
          3000
        )
      } else if (obj.status === 409) {
        setRequestStatus({
          processed: true,
          success: false,
          message: 'User already exists'
        })
      }
    })    
  }

  function handleChange(e) {
    const {name, value} = e.target
    setValues({
      ...values, 
      [name]: value
    })
  }

  return (
    <form className={classes.root}>
      <AppBar position='static' className={classes.header}>
        <Typography align='center' variant='h5'>
          Create User
        </Typography>
      </AppBar>

      <Paper className={classes.registrationPaper}>
        <TextField 
          error={status.username}
          variant='outlined'
          name='username'
          className={classes.textInput} 
          label='Username' 
          onChange={handleChange}
          value={values.username}
        />
        <TextField 
          error={status.email}
          variant='outlined'
          name='email'
          className={classes.textInput} 
          label='Email' 
          onChange={handleChange}
          value={values.email}
        />
        <TextField 
          error={status.password}
          variant='outlined'
          type='password'
          name='password'
          className={classes.textInput} 
          label='Password' 
          onChange={handleChange}
          value={values.password}
        />
        <TextField 
          error={status.confirmPassword}
          variant='outlined'
          type='password'
          name='confirmPassword'
          className={classes.textInput} 
          label='Confirm Password' 
          onChange={handleChange}
          value={values.confirmPassword}
          helperText={
            status.confirmPassword
            && values.password !== values.confirmPassword
            && 'Passwords are different'
          }
        />
        <Button 
          variant='contained' 
          type='submit' 
          color='primary' 
          className={classes.button}
          onClick={handleClick}
        >
          Register
        </Button>
      </Paper>
      {requestStatus.processed &&
        <Alert
          severity={requestStatus.success ? 'success' : 'error'}
          className={classes.alert}
        >
          <AlertTitle>
            {requestStatus.message}
          </AlertTitle>
        </Alert>
      }
    </form>
  )
}
