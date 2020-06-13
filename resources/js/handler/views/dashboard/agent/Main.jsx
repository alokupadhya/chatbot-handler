import React,{Fragment,Component} from 'react';
import {withAlert} from 'react-alert';
import ToggleWorkStatus from '../../../components/dashboard/agent/toggleWorkStatus';
import '../style.css';
import ChatScreen from '../../../components/chatscreen';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{}
        };
    }

    componentDidMount(){
        let {user} = this.state;
        user = JSON.parse(localStorage.getItem('user'));
        this.setState({user});        
    } 

    render(){
        let {user} = this.state;
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
                                        <small className="text-secondary">Today</small>
                                        <h4>0</h4>
                                    </div>
                                    <div className="col-6 text-right">
                                        <small className="text-secondary">In 7 Days</small>
                                        <h4>0</h4>
                                    </div>
                                </div>
                            </div>
                            <div className=" bg-white rounded p-3">
                                <i className="fa fa-chart-bar text-primary"></i> Your Status
                                <br/><br/>
                                <ToggleWorkStatus alert={this.props.alert}/>
                                <div className="alert alert-danger">
                                    <b>Note : </b>Please do not move from screen if your status is <u>online</u>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-12 col-md-6 px-0 pl-md-1 pr-md-0">
                            <ChatScreen alert={this.props.alert} _exl={"al_1_g"}/>
                        </div>
                        

                        <div className="col-12 col-lg-3 px-0 pl-md-2 pr-md-1 mb-2">
                            <div className="bg-white rounded p-3">
                                <i className="fa fa-align-left text-danger"></i> Custome Message<br/><br/>
                                <button className="btn-theme btn-block text-left">Hi!, this is {user.first_name}. how may i help you.</button>
                                <button className="btn-theme btn-block text-left">This session have been ended because of late response.</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withAlert()(Main);