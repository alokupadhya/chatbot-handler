import React, {Component,Fragment} from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import { withAlert } from 'react-alert'

import Navbar from '../../components/navbar/MainNav';

import AdminRoute from './admin/Routes';

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let _token = localStorage.getItem('_token');
        if(_token == "" || _token == null){
            window.location.assign('/');
        }
    }

    render() {
        return (
            <Fragment>
                <Navbar alert={this.props.alert}/>
                <div className="my-5"></div>
                <Switch>
                    <Route path="/dashboard/admin">
                        <AdminRoute/>
                    </Route>
                </Switch>
            </Fragment>
        );
    }
}

export default withAlert()(Main);
