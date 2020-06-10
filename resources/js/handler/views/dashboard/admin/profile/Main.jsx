import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name:"John",
                last_name:"Doe",
                email:"johnd@gmail.com",
            },
            _token:null,
        }
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
                                        <Link to="/dashboard/admin">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Profile</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4 pl-0 pr-1">
                            <div className="bg-light rounded shadow-sm p-3 text-center h-100">
                                <img src={require('../../../../../images/people.png')} width="150"/>
                                <hr/>
                                <h3 className="mt-3"><b>{user.first_name} {user.last_name}</b></h3>
                                <b className="text-muted">Admin</b>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 pl-1 pr-0">
                            <div className="bg-light rounded shadow-sm p-3 h-100">
                                <h5><b>Profile Details</b></h5>
                                <table className="table text-left">
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
                                </table>
                                <button className="btn btn-success"><i className="fa fa-key"></i> Update Password</button>
                                &nbsp;<button className="btn btn-info text-light"><i className="fa fa-user-alt"></i> Update Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Main;