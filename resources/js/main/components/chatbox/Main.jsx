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
                        {/* <p className="text-center">You can intrect with chatbot for your queries by clicks.</p> */}
                        <p className="text-center">Please fill out the form below and we will get back to you as soon as possible.</p>
                    </div>
                    <UserInfoForm/>
                    {/* <div className="bg-light m-2 rounded p-2" style={{minHeight:'305px',maxHeight:'305px',overflowY:'scroll'}}>
                        <div className="q w-50 mb-2 bg-white border shadow-sm rounded p-2">
                            What is your query for?
                        </div>
                        <div className="q w-50 ml-auto mb-2 bg-success text-white border shadow-sm rounded p-2">
                            <b className="text-muted">You: </b>Course
                        </div>
                        <div className="q w-50 mb-2 bg-white border shadow-sm rounded p-2">
                            Which course?
                        </div>
                        <div className="q w-50 ml-auto mb-2 bg-success text-white border shadow-sm rounded p-2">
                            <b className="text-muted">You: </b>Machine Learning
                        </div>
                        <div className="q w-100 bg-white border shadow-sm rounded p-2">
                            <p className="mb-1">About?</p>
                            <button className="btn-theme ml-1 mb-1">Deescription</button>
                            <button className="btn-theme ml-1 mb-1">Syllabus</button>
                            <button className="btn-theme ml-1 mb-1">Fees</button>
                            <button className="btn-theme ml-1 mb-1">Examination</button>
                        </div>
                    </div> */}
                    {/* <div className="row px-2 pb-2">
                        <div className="col-5 pr-1">
                            <button className="btn btn-block  btn-sm btn-primary">
                                Request a question
                            </button>
                        </div>
                        <div className="col-4 pl-1 pr-1">
                            <button className="btn btn-block btn-sm btn-success">
                                Chat with Agent
                            </button>
                        </div>
                        <div className="col-3 pl-1">
                            <button className="btn btn-block  btn-sm btn-danger">
                                End Chat
                            </button>
                        </div>
                    </div> */}
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
