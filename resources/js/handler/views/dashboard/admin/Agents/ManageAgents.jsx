import React,{Component,Fragment} from 'react';
import {Link} from "react-router-dom";

import AddAgent from '../../../../components/dashboard/admin/manage-agent/AddAgent';

class ManageAgents extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Fragment>
                <div className="container-fluid box">
                    <div className="row">
                        <div className="col-12 p-0">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-light">
                                    <li className="breadcrumb-item" aria-current="page">
                                        <Link to="/dashboard/admin" onClick={this.closeSideBar}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Manage Agents</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-4 px-0 pr-md-2 mb-2">
                            <div className="bg-light rounded p-3">
                                <i className="fa fa-chart-bar text-primary"></i> Agent Status
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6 pr-2">
                                        <div className="rounded bg-success p-3">
                                            <b>Active Agents</b>
                                            <h3 className="mb-0">0</h3>
                                        </div>
                                    </div>
                                    <div className="col-6 pl-2">
                                        <div style={{'backgroundColor':'#f96561'}} className="rounded p-3">
                                            <b>Deactive Agents</b>
                                            <h3 className="mb-0">0</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 px-0 pl-md-2 mb-2">
                            <div className="bg-light rounded p-3">
                                {/* <div className="text-right">
                                    <button className="btn btn-sm btn-thm">Add Agent</button>
                                </div> */}
                                <div className="text-center py-5">
                                    <img src="/img/data_not_found.png" width="150" alt="test"/>
                                    <h1 className="mb-0">Hmmmmm...</h1>
                                    <p className="text-secondary">Looks like you don't have any agent</p>
                                    <h5>Create your first Agent here</h5>
                                    <div className="text-center">
                                        <AddAgent/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ManageAgents;