import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { authStartChecking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(authStartChecking());
    }, [dispatch]);

    if(checking) {
        return (<h4>Loading...</h4>)
    }

    return (
        <Router>
            <Switch>
                <PublicRoutes
                    exact
                    path="/login"
                    component={LoginScreen}
                    isAuth={!!uid}
                />
                <PrivateRoutes
                    exact
                    path="/calendar"
                    component={CalendarScreen}
                    isAuth={!!uid}
                />
                <Redirect to="/login"/> 
            </Switch>
        </Router>
    )
}
