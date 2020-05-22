import React, { Component, Fragment} from 'react';

class UpdateStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form:{
                id:this.props.id,
                status:this.props.status
            }
        }
        this.callParent = this.callParent.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    callParent(){
        this.props.action(true);
    }

    async onSubmitHandler(){
        let {form}= this.state;
        let _token = localStorage.getItem('_token');
        let alert = this.props.alert;
        console.log(form);
        
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
                this.callParent();
            }
        }).catch((error)=>{
            alert.error("Unable to update agent status, Please refresh & try again.");
        });
    }
    
    render() {
        let {form} = this.state;
        return (
            <Fragment>
                <b className={form.status==0?"text-dange":"text-success"} onClick={this.onSubmitHandler}>
                    <i className={form.status==0?"fa fa-toggle-off":"fa fa-toggle-on"} title={form.status==0?"Deactive":"Active"}></i>
                </b>
            </Fragment>
        );
    }
}

export default UpdateStatus;