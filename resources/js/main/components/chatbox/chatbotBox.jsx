import React, {Component,Fragment} from 'react';
import ChatBot from '../../services/chatbot';
import RequestedQuestion from './RequestQuestion';
import UserInfoForm from './UserInfoForm';
import ChatScreen from './chatscreen';

class ChatbotBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cb:{
                node : null,
                nodeOptions : null,
                chat : null,
            },
            c_ag:{
                flag:false,
            },
            c_ag_s:{
                flag:false,
                s_token:null,
            }
        }
        this.onClickNodeOption = this.onClickNodeOption.bind(this);
        this.startBot = this.startBot.bind(this);
        this.requestAgent = this.requestAgent.bind(this);
        this.agentChatHandler = this.agentChatHandler.bind(this);
        this.handlerChild = this.handlerChild.bind(this);
    }

    componentDidMount(){
        this.startBot();
    }

    requestAgent(){
        let {c_ag} = this.state;
        c_ag.flag = true
        this.setState({c_ag});
    }

    startBot(){
        ChatBot.getRootNode().then(
            (data)=>{
                let {cb} = this.state;
                cb.node = data[0];
                cb.nodeOptions = data[1];
                this.setState({cb})
            }
        )
        localStorage.setItem('Chats', JSON.stringify([]));
    }

    onClickNodeOption(id,option){
        let {cb} = this.state
        let chats = JSON.parse(localStorage.getItem('Chats')) || [];
        let st = {
            qa: cb.node.qa,
            an: option,
        }
        chats.push(st);
        localStorage.setItem('Chats', JSON.stringify(chats));
        ChatBot.getNode(id).then(
            (data)=>{
                cb.node = data[0];
                cb.nodeOptions = data[1];
                this.setState({cb})
            }
        )
    }

    agentChatHandler(flag){
        let {c_ag,c_ag_s} = this.state;
        c_ag.flag = false;
        c_ag_s.flag = flag;
        this.setState({c_ag,c_ag_s});
    }

    handlerChild(flag){
        let {c_ag_s} = this.state;
        c_ag_s.flag = flag;
        this.setState({c_ag_s});
    }

    render() {
        let {cb,c_ag,c_ag_s} = this.state;
        let _token = localStorage.getItem('session_token');
        
        if(c_ag_s.flag || (_token != null)){
            return(
                <Fragment>
                    <ChatScreen s_t={_token} action={this.handlerChild} alert={this.props.alert}/>
                </Fragment>
            );
        }
        else if(c_ag.flag){
            return(
                <Fragment>
                    <UserInfoForm action={this.agentChatHandler} alert={this.props.alert}/>
                </Fragment>
            );
        }
        else if(cb.node == null || cb.nodeOptions == null){
            return(
                <Fragment>
                    <div className="chat-screen bg-light m-2 rounded p-2" style={{minHeight:'345px',maxHeight:'345px',overflowY:'scroll'}}>
                    
                    </div>
                </Fragment> 
            );
        }
        return (
            <Fragment>
                <div className="chat-screen bg-light m-2 rounded p-2" style={{minHeight:'345px',maxHeight:'345px',overflowY:'scroll'}}>
                    {
                        (JSON.parse(localStorage.getItem('Chats')).length)>0?
                            JSON.parse(localStorage.getItem('Chats')).map(
                                (item,index)=>{
                                    return(
                                        <Fragment key={index}>
                                            <div className="q w-50 mb-2 bg-white border shadow-sm rounded p-2">
                                                {item.qa}
                                            </div>
                                            <div className="q w-50 ml-auto mb-2 bg-success text-white border shadow-sm rounded p-2">
                                                <b className="text-muted">You: </b>{item.an}
                                            </div>
                                        </Fragment>
                                    )
                                }
                            )
                        :null
                    }
                    
                    <div className="q w-75 bg-white border shadow-sm rounded mb-2 p-2">
                        <p className="mb-1">{cb.node.qa}</p>
                        {
                            cb.node.type == 0 ? cb.nodeOptions.map((item,index)=>{
                                return(
                                    <button key={index} onClick={this.onClickNodeOption.bind(this, item.id,item.option)} className="btn-theme ml-1 mb-1">{item.option}</button>
                                )
                            }): null
                        }
                    </div>
                </div>
                <div className="row px-2 pb-2">
                    <div className="col-5 pr-1">
                        <RequestedQuestion alert={this.props.alert}/>
                    </div>
                    <div className="col-4 pl-1 pr-1">
                        <button className="btn btn-block btn-sm btn-success" onClick={this.requestAgent}>
                            Chat with Agent
                        </button>
                    </div>
                    <div className="col-3 pl-1">
                        <button className="btn btn-block  btn-sm btn-danger" onClick={this.startBot}>
                            Reset
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ChatbotBox;
