import React, { Component, Fragment } from 'react';
import Popup from "reactjs-popup";

class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup:false,
            form:{
                new_password:"",
                old_password:"",
            },
            validation:{
                status:false,
                new_password:{
                    message:"",
                    status:null
                },
                old_password:{
                    message:"",
                    status:null
                }
            }
        }
        this.openCloseFrom = this.openCloseFrom.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    openCloseFrom() {
        this.setState({ popup: !this.state.popup });
    }

    onChangeHandler(event){
        let {form} = this.state;
        form[event.target.name] = event.target.value;
        this.setState({form:form},this.validationHandler(event.target.name,event.target.value));
    }

    async onSubmitHandler(event){
        event.preventDefault();
        let {form,validation}= this.state;
        let _token = localStorage.getItem('_token');
        let alert = this.props.alert;
        if(validation.status){
            await axios({
                url:"/api/update-password",
                method:"POST",
                headers: {
                    'Authorization': 'Bearer '+ _token,
                    'ContentType':'application/json',
                    'Accept':'application/json'
                },
                data:form
            }).then((r)=>{
                if(r.status == 200){
                    alert.success("Password Updated Successfully");
                    this.openCloseFrom();
                }
            }).catch((error)=>{
                alert.error("Unable to update Password, Please refresh & try again.");
            });
        }
        else{
            alert.info('Please complete the form!');
        }
    }

    validationHandler(input,value){
        let {validation} = this.state;
        switch(input){
            case 'old_password':
                if(value.length < 1){
                    validation.old_password.message = "Old password is requiered";
                    validation.old_password.status = false;
                }
                else{
                    validation.old_password.message = "";
                    validation.old_password.status = true;
                }
                break;
            case 'new_password':
                if(value.length < 6){
                    validation.new_password.message = "Must be 6 character long";
                    validation.new_password.status = false;
                }
                else{
                    validation.new_password.message = "";
                    validation.new_password.status = true;
                }
                break;
            default:
                break;
        }
        validation.status = (validation.old_password.status && validation.new_password.status);
        this.setState({validation:validation});
    }
    
    render() {
        let {form,validation} = this.state;
        return (
            <Fragment>
                <button className="btn btn-success" onClick={this.openCloseFrom}>
                    <i className="fa fa-key"></i> Update Password
                </button>
                <Popup modal open={this.state.popup} closeOnDocumentClick={false} closeOnEscape={false}>
                    <div className="popup-container">
                        <span className="close-on-popup" onClick={this.openCloseFrom}><i className="fa fa-times-circle"></i></span>
                        <form className="form" onSubmit={this.onSubmitHandler}>
                            <h3>Update Password</h3>
                            <div className="form-box">
                                <label>New Password
                                    <small className={validation.new_password.status==false?"text-danger":"d-none"}>
                                        <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                        {validation.new_password.message}
                                    </small>
                                </label>
                                <input type="text" name="new_password" value={form.new_password} onChange={this.onChangeHandler}/>
                            </div>

                            <div className="form-box">
                                <label>Old Password
                                    <small className={validation.old_password.status==false?"text-danger":"d-none"}>
                                        <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                        {validation.old_password.message}
                                    </small>
                                </label>
                                <input type="text" name="old_password" value={form.old_password} onChange={this.onChangeHandler}/>
                            </div>
                            <button className="btn-theme">Update</button>
                        </form>
                    </div>
                </Popup>
            
            </Fragment>
        );
    }
}

export default UpdatePassword;