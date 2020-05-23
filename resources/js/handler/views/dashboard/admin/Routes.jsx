import React, {Component,Fragment} from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import AdminDashView from './Main';
import ManageAgentView from './Agents/ManageAgents';
import ManageBotQAView from './chatbot-qu/ManageBotQA';

class Routes extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Switch>
                    <Route path="/dashboard/admin" exact>
                        <AdminDashView/>
                    </Route>
                    <Route path="/dashboard/admin/manage-agents" exact>
                        <ManageAgentView alert={this.props.alert}/>
                    </Route>
                    <Route path="/dashboard/admin/manage-chatbot-qa">
                        <ManageBotQAView alert={this.props.alert}/>
                    </Route>
                </Switch>
            </Fragment>
        );
    }
}

export default Routes;
