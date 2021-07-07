import {makeStyles} from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'column', 
    height: '100%', 
    width: '100%', 
    '& .MuiFormControl-root': {
      width: '80%', 
      marginTop: theme.spacing(2)
    },
  },
  header: {
    width: 600,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "4px 4px 0px 0px",
    'z-index': 'unset',
  },
  registrationPaper: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '0px 0px 4px 4px',
  }, 
  button: {
    width: '50%',
    height: 50,
    margin: theme.spacing(2)
  },
  alert: {
    width: 600,
    marginTop: theme.spacing(2)
  }
}));

