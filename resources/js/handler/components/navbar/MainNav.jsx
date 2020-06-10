import React, {Component,Fragment} from 'react';
import './style.css';
import Popup from "reactjs-popup";
import Sidebar from "react-sidebar"
import axios from 'axios';
import {Link} from 'react-router-dom';

import Auth from '../../services/auth';

import NavSidebar from './Sidebar';

const mql = window.matchMedia(`(min-width: 800px)`);

class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: mql.matches,
            sidebarOpen: false,
            isAgent:true
        };
        this.onClickLogout = this.onClickLogout.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.childHandler = this.childHandler.bind(this);
    }

    componentDidMount(){
        Auth.isAgent().then((data)=>{
            this.setState({
                isAgent:data
            });
        });
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    async onClickLogout(){
        const alert = this.props.alert;
        let _token = localStorage.getItem('_token');
        await axios({
            url:'/api/logout',
            headers: {
                'Authorization': 'Bearer '+ _token,
                'ContentType':'application/json',
                'Accept':'application/json'
            },
            method:'GET'
        }).then((r)=>{
            if(r.status == 200){
                localStorage.clear();
                window.location.assign('/');
            }
        }).catch((r)=>{
            alert.error('Logout Operation Failed. Please refresh the page')
        });
    }

    childHandler(data){
        this.onSetSidebarOpen(data);
    }

    render() {
        let {sidebarOpen,isAgent} = this.state;
        

        if(isAgent){
            return(
                <Fragment>
                    <div className="cnav">
                        <div className="cnav-brand">
                            <b>Chatbot Handler</b>
                        </div>
                        <div className="cnav-menu">
                            <ul className="cnav-links">
                                <li className="link dropdown-popup">
                                    <Popup
                                    trigger={<a>Hi! Agent <i className="fa fa-angle-down"></i></a>}
                                    position="bottom right"
                                    on="click"
                                    >
                                        <ul className="user-menu">
                                            <Link to="/dashboard/agent/profile">
                                                <li><i className="fa fa-user-circle"></i> Profile</li>
                                            </Link>
                                            <li onClick={this.onClickLogout}><i className="fa fa-sign-out-alt"></i> Logout</li>
                                        </ul>
                                    </Popup>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Fragment>
            );
        }
        return (
            <Fragment>
                <Sidebar
                    sidebar={<NavSidebar action={this.childHandler}/>}
                    open={sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { background: "#f3f3f3",color : "grey" } }}
                >
                    <div className="cnav">
                        <div className="cnav-sidebar-btn">
                            <i className="fa fa-bars sidebar-btn" style={{position:'relative'}} onClick={() => this.onSetSidebarOpen(true)}></i>
                        </div>
                        <div className="cnav-brand">
                            <b>Chatbot Handler</b>
                        </div>
                        <div className="cnav-menu">
                            <ul className="cnav-links">
                                {/* <li className="link">
                                    <a href="#"><i className="fa fa-question-circle"></i> Help</a>
                                </li> */}
                                <li className="link dropdown-popup">
                                    <Popup
                                    trigger={<a>Hi! Admin <i className="fa fa-angle-down"></i></a>}
                                    position="bottom right"
                                    on="click"
                                    >
                                        <ul className="user-menu">
                                            <Link to="/dashboard/admin/profile">
                                                <li><i className="fa fa-user-circle"></i> Profile</li>
                                            </Link>
                                            <li onClick={this.onClickLogout}><i className="fa fa-sign-out-alt"></i> Logout</li>
                                        </ul>
                                    </Popup>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Sidebar>
            </Fragment>
        );
    }
}

export default MainNav;
