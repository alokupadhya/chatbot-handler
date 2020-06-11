import React, { Component, Fragment } from 'react';
import {withAlert} from 'react-alert';
import {Link} from 'react-router-dom';
import UpdatePassword from '../../../../components/dashboard/comman/form/UpdatePassword';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
            },
        }
    }

    componentDidMount(){
        let {user} = this.state;
        user = JSON.parse(localStorage.getItem('user'));
        this.setState({user}); 
    } 
    
    render() {
        let {user} = this.state;
        return (
            <Fragment>
                <div className="container-fluid box">
                    <div className="row">
                        <div className="col-12 p-0">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-light">
                                    <li className="breadcrumb-item" aria-current="page">
                                        <Link to="/dashboard/agent">
                                            Agent Dashboard
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4 px-0 pl-md-0 pr-md-1 mb-2">
                            <div className="bg-light rounded shadow-sm p-3 text-center h-100">
                                <img src={require('../../../../../images/people.png')} width="150"/>
                                <hr/>
                                <h3 className="mt-3"><b>{user.first_name} {user.last_name}</b></h3>
                                <b className="text-muted">Agent</b>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 px-0 pl-md-1 pr-md-0">
                            <div className="bg-light rounded shadow-sm p-3 h-100">
                                <h5><b>Profile Details</b></h5>
                                <table className="table text-left">
                                    <tbody>
                                        <tr>
                                            <td width="40%"><b>First Name</b></td>
                                            <td>{user.first_name}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Last Name</b></td>
                                            <td>{user.last_name}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Email</b></td>
                                            <td>{user.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <UpdatePassword alert={this.props.alert}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withAlert()(Main);