import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom";
import { Cube } from 'react-preloaders';

import EditQu from '../../../../components/dashboard/admin/chatbot-qu/EditQu';
import AddOption from '../../../../components/dashboard/admin/chatbot-qu/AddOption';
import EditOption from '../../../../components/dashboard/admin/chatbot-qu/EditOption';


class NextNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qa_id : this.props.id,
            node : null,
            options: null
        }
        this.childHandler = this.childHandler.bind(this);
        this.optionsChildHandler = this.optionsChildHandler.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
    }

    componentDidMount(){
        this.fetchData();
    }

    async fetchData(){
        let {qa_id} = this.state;
        let _token = localStorage.getItem('_token');
        const alert = this.props.alert;
        let d = {'id':qa_id};
        await axios({
            url:"/api/admin/bot/get-node",
            headers: {
                'Authorization': 'Bearer '+ _token,
                'ContentType':'application/json',
                'Accept':'application/json',
            },
            method:"POST",
            data:d
        }).then((r)=>{
            if(r.data.status == 1){
                this.setState({
                    node : r.data.records,
                });
            }
        }).catch((r)=>{
            alert.error("Unable to fetch node, Please refresh the page.");
        });
        this.fetchOptionData();
    }

    async fetchOptionData(){
        let _token = localStorage.getItem('_token');
        let {node} = this.state;
        const alert = this.props.alert;
        let d = {'id':node.id};
        await axios({
            url:"/api/admin/bot/get-options",
            headers: {
                'Authorization': 'Bearer '+ _token,
                'ContentType':'application/json',
                'Accept':'application/json',
            },
            method:"POST",
            data:d
        }).then((r)=>{
            if(r.data.status == 1){
                this.setState({
                    options : r.data.records,
                });
            }
        }).catch((r)=>{
            alert.error("Unable to fetch options in node, Please refresh the page.");
        });
    }

    childHandler(data){
        this.fetchData();
    }

    optionsChildHandler(data){
        this.fetchOptionData();
    }

    async deleteNode(id){
        let _token = localStorage.getItem('_token');
        let alert = this.props.alert;
        let d = {'id':id};        
        await axios({
            url:"/api/admin/bot/delete-node",
            method:"POST",
            headers: {
                'Authorization': 'Bearer '+ _token,
                'ContentType':'application/json',
                'Accept':'application/json'
            },
            data:d
        }).then((r)=>{
            if(r.status == 200){
                alert.success("Option deleted");
                this.fetchOptionData();
            }
        }).catch((error)=>{
            if(error.response.status == 422){
                if(error.response.data.status == 1){
                }
                alert.error(error.response.data.msg);
            }
            else{
                alert.error("Unable to delete option, Please refresh & try again.");
            }
        });
    }

    renderOptions(){
        let {options} = this.state;
        let alert = this.props.alert;
        if(options == null || options.length==0){
            return(
                <i>There is no option created in this node</i>                    
            )
        }
        return(
            options.map((item,index)=>{
                return(
                    <div key={index} className="mr-2 mb-2 px-4 py-2 btn btn-theme text-light">    
                        <div className="btn text-light next-node-link">
                            <a href={"/dashboard/admin/manage-chatbot-qa/next-node/"+item.id}>{item.option}</a>
                        </div>
                        &nbsp;
                        <EditOption 
                            option={item.option}
                            id={item.id}
                            action={this.optionsChildHandler}
                            alert={alert}
                        />
                        <div className="btn btn-danger btn-sm ml-2 " onClick={this.deleteNode.bind(this,item.id)}><i  className="fa fa-trash-alt text-light" title="Delete Option"></i></div>
                    </div>
                    
                )
            })
        );
    }
    
    render() {
        let {node} = this.state;
        if(this.state.node == null)
            return(
                <Fragment>
                    <Cube/>
                </Fragment>
            )
        return (
            <Fragment>
                <div className="col-12 col-md-8 px-0 pl-md-2 mb-2">
                    <div className="bg-light rounded p-3">
                        <div className="row mb-2">
                            <div className="col-12 box-left-title"><div>Node</div></div>
                        </div>
                        <div className="alert alert-primary">
                            <div className="row">
                                <div className="col-6">
                                    <b>Type: {node.type==0?"Question":"Final"}</b>
                                </div>
                                <div className="col-6 text-right">
                                    <EditQu
                                        alert={this.props.alert}
                                        action={this.childHandler}
                                        id={node.id}
                                        qa={node.qa}
                                        type={node.type}
                                        isRoot={node.bot_option_id==null?true:false}
                                    />
                                </div>
                                
                            </div>
                            <p className="text-secondary">{node.qa}</p>
                            <div className={node.type==0?"d-block":"d-none"}>
                                <b>Options:</b><br/>
                                {this.renderOptions()}
                            </div>
                        </div>
                        <AddOption id={node.id} action={this.optionsChildHandler} alert={this.props.alert}/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default NextNode;