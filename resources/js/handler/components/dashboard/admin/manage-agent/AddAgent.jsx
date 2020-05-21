import React, { Component, Fragment} from 'react';
import Popup from "reactjs-popup";

class AddAgent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup:false,
            form:{
                first_name:"",
                last_name:"",
                email:"",
            },
            validation:{
                first_name:{
                    message:"",
                    status:null,
                },
                last_name:{
                    message:"",
                    status:null,
                },
                email:{
                    message:"",
                    status:null,
                },
            }
        }
        this.openCloseFrom = this.openCloseFrom.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    openCloseFrom() {
        this.setState({ popup: !this.state.popup });
    }

    ValidateEmail(mail){
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    }

    onChangeHandler(event){
        let {form} = this.state;
        form[event.target.name] = event.target.value;
        this.setState({form:form},this.validationHandler(event.target.name,event.target.value));
    }

    validationHandler(input,value){
        let {validation} = this.state;
        switch(input){
            case 'first_name':
                if(value.length < 4){
                    validation.first_name.message = "Lenght must be 4 char long";
                    validation.first_name.status = false;
                }
                else if(value.length > 255){
                    validation.first_name.message = "255 character allowed";
                    validation.first_name.status = false;
                }
                else{
                    validation.first_name.message = "";
                    validation.first_name.status = true;
                }
                break;
            case 'last_name':
                if(value.length < 4){
                    validation.last_name.message = "Lenght must be 4 char long";
                    validation.last_name.status = false;
                }
                else if(value.length > 255){
                    validation.last_name.message = "255 character allowed";
                    validation.last_name.status = false;
                }
                else{
                    validation.last_name.message = "";
                    validation.last_name.status = true;
                }
                break;
            case 'email':
                if(value.length == 0){
                    validation.email.message = "Email is required";
                    validation.email.status = false;
                }
                else if(!this.ValidateEmail(value)){
                    validation.email.message = "Invalid Email ID";
                    validation.email.status = false;
                }
                else{
                    validation.email.message = "";
                    validation.email.status = true;
                }
                break;
            default:
                break;
        }
        validation.status = (validation.email.status && validation.first_name.status && validation.last_name.status);
        this.setState({validation:validation});
    }

    async onSubmitHandler(event){
        event.preventDefault();
        let {form,validation}= this.state;
        let _token = localStorage.getItem('_token');
        let alert = this.props.alert;
        if(validation.status){
            await axios({
                url:"/api/admin/create-agent",
                method:"POST",
                headers: {
                    'Authorization': 'Bearer '+ _token,
                    'ContentType':'application/json',
                    'Accept':'application/json'
                },
                data:form
            }).then((r)=>{
                if(r.status == 200){
                    alert.success("New Agent Created");
                    this.openCloseFrom();
                }
            }).catch((error)=>{
                if(error.response.status == 422){
                    if(error.response.data.status == 1){
                        this.bindServerError(error.response.data.msg);
                    }
                }
                else{
                    alert.error("Unable to create agent, Please refresh & try again.");
                }
            });
        }
        else{
            alert.info('Please complete the form!');
        }
    }

    bindServerError(errors){
        let { validation } = this.state;
        if(typeof(errors.first_name)!="undefined"){
            validation.first_name.message = errors.first_name[0];
            validation.first_name.status = false;
        }
        if(typeof(errors.last_name)!="undefined"){
            validation.last_name.message = errors.last_name[0];
            validation.last_name.status = false;
        }
        if(typeof(errors.email)!="undefined"){
            validation.email.message = errors.email[0];
            validation.email.status = false;
        }
        this.setState({validation:validation});
    }
    
    render() {
        let {form,validation}= this.state;
        return (
            <Fragment>
                <audio>text</audio>
                <button className="btn btn-sm btn-thm" onClick={this.openCloseFrom}>Create Agent</button>
                <Popup modal open={this.state.popup} closeOnDocumentClick={false} closeOnEscape={false}>
                    <div className="popup-container">
                        <span className="close-on-popup" onClick={this.openCloseFrom}><i className="fa fa-times-circle"></i></span>
                        <form className="form" onSubmit={this.onSubmitHandler}>
                            <h3>Create New Agent</h3>
                            <div className="form-box">
                                <label>First Name 
                                    <small className={validation.first_name.status==false?"text-danger":"d-none"}>
                                        <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                        {validation.first_name.message}
                                    </small>
                                </label>
                                <input type="text" name="first_name" value={form.first_name} onChange={this.onChangeHandler}/>
                            </div>
                            <div className="form-box">
                                <label>Last Name 
                                <small className={validation.last_name.status==false?"text-danger":"d-none"}>
                                        <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                        {validation.last_name.message}
                                    </small>
                                </label>
                                <input type="text" name="last_name" value={form.last_name} onChange={this.onChangeHandler}/>
                            </div>
                            <div className="form-box">
                                <label>Email <small className={validation.email.status==false?"text-danger":"d-none"}>
                                        <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                        {validation.email.message}
                                    </small></label>
                                <input type="email" name="email" value={form.email} onChange={this.onChangeHandler}/>
                            </div>
                            <button className="btn btn-thm">Create</button>
                        </form>
                    </div>
                </Popup>
            </Fragment>
        );
    }
}

export default AddAgent;