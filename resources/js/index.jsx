import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Nav from './main/components/website/Navbar';
import HomeView from './main/view/Home';
import Footer from './main/components/website/Footer';
import ChatBox from './main/components/chatbox/Main';

export default class Application extends Component {
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
                    <Nav />
                    <HomeView/>
                    <Footer/>
                    <ChatBox/>
                </AlertProvider>
            </React.Fragment>
        );
    }
}

if (document.getElementById('application')) {
    ReactDOM.render(<Application />, document.getElementById('application'));
}
