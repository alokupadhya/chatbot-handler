import React, { Component, Fragment } from 'react';

class RequestedQU extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rq_list:null,
        }
        this.deleteQuestion = this.deleteQuestion.bind(this);
    }

    componentDidMount(){
        this.fetchData();
    }

    async fetchData(){
        const alert = this.props.alert;
        let fetch = this.props.type;
        let req = (fetch === "recent")?"show-recent":"show";
        await axios({
            url:"/api/requested-question/"+req,
            headers: {
                'ContentType':'application/json',
                'Accept':'application/json',
            },
            method:"GET",
        }).then((r)=>{
            if(r.data.status == 1){
                this.setState({rq_list : r.data.records});
            }
        }).catch((r)=>{
            alert.error("Unable to fetch requested questions, Please refresh the page.");
        });
    }

    async deleteQuestion(id){
        const alert = this.props.alert;
        let form = {
            'id':id
        }
        await axios({
            url:"/api/requested-question/delete",
            headers: {
                'ContentType':'application/json',
                'Accept':'application/json',
            },
            method:"POST",
            data:form,
        }).then((r)=>{
            alert.success(r.data.msg);
            this.fetchData();
        }).catch((r)=>{
            alert.error("Unable to deleted requested questions, Please refresh the page.");
        });
    }

    render() {
        let {rq_list} = this.state;
        if(rq_list == null || rq_list.length==0){
            return (
                <Fragment>
                    <div className="text-center py-5">
                        <img src="/img/data_not_found.png" width="150" alt="test"/>
                        <h1 className="mb-0">Hmmmmm...</h1>
                        <h5>Not Requested Yet</h5>
                        <p className="text-secondary">There is no question requested by visited user</p>
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <table className="table">
                    <thead>
                        <tr>
                            <td width="5%"><b>Sr.</b></td>
                            <td><b>Question</b></td>
                            <td width="30%"><b>Email</b></td>
                            <td width="10%"><b>Action</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rq_list.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.question}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={this.deleteQuestion.bind(this,item.id)}>
                                                <i className="fa fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

export default RequestedQU;