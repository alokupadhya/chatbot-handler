import React, {Component,Fragment} from 'react';
import {withAlert} from 'react-alert';
import './style.css';
import ChatbotBox from './chatbotBox';

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
        }

        else{
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
                    </div>
                    <ChatbotBox alert={this.props.alert}/>
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

export default withAlert()(Main);
