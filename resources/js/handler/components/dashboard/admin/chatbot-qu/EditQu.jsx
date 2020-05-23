import React, { Component,Fragment } from 'react';
import Popup from "reactjs-popup";


class EditQu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup:false,
            form:{
                id:this.props.id,
                qa:this.props.qa,
                type:this.props.type,
            },
            validation:{
                status:true,
                qa:{
                    message:"",
                    status:true,
                },
            },
            isRoot:this.props.isRoot,

        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.openCloseFrom = this.openCloseFrom.bind(this);
        this.callParent = this.callParent.bind(this);

    }

    callParent(){
        this.props.action(true);
    }

    openCloseFrom() {
        if(this.state.popup){
            this.callParent();
        }
        this.setState({ popup: !this.state.popup });
    }

    onChangeHandler(event){
        let {form} = this.state;
        form[event.target.name] = event.target.value;
        this.setState({form:form},this.validationHandler(event.target.name,event.target.value));
    }

    validationHandler(input,value){
        let {validation} = this.state;
        switch(input){
            case 'qa':
                if(value.length < 5){
                    validation.qa.message = "Minimum 5 char long";
                    validation.qa.status = false;
                }
                else if(value.length > 255){
                    validation.qa.message = "255 character allowed";
                    validation.qa.status = false;
                }
                else{
                    validation.qa.message = "";
                    validation.qa.status = true;
                }
                break;
            default:
                break;
        }
        validation.status = (validation.qa.status);
        this.setState({validation:validation});
    }
    
    async onSubmitHandler(event){
        event.preventDefault();
        let {form,validation}= this.state;
        let _token = localStorage.getItem('_token');
        let alert = this.props.alert;
        if(validation.status){
            await axios({
                url:"/api/admin/bot/update-node-question",
                method:"POST",
                headers: {
                    'Authorization': 'Bearer '+ _token,
                    'ContentType':'application/json',
                    'Accept':'application/json'
                },
                data:form
            }).then((r)=>{
                if(r.status == 200){
                    alert.success("Node Question Updated");
                    this.openCloseFrom();
                }
            }).catch((error)=>{
                if(error.response.status == 422){
                    if(error.response.data.status == 1){
                        this.bindServerError(error.response.data.msg);
                    }
                    alert.error(error.response.data.msg);
                }
                else{
                    alert.error("Unable to update Question, Please refresh & try again.");
                }
            });
        }
        else{
            alert.info('Please complete the form!');
        }
    }

    bindServerError(errors){
        let { validation } = this.state;
        if(typeof(errors.qu)!="undefined"){
            validation.qu.message = errors.qu[0];
            validation.qu.status = false;
        }
        this.setState({validation:validation});
    }

    render() {
        let {form, validation, isRoot} = this.state;
        return (
            <Fragment>
                <div className="btn" onClick={this.openCloseFrom}><i className="fa fa-edit"  title="Update Agent Detail"></i> Edit</div>
                <Popup modal open={this.state.popup} closeOnDocumentClick={false} closeOnEscape={false}>
                    <div className="popup-container">
                        <span className="close-on-popup" onClick={this.openCloseFrom}><i className="fa fa-times-circle"></i></span>
                        <form className="form" onSubmit={this.onSubmitHandler}>
                            <h3>Update Question Details</h3>
                            <div className={!isRoot?"form-box":"d-none"}>
                                <label>Node Type<small></small></label>
                                <select name="type" value={form.type} onChange={this.onChangeHandler}>
                                    <option value="0">Question</option>
                                    <option value="1">Final</option>
                                </select>
                            </div>
                            <div className="form-box">
                                <label>Question
                                    <small className={validation.qa.status==false?"text-danger":"d-none"}>
                                        <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                        {validation.qa.message}
                                    </small>
                                </label>
                                <textarea className={validation.qa.status==false?"border-danger form-control":"form-control"} name="qa" value={form.qa} onChange={this.onChangeHandler}>
                                </textarea>
                            </div>
                            <button className="btn-theme">Update</button>
                        </form>
                    </div>
                </Popup>
            </Fragment>
        );
    }
}

export default EditQu;