import React, {Component,Fragment} from 'react';
import './style.css';

import UserInfoForm from './UserInfoForm';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatboxOpen: false,
        }
        this.openCloseChatbox = this.openCloseChatbox.bind(this);
    }

    openCloseChatbox(){
        if(this.state.chatboxOpen){
            document.getElementById("chatbox").style.display = 'none';
            console.log("close");
        }

        else{
            console.log("open");
            document.getElementById("chatbox").style.display = 'block';
        }
        this.setState({chatboxOpen:!this.state.chatboxOpen});
    }

    render() {
        return (
            <Fragment>
                <div className="chatbox" id="chatbox">
                    <div className="chatbox-head px-3 py-4">
                        <i className="fa fa-times-circle" onClick={this.openCloseChatbox}></i>
                        <h1>Chatbox</h1>
                        <p className="text-center">Please fill out the form below and we will get back to you as soon as possible.</p>
                    </div>
                    <UserInfoForm/>
                </div>

                <div className="chatbox-button">
                    <div className="btn-container mx-auto" onClick={this.openCloseChatbox}>
                        <i className="fa fa-comment fa-2x"></i>
                    </div>
                    <div className="title mt-2">
                        <div className="arrow-up"></div>
                        <b>Chat Assistent</b>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Main;
