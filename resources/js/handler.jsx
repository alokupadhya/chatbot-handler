import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Cube } from 'react-preloaders';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from './handler/views/login/Main';
import Dashboard from './handler/views/dashboard/Route';

import Footer from './handler/components/footer/Main';

export default class Handler extends Component {
    render() {
        const options = {
            position: positions.BOTTOM_CENTER,
            timeout: 5500,
            offset: '40px',
            transition: transitions.FADE
        }
        return (
            <React.Fragment>
                <AlertProvider template={AlertTemplate} {...options}>
                    <Router>
                        <Switch>
                            <Route path="/" exact component={Login}/>
                            <Route path="/dashboard" component={Dashboard}/>
                        </Switch>
                    </Router>
                    <Footer/>
                </AlertProvider>
                <Cube/>
            </React.Fragment>
        );
    }
}

if (document.getElementById('handler')) {
    ReactDOM.render(<Handler />, document.getElementById('handler'));
}
