import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Nav from './components/website/Navbar';
import HomeView from './view/Home';
import Footer from './components/website/Footer';
import ChatBox from './components/chatbox/Main';

export default class Application extends Component {
    render() {
        return (
            <React.Fragment>
                <Nav />
                <HomeView/>
                <Footer/>
                <ChatBox/>
            </React.Fragment>
        );
    }
}

if (document.getElementById('application')) {
    ReactDOM.render(<Application />, document.getElementById('application'));
}
