import React,{Fragment,Component} from 'react';
import '../style.css';

class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
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
                        <div className="col-12 col-md-6 col-lg-3 px-0 pl-md-1 pr-md-1 mb-2">
                            <div className="bg-white rounded p-3">
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
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 px-0 pl-md-1 pr-md-1 mb-2">
                            <div className=" bg-white rounded p-3">
                                <i className="fa fa-chart-bar text-primary"></i> Your Status
                                <br/><br/>
                                <div className="row">
                                    <div className="col-12">
                                        <h5>
                                            <b className="">Online</b> &nbsp;&nbsp;&nbsp;
                                            <i className="fa fa-toggle-on text-success fa-2x btn"></i>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 px-0 pl-md-1 pr-md-0">
                            <div className="bg-white rounded p-3">
                                <i className="fa fa-comment text-secondary"></i> Chat Screen
                                <br/><br/>
                                <div className="alert alert-danger">
                                    <b>Note : </b>
                                    <p className="m-0">Please do not move from screen if your status is <u>online</u></p>
                                </div>
                                <div className="p-2 chat-screen border rounded bg-light" style={{minHeight:'250px',}}>
                                    <b>No active chat</b>
                                </div>
                                <form className="form form-inline">
                                    <div className="form-box"  style={{marginBottom:'5px', width:'80%'}}>
                                        <input type="text" name="msg" placeholder="Type..." style={{padding:'10px 15px'}}/>
                                    </div>
                                    <button className="btn-theme ml-2"><i className="fa fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Main;