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
                                <ol className="breadcrumb bg-light">
                                    <li className="breadcrumb-item active" aria-current="page">Agent Dashboard</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-3 px-0 pl-md-1 pr-md-2 mb-2">
                            <div className="bg-light rounded p-3">
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
                        <div className="col-12 col-md-6 col-lg-3 px-0 mb-2">
                            <div className="h-100 bg-light rounded p-3">
                                <i className="fa fa-chart-bar text-primary"></i> Your Status
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6"><b>Online</b></div>
                                    <div className="col-6 text-right">0</div>
                                </div>
                                <div className="row">
                                    <div className="col-6"><b>Offline</b></div>
                                    <div className="col-6 text-right">0</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Main;