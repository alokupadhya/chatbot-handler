import React, {Component,Fragment} from 'react';
import {Redirect} from 'react-router-dom';

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
                <div className="container">
                    Dashboard
                </div>
            </Fragment>
        );
    }
}

export default Main;
