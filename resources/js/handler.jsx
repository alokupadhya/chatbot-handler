import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from './handler/views/login/Main';
import Footer from './handler/components/footer/Main';

export default class Handler extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                    </Switch>
                </Router>
                <Footer/>
            </React.Fragment>
        );
    }
}

if (document.getElementById('handler')) {
    ReactDOM.render(<Handler />, document.getElementById('handler'));
}
