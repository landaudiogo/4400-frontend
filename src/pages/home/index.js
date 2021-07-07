import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import {Redirect} from 'react-router-dom';
import MainLayout from '../../components/MainLayout'
import Hello from './components/Hello'
import {useUserCookie} from '../../components/hooks/useUserCookie'
import { makeStyles } from '@material-ui/core';


const Home = () => {
    const {loading, user} = useUserCookie();

    return (
        <>
            {!loading && 
                (!user 
                    && <Redirect to='/login'/>
                    || <MainLayout MainComponent={Hello}/>
                )
            }
        </>
    )
}

export {
    Home
};