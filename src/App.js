import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { UserContext } from "./context/UserContext";
import { Register, Login } from "./pages/auth/index";
import { Home } from './pages/home/index'
import Admin from './pages/admin/index'

import "./App.scss"


const theme = createMuiTheme({
  palette: {
    type: 'dark', 
    primary: {
      main: '#607d8b'
    },
    background: {
      default: '#121212',
      secondLayer: '#ffffff'
    }
  }
})

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route path="/register" component={Register}/>
        <UserContext.Provider value={{user, setUser}}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route path='/home' component={Home}/>
          <Route path='/admin' component={Admin}/>
        </UserContext.Provider>
      </Router>
      <CssBaseline/>
    </ThemeProvider>
  );
}