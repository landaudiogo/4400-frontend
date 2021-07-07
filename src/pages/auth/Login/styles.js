import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100%', 
    width: '100%'
  },
  loginCard: {
    height: 500, 
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo:{
    marginTop: 5,
    width: '30%',
    height: 'auto',
  },
  button: {
    marginTop: 20,
    width: "80%", 
    height: "10%",
  },
  textInput: {
    width: '80%',
    height: '10%',
    marginTop: 20,
    '& .MuiInputBase-formControl':{
      width: "100%", 
      height: "100%",
    }
  }
}));
