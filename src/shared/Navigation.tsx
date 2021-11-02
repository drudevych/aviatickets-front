import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Home from '../homepage/Home'
import Flights from '../flights-page/Flights'
import FlightInfo from '../flight-info-page/FlightInfo';
import Registration from '../registration-page/Registation';
import LoginPage from '../login-page/LoginPage';


const Navigation = () => {
    const [from, setFrom] = useState('');
    const [destination, setDestination] = useState('');

    return (
        <Router>
           <Switch>
                <Route path="/registration" >
                    <Registration />
                </Route>
                <Route path="/login" >
                    <LoginPage />
                </Route>
                <Route path='/flights/:id' component={FlightInfo} />
                <Route path="/flights" >
                    <Flights from={from} destination={destination}/>
                </Route>
                <Route path="/home">
                    <Home setFrom={setFrom} setDestination={setDestination}/>
                </Route>
                <Route path="/">
                    <Home setFrom={setFrom} setDestination={setDestination} />
                </Route>
            </Switch>
        </Router>
    )
}

export default Navigation;