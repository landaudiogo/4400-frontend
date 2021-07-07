import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';

import {
  Paper, 
  Button,
  TextField
} from "@material-ui/core"
import { useStyles } from './styles'

import logo from '../../../assets/Logo2.png'
import serverRequest from '../../../components/ServerRequest'
import {UserContext} from '../../../context/UserContext'
import {useForm} from '../../../components/hooks/useForm'

const initialValues = {
  username: '',
  password: '' 
}

export default function Login() {
  const classes = useStyles()

  const history = useHistory();
  const [status, setStatus] = useState({username: false, password: false})
  const [values, handleChange] = useForm(initialValues)
  const { setUser } = useContext(UserContext)

  function handleLogin(e) {
    e.preventDefault()
    serverRequest({
      uri: '/authentication/login/',
      basic_auth: {
        username: values.username,
        password: values.password
      }
    }).then(res => (
      res.json().then(obj => ({
          status: res.status,
          body: obj
      }))
    )).then(obj => {
      if (obj.status === 404 || obj.status === 422) {
        setStatus({
          ...status, 
          username: true
        })
      } else if (obj.status === 401) {
        setStatus({
          username:false,
          password: true
        })
      } else if (obj.status === 200) {
        setStatus({
          username: false,
          password: false
        })
        setUser(() => obj.body)
        history.push('/home')
      }
    }).catch(exc => {      
    })
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleLogin}>
        <Paper className={classes.loginCard}>
          <img src={logo} alt='Team Logo' className={classes.logo}/>
          <TextField 
            error={status.username}
            variant='outlined'
            name='username'
            className={classes.textInput} 
            label='Username' 
            value={values.username}
            onChange={handleChange}
          />
          <TextField 
            error={status.password}
            variant='outlined'
            name='password'
            className={classes.textInput} 
            label='Password' 
            type='password' 
            value={values.password}
            onChange={handleChange}
          />
          <Button 
            variant='contained' 
            type='submit' 
            color='primary' 
            className={classes.button}
          >
            Login
          </Button>
          <Button 
            variant='contained' 
            color='primary' 
            className={classes.button}
            onClick={(e) => {history.push('/register')}}
          >
            Register
          </Button>
          <a style={{color: 'black', marginTop:10, marginBottom: 30}} href="https://www.google.com">Forgot your password?</a>
        </Paper>
      </form>
    </div>
  )
}