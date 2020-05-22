import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom";

class ManageBotQA extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
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
                                    <li className="breadcrumb-item active" aria-current="page">Manage BotQA</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ManageBotQA;