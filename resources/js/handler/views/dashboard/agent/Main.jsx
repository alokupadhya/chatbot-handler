import React,{Fragment,Component} from 'react';
import {withAlert} from 'react-alert';
import '../style.css';
import ChatScreen from '../../../components/chatscreen';
import User from '../../../services/user';
import Chats from '../../../services/chat';


class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{},
            c_user:null,
            total_chats:0
        };
        this.chatScreenHandler = this.chatScreenHandler.bind(this);
    }

    componentDidMount(){
        let {user} = this.state;
        user = JSON.parse(localStorage.getItem('user'));
        this.setState({user});    
        Chats.getCountsOnAgent().then((d)=>{
            this.setState({total_chats:d[0]});
        });
    } 

    chatScreenHandler(u){
        User.getUserDetails().then((data)=>{
            this.setState({user:data,c_user:u});
        });
    }

    async onClickToggle(){
        let {user} = this.state;
        let alert = this.props.alert;
        if(user.work_status_id === 1 || user.work_status_id === 2){
            let _token = localStorage.getItem('_token');
            await axios({
                url:"/api/agent/update-work-status",
                method:"POST",
                headers: {
                    'Authorization': 'Bearer '+ _token,
                    'ContentType':'application/json',
                    'Accept':'application/json'
                },
            }).then((r)=>{
                if(r.status == 200){
                    alert.success(r.data.msg);
                    user.work_status_id = (user.work_status_id===1)?2:1;
                    this.setState({user});
                }
            }).catch((error)=>{
                alert.error("Unable to update status, Please refresh & try again.");
            });
        }
        else{
            alert.error("You can't update status.");
        }
    }

    render(){
        let {user, c_user, total_chats} = this.state;
        return(
            <Fragment>
                <div className="container-fluid box">
                    <div className="row">
                        <div className="col-12 p-0">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-white">
                                    <li className="breadcrumb-item active" aria-current="page">Agent Dashboard</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-3 px-0 pl-md-1 pr-md-1 mb-2">
                            <div className="bg-white mb-2 rounded p-3">
                                <i className="fa fa-file-alt text-danger"></i> Chats Attend
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6">
                                        <small className="text-secondary">Total</small>
                                        <h4>{total_chats}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className=" bg-white rounded p-3">
                                <i className="fa fa-chart-bar text-primary"></i> Your Status
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6">
                                        <h5 className="mb-0 pt-2">
                                            <b>
                                                {
                                                    (user.work_status_id == 1)?
                                                        "Offline"
                                                    : (user.work_status_id == 2)?
                                                        "Online"
                                                    : "Idle"
                                                }
                                            </b>
                                        </h5>
                                    </div>
                                    <div className="col-6 text-right">
                                        {
                                            (user.work_status_id == 1)?
                                                <i className="fa fa-toggle-off text-danger fa-2x btn" onClick={this.onClickToggle}></i>
                                            : (user.work_status_id == 2)?
                                                <i className="fa fa-toggle-on text-success fa-2x btn" onClick={this.onClickToggle}></i>
                                            : <i className="fa fa-toggle-on text-muted fa-2x btn" onClick={this.onClickToggle}></i>
                                        }
                                    </div>
                                </div>
                                <div className="alert alert-danger">
                                    <b>Note : </b>Please do not move from screen if your status is <u>online</u>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 px-0 pl-md-1 pr-md-0">
                            <ChatScreen action={this.chatScreenHandler} alert={this.props.alert} _exl={"al_1_g"}/>
                        </div>
                        <div className="col-12 col-lg-3 px-0 pl-md-2 pr-md-1 mb-2">
                            <div className="bg-white rounded p-3">
                                <i className="fa fa-user text-primary"></i> User Details<br/><br/>
                                {
                                    c_user==null ? <b>No active session</b>
                                    :<b>Name: {c_user}</b>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withAlert()(Main);