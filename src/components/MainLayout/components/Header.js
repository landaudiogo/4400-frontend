import React, { useState, useRef, useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import {
    makeStyles, 
    fade,
    AppBar,
    InputBase,
    Grid,
    Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'; 
import { useFetch } from '../../hooks/useFetch';

const useStyles = makeStyles(theme => ({
    root: {
        height: 80,
        width: 'unset',
        backgroundColor: '#707070',
        justifyContent: 'center',
        zIndex: '0'
    },
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    sideBarRoot: {
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row', 
        marginLeft: theme.spacing(2),
    },
    iconRoot: {
        padding: theme.spacing(0, 0, 0, 1),
        height: '100%',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    inputRoot: {
        width: '100%',
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '100%',
    }
}))

const Header = ({setSideBarStatus}) => {
    const classes = useStyles(); 
    const inputRef = useRef(); 
    const [makeRequest, setMakeRequest] = useState(false)
    const response = useFetch({uri:'/authentication/logout/', makeRequest})
    const history = useHistory()

    useEffect(() => {
        if (response && !response.error) {
            console.log('here we go again')
            setTimeout(() => {
                history.push('/login/')
            }, 2000)
        }
    }, [response])

    return (
        <AppBar position='static' className={classes.root}>
            <Grid container>
                <Grid item md={1}>
                    <div 
                    className={classes.sideBarRoot}
                    >
                        <MenuRoundedIcon
                        onClick={() => {
                            console.log('entering')
                            setSideBarStatus(true)
                        }}
                        />
                    </div>
                </Grid>
                <Grid item align='center' md={6}>
                    <div 
                    className={classes.search} 
                    onClick={() => inputRef.current.focus()}
                    >
                        <div className={classes.iconRoot}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ref: inputRef}}
                        />
                    </div>
                </Grid>
                <Grid item align='center' md={5}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={(e) => {
                            setMakeRequest(true)
                        }} 
                    >
                        Logout
                    </Button>     
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default Header