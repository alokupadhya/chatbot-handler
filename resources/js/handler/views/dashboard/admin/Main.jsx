import React,{Fragment,Component} from 'react';
import RQ from '../../../components/dashboard/admin/requested-qu';
import '../style.css';
import Chats from '../../../services/chat';
import {withAlert} from 'react-alert';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            chats:{
                today:0,
                all:0
            },
            r_q:{
                today:0,
                all:0
            },
            active:{
                livechats:0,
                endedchats:0,
            },
            agents:{
                online:0,
                offline:0,
                busy:0
            }
        }
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            Chats.getCountsOnAdmin().then((data)=>{
                let {chats,r_q,active,agents} = this.state;
                chats.today = data[0];
                chats.all = data[1];
                r_q.today = data[2];
                r_q.all = data[3];
                active.livechats = data[4];
                active.endedchats = data[5];
                agents.online = data[6];
                agents.offline = data[7];
                agents.busy = data[8];
                this.setState({chats});
            })
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        let{chats,r_q,active,agents} =this.state;
        return(
            <Fragment>
                <div className="container-fluid box">
                    <div className="row">
                        <div className="col-12 p-0">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-light">
                                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-4 px-0 mb-2">
                            <div className="bg-light rounded p-3 mb-2">
                                <i className="fa fa-comment-alt text-success"></i> Chats
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6">
                                        <small className="text-secondary">Today</small>
                                        <h4>{chats.today}</h4>
                                    </div>
                                    <div className="col-6 text-right">
                                        <small className="text-secondary">In 7 Days</small>
                                        <h4>{chats.all}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-light rounded p-3 mb-2">
                                <i className="fa fa-file-alt text-danger"></i> No. Question Requested
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6">
                                        <small className="text-secondary">Today</small>
                                        <h4>{r_q.today}</h4>
                                    </div>
                                    <div className="col-6 text-right">
                                        <small className="text-secondary">In 7 Days</small>
                                        <h4>{r_q.all}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-light rounded p-3 mb-2">
                                <i className="fa fa-chart-bar text-primary"></i> Stats
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6"><b>Live chats</b></div>
                                    <div className="col-6 text-right">{active.livechats}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><b>Ended Chats</b></div>
                                    <div className="col-6 text-right">{active.endedchats}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><b>Agent Online</b></div>
                                    <div className="col-6 text-right">{agents.online}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><b>Agent Offline</b></div>
                                    <div className="col-6 text-right">{agents.offline}</div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><b>Agent On Chat</b></div>
                                    <div className="col-6 text-right">{agents.busy}</div>
                                </div>
                            </div>
                        
                        </div>
                        <div className="col-12 col-md-8 px-0 pl-md-2 pr-md-1 mb-2">
                            <div className="bg-light rounded p-3 mb-2">
                                <h5><i className="fa fa-edit text-muted"></i> Recent Requested Questions</h5>
                                <RQ type={'recent'} alert={this.props.alert}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withAlert()(Main);