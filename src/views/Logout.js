// Dependencies
import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom';

// API 
import useApi from '../services/api';

// Component
export default () => {
    const api = useApi();
    const history = useHistory();

    useEffect(() => {
        const doLogout = async () => {
            await api.logout();
            history.push('/login');
        }
        doLogout();
    }, []);

    return null;
}