import React, {Component,Fragment} from 'react';
import ChatBot from '../../services/chatbot';
import RequestedQuestion from './RequestQuestion';
class ChatbotBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            node : null,
            nodeOptions : null,
            chat : null,
        }
        this.onClickNodeOption = this.onClickNodeOption.bind(this);
        this.startBot = this.startBot.bind(this);
    }

    componentDidMount(){
        this.startBot();
    }

    startBot(){
        ChatBot.getRootNode().then(
            (data)=>{
                this.setState({node:data[0],nodeOptions:data[1]})
            }
        )
        localStorage.setItem('Chats', JSON.stringify([]));
    }

    onClickNodeOption(id,option){
        let {node} = this.state
        let chats = JSON.parse(localStorage.getItem('Chats')) || [];
        let st = {
            qa: node.qa,
            an: option,
        }
        chats.push(st);
        localStorage.setItem('Chats', JSON.stringify(chats));
        ChatBot.getNode(id).then(
            (data)=>{
                this.setState({node:data[0],nodeOptions:data[1]})
            }
        )
    }

    render() {
        let {node,nodeOptions} = this.state;
        if(node == null || nodeOptions == null){
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
                        <p className="mb-1">{node.qa}</p>
                        {
                            node.type == 0 ? nodeOptions.map((item,index)=>{
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
                        <button className="btn btn-block btn-sm btn-success">
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
