import React,{Component,Fragment} from 'react';
import {Link} from "react-router-dom";
import {withAlert} from 'react-alert';

import AddAgent from '../../../../components/dashboard/admin/manage-agent/AddAgent';
import UpdateAgent from '../../../../components/dashboard/admin/manage-agent/UpdateAgent';


class ManageAgents extends Component{
    constructor(props){
        super(props);
        this.state = {
            agentList:null,
            deactive:0,
            active:0,
        }
        this.fetchAgentList = this.fetchAgentList.bind(this);
        this.childHandler = this.childHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount(){
        this.fetchAgentList();
    }

    childHandler(data){
        this.fetchAgentList();
    }

    async onSubmitHandler(id,status){
        let _token = localStorage.getItem('_token');
        let alert = this.props.alert;
        let form = {
            'id' : id,
            'status' : status
        }
        await axios({
            url:"/api/admin/update-status",
            method:"POST",
            headers: {
                'Authorization': 'Bearer '+ _token,
                'ContentType':'application/json',
                'Accept':'application/json'
            },
            data:form
        }).then((r)=>{
            if(r.status == 200){
                alert.success("Agent Status Updated");
                this.fetchAgentList();
            }
        }).catch((error)=>{
            alert.error("Unable to update agent status, Please refresh & try again.");
        });
    }

    async fetchAgentList(){
        let _token = localStorage.getItem('_token');
        const alert = this.props.alert;
        await axios({
            url:"/api/admin/get-agents",
            headers: {
                'Authorization': 'Bearer '+ _token,
                'ContentType':'application/json',
                'Accept':'application/json',
            },
            method:"GET",
        }).then((r)=>{
            if(r.data.status == 1){
                this.setState({
                    agentList : r.data.records,
                    active : r.data.active,
                    deactive : r.data.deactive
                });
            }
        }).catch((r)=>{
            alert.error("Unable to fetch agent list, Please refresh the page.");
        });
    }

    render(){
        let {agentList} = this.state;
        return(
            <Fragment>
                <div className="container-fluid box">
                    <div className="row">
                        <div className="col-12 p-0">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-light">
                                    <li className="breadcrumb-item" aria-current="page">
                                        <Link to="/dashboard/admin">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Manage Agents</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-4 px-0 pr-md-2 mb-2">
                            <div className="bg-light rounded p-3">
                                <i className="fa fa-chart-bar text-primary"></i> Agent Status
                                <br/><br/>
                                <div className="row">
                                    <div className="col-6 pr-2">
                                        <div className="rounded bg-success p-3">
                                            <b>Active Agents</b>
                                            <h3 className="mb-0">{this.state.active}</h3>
                                        </div>
                                    </div>
                                    <div className="col-6 pl-2">
                                        <div style={{'backgroundColor':'#f96561'}} className="rounded p-3">
                                            <b>Deactive Agents</b>
                                            <h3 className="mb-0">{this.state.deactive}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 px-0 pl-md-2 mb-2">
                            <div className="bg-light rounded p-3">
                                <div className={(agentList==null || agentList.length==0)?"d-none":""}>
                                    <div className="row">
                                        <div className="col-6 box-left-title"><div>Agent List</div></div>
                                        <div className="col-6 text-right"><AddAgent action={this.childHandler} alert={this.props.alert}/></div>
                                    </div>
                                    <div className="table-wrapper">
                                        <table className="table mt-2">
                                            <thead>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>Email</td>
                                                    <td>Last Updated</td>
                                                    <td className="text-right">Action</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                (agentList != null) ?
                                                    agentList.map((item,index)=>{
                                                        var d = new Date(item.updated_at);
                                                        return(
                                                            <tr key={index}>
                                                                <td className="text-capitalize" width="23%">
                                                                    {item.first_name +" "+ item.last_name}
                                                                </td>
                                                                <td width="30%">{item.email}</td>
                                                                <td width="33%">{`${d.getDate()}/${d.getDay()}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}`}</td>
                                                                <td width="15%" className="text-right">
                                                                    <div className="row">
                                                                        <div className="col-6 text-right p-1">
                                                                        <b className={item.status==0?"text-dange":"text-success"} onClick={this.onSubmitHandler.bind(this,item.id,item.status)}>
                                                                            <i className={item.status==0?"fa fa-toggle-off":"fa fa-toggle-on"} title={item.status==0?"Deactive":"Active"}></i>
                                                                        </b>
                                                                        </div>
                                                                        <div className="col-6 text-right">
                                                                            <UpdateAgent 
                                                                                action={this.childHandler}
                                                                                alert={this.props.alert}
                                                                                id={item.id}
                                                                                first_name={item.first_name}
                                                                                last_name={item.last_name}
                                                                                email={item.email}/>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                ) : null
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {/* <div className="text-right">
                                    <button className="btn btn-sm btn-thm">Add Agent</button>
                                </div> */}
                                <div className={(agentList==null||agentList.length==0)?"text-center py-5":"d-none"}>
                                    <img src="/img/data_not_found.png" width="150" alt="test"/>
                                    <h1 className="mb-0">Hmmmmm...</h1>
                                    <p className="text-secondary">Looks like you don't have any agent</p>
                                    <h5>Create your first Agent here</h5>
                                    <div className="text-center">
                                        <AddAgent action={this.childHandler} alert={this.props.alert}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withAlert()(ManageAgents);