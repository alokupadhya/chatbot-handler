import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {
    Switch,
    Route,
} from "react-router-dom";
import {withAlert} from 'react-alert';

import RootNode from '../../../../components/dashboard/admin/chatbot-qu/RootNode';
import NextNode from '../../../../components/dashboard/admin/chatbot-qu//NextNode';


class ManageBotQA extends Component {
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
                    <div className="row">
                        <div className="col-12 col-md-4 px-0 pr-md-2 mb-2">
                            <div className="bg-light rounded p-3">
                                <i className="fa fa-robot text-primary"></i> Manage Bot Questions
                                <br/><br/>
                                <a href="/dashboard/admin/manage-chatbot-qa/root">
                                    Back
                                </a> to <b><i className="fa fa-code-branch text-secondary"></i> Root Node</b>
                            </div>
                        </div>
                        <Switch>
                            <Route path="/dashboard/admin/manage-chatbot-qa/root" exact>
                                <RootNode alert={this.props.alert}/>
                            </Route>
                            <Route exact path="/dashboard/admin/manage-chatbot-qa/next-node/:id" render = {(path)=>{
                                return(<NextNode id={path.match.params.id} alert={this.props.alert}/>);
                            }}/>
                        </Switch>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withAlert()(ManageBotQA);