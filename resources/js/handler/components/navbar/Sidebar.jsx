import React,{Component,Fragment} from 'react';
import {Link} from "react-router-dom";

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.closeSideBar = this.closeSideBar.bind(this);
    }

    closeSideBar(){
        this.props.action(false);
    }

    render(){
        return(
            <Fragment>
                <div className="sidebar-menu">
                    <Link to="/dashboard/admin" onClick={this.closeSideBar}><h4>Dashboard</h4></Link>
                    <h4>Chatbot Agents</h4>
                    <ul>
                        <Link to="/dashboard/admin/manage-agents" onClick={this.closeSideBar}>
                            <li>
                                <div>
                                <i className="fa fa-user-tie"></i>
                                </div> Manage Agents
                            </li>
                        </Link>

                        {/* <Link to="/dashboard/primary-settings/session" onClick={this.closeSideBar}> */}
                        <li>
                                <div>
                                <i className="fa fa-tv"></i>
                                </div> Monitor Agents
                            </li>
                        {/* </Link> */}

                    </ul>
                    <h4>Chatbot Questions</h4>
                    <ul>
                        <Link to="/dashboard/admin/manage-chatbot-qa/root" onClick={this.closeSideBar}>
                            <li>
                                <div>
                                    <i className="fa fa-robot"></i>
                                </div> Manage Questions
                            </li>
                        </Link>
                        <Link to="/dashboard/admin/requested-questions" onClick={this.closeSideBar}>
                            <li>
                                <div>
                                    <i className="fa fa-copy"></i>
                                </div> Requested Questions
                            </li>
                        </Link>
                    </ul>
                </div>
            </Fragment>
        );
    }
}

export default Sidebar;