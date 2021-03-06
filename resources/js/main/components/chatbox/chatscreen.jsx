import React, { Component, Fragment } from 'react';

class chatscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                message:"",
                session_token:null
            },
            validation:{
                message:{
                    message:"",
                    status:null,
                },
                status:false,
            },
            chats:null,
            agent:null,
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.fetchChats = this.fetchChats.bind(this);
        this.endSession = this.endSession.bind(this);
    }

    componentDidMount(){
        this.scrollToBottom();
        this.interval = setInterval(() => this.fetchChats(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onChangeHandler(event){
        let {form} = this.state;
        form[event.target.name] = event.target.value;
        this.setState({form:form},this.validationHandler(event.target.name,event.target.value));
    }

    validationHandler(input,value){
        let {validation} = this.state;
        switch(input){
            case 'message':
                if(value.length < 1){
                    validation.message.message = "Minimum 1 char required.";
                    validation.message.status = false;
                }
                else{
                    validation.message.message = "";
                    validation.message.status = true;
                }
                break;
            default:
                break;
        }
        validation.status = (validation.message.status);
        this.setState({validation:validation});
    }

    async onSubmitHandler(event){
        event.preventDefault();
        let {form,validation}= this.state;
        form.session_token = localStorage.getItem('session_token');
        let alert = this.props.alert;
        if(validation.status){
            await axios({
                url:"/api/chat/store",
                method:"POST",
                headers: {
                    'ContentType':'application/json',
                    'Accept':'application/json'
                },
                data:form
            }).then((r)=>{
                if(r.status == 200){
                    this.fetchChats();
                    form.message = "";
                    this.setState({form});
                }
            }).catch((error)=>{
                if(error.response.status == 422){
                    if(error.response.data.status == 1){
                        this.bindServerError(error.response.data.msg);
                    }
                    if(error.response.data.status == 2){
                        localStorage.removeItem('session_token');
                        this.props.action(false);
                        alert.info(error.response.data.msg);
                    }
                }
                else{
                    alert.error("Unable to send message, Please refresh & try again.");
                }
            });
        }
        else{
            alert.info('Please enter message!');
        }
    }

    async fetchChats(){
        let d = {session_token : this.props.s_t};
        let alert = this.props.alert;
        await axios({
            url:"/api/chat/get-chats",
            method:"POST",
            headers: {
                'ContentType':'application/json',
                'Accept':'application/json'
            },
            data:d
        }).then((r)=>{
            if(r.status == 200){
                this.setState({
                    chats:r.data.records[0],
                    agent:r.data.records[1]
                });
            }
        }).catch((error)=>{
            if(error.response.status == 422){
                if(error.response.data.status == 1){
                    this.bindServerError(error.response.data.msg);
                }
                if(error.response.data.status == 2){
                    localStorage.removeItem('session_token');
                    this.props.action(false);
                    alert.info(error.response.data.msg);
                }
            }
            else{
                alert.error("Unable to messages, Please refresh & try again.");
            }
        });
        
    }

    bindServerError(errors){
        let { validation } = this.state;
        if(typeof(errors.message)!="undefined"){
            validation.message.message = errors.email[0];
            validation.message.status = false;
        }
        this.setState({validation:validation});
    }

    async endSession(){
        let alert = this.props.alert;
        let d = {session_token : this.props.s_t};
        await axios({
            url:"/api/chat/end-session",
            method:"POST",
            headers: {
                'ContentType':'application/json',
                'Accept':'application/json'
            },
            data:d
        }).then((r)=>{
            if(r.status == 200){
                this.setState({
                    chats:null,
                    user:null,
                })
                alert.success("Session Ended.");
                window.location.assign('/');
            }
        }).catch((error)=>{
            alert.error("Unable to end session, Please refresh & try again.");
        });
    }

    scrollToBottom(){
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
    this.scrollToBottom();
    }
    
    render() {
        let {form,chats,agent} = this.state; 
        console.log(chats,agent);
        
        return (
            <Fragment>
                <div className="bg-white rounded p-3">
                    <div className="row mb-2">
                        <div className="col-6">
                            <i className="fa fa-comment text-secondary"></i> Chat Screen
                        </div>
                        <div className="col-6 text-right">
                            <button className="btn btn-sm btn-danger" onClick={this.endSession}>End Session</button>
                        </div>
                    </div>                    
                    <div className="p-2 chat-screen border rounded bg-light" style={{minHeight:'269px',maxHeight:'269px'}}>
                    {
                        (chats)?
                            chats.map(
                                (item,index)=>{
                                    if(item.who===0){
                                        return(
                                            <div key={index} className="q w-75 mb-2 bg-white border shadow-sm rounded p-2">
                                                <b className="text-muted">Agent: </b>{item.message}
                                            </div>
                                        )
                                    }
                                        
                                    else{
                                        return(
                                            <div key={index} className="q w-75 ml-auto mb-2 bg-success text-white border shadow-sm rounded p-2">
                                                <b className="text-light">You: </b>{item.message}
                                            </div>
                                        )
                                    }
                                }
                            )
                        :null
                    }
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                    </div>
                    <form className="form" onSubmit={this.onSubmitHandler}>
                        <div className="row px-3 mt-2">
                            <div className="col-10 pl-0">
                                <div className="form-box mb-0">
                                    <input type="text" name="message" value={form.message} placeholder="Type..." style={{marginTop:'0px'}} onChange={this.onChangeHandler}/>
                                </div>
                            </div>
                            <div className="col-2 px-0">
                                <button className="btn-theme btn-block h-100"><i className="fa fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default chatscreen;