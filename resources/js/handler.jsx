import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import PublicRoute from './handler/components/public-route';
import AdminRoute from './handler/components/admin-route';
import AgentRoute from './handler/components/agent-route';

import Login from './handler/views/login/Main';
import AdminDashView from './handler/views/dashboard/admin/Main';
import ManageAgentView from './handler/views/dashboard/admin/Agents/ManageAgents';
import ManageBotQAView from './handler/views/dashboard/admin/chatbot-qu/ManageBotQA';
import AdminProfileView from './handler/views/dashboard/admin/profile/Main';

import AgentDashView from './handler/views/dashboard/agent/Main';
import AgentProfileView from './handler/views/dashboard/agent/profile/Main';


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
                            {/* public routes */}
                            <PublicRoute path="/" exact component={Login}/>
                            
                            {/* Admin routes */}
                            <AdminRoute path="/dashboard/admin" exact component={AdminDashView}/>
                            <AdminRoute path="/dashboard/admin/manage-agents" exact component={ManageAgentView}/>
                            <AdminRoute path="/dashboard/admin/manage-chatbot-qa" component={ManageBotQAView}/>
                            <AdminRoute path="/dashboard/admin/profile" component={AdminProfileView}/>
                        
                            {/* Agent Routes */}
                            <AgentRoute path="/dashboard/agent" exact component={AgentDashView}/>
                            <AgentRoute path="/dashboard/agent/profile" exact component={AgentProfileView}/>
                        </Switch>
                    </Router>
                    <Footer/>
                </AlertProvider>
            </React.Fragment>
        );
    }
}

if (document.getElementById('handler')) {
    ReactDOM.render(<Handler />, document.getElementById('handler'));
}
