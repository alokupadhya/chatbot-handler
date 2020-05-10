import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Nav from './main/components/website/Navbar';
import HomeView from './main/view/Home';
import Footer from './main/components/website/Footer';
import ChatBox from './main/components/chatbox/Main';

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
