import React, {Component,Fragment} from 'react';
import Popup from "reactjs-popup";


class Main extends Component {
    constructor(props){
		super(props);
		this.state = { 
            forgot: false,
            form:{
                role_id:"1",
                email:"",
                password:"",
            },
            validation:{
                password:{
                  status:null,
                  message:""
                },
                email:{
                  status:null,
                  message:""
                },
                status:false
            },
            message:{
                type:null,
                text:""
            },
            _token:"",
        };

        this.openCloseForgot = this.openCloseForgot.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}	

    openCloseForgot() {
        this.setState({ forgot: !this.state.forgot });
    }

    onChangeHandler(event){
        let {form} = this.state;
        form[event.target.name] = event.target.value;
        this.setState({form:form},this.validationHandler(event.target.name,event.target.value));
    }

    async onSubmitHandler(event){
        event.preventDefault();
        let {_token,form,validation}= this.state;
        let alert = this.props.alert;
        if(validation.status){
            await axios({
                url:"/api/login",
                method:"POST",
                data:form
            }).then((r)=>{
                if(r.status == 200){
                    _token=r.data.token;
                    localStorage.setItem('_token',_token);
                    window.location.assign('/dashboard');
                }
            }).catch((r)=>{
                alert.error('Unauthorized Access!');
            });
           
            this.setState({
                _token:_token,
            });
        }
        else{
            alert.info('Please complete login form!');
        }
    }

    validationHandler(input,value){
        let {validation} = this.state;
        switch(input){
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
            case 'password':
                if(value.length < 1){
                    validation.password.message = "Password is required";
                    validation.password.status = false;
                }
                else{
                    validation.password.message = "";
                    validation.password.status = true;
                }
                break;
            default:
                break;
        }
        validation.status = (validation.email.status && validation.password.status);
        this.setState({validation:validation});
    }

    ValidateEmail(mail){
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    }

    render() {
        let {form, validation} = this.state;
        return (
            <Fragment>
                <div className="login-form">
                    <h3>Chatbot Handler</h3>
                    <small>Sign in to Dashboard</small><br/>
                    
                    {/* Login form */}
                    <form className="form" onSubmit={this.onSubmitHandler}>
                        <div className="form-box">
                            <label><small>User Type</small></label>
                            <select name="role_id" onChange={this.onChangeHandler}>
                                <option value="1">Adminstration</option>
                                <option value="2">Agent</option>
                            </select>
                        </div>
                        <div className="form-box">
                            <label>
                                <small>Email</small>&nbsp;
                                <small className={validation.email.status==false?"text-danger":"d-none"}>
                                    <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                    {validation.email.message}
                                </small>
                            </label>
                            <input type="text" name="email" value={form.email} onChange={this.onChangeHandler}/>
                        </div>
                        <div className="form-box">
                            <label>
                                <small>Password</small>&nbsp;
                                <small className={validation.password.status==false?"text-danger":"d-none"}>
                                    <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                    {validation.password.message}
                                </small>
                            </label>
                            <input type="password" name="password" value={form.password} onChange={this.onChangeHandler}/>
                        </div>
                        <button className="btn">Login</button> <span className="forgot-password">or <a onClick={this.openCloseForgot}>forgot password?</a></span>
                    </form>

                    {/* Reset password form */}
                    <Popup modal open={this.state.forgot} closeOnDocumentClick={false} closeOnEscape={false}>
                        <div className="popup-container">
                            <span className="close-on-popup" onClick={this.openCloseForgot}><i className="fa fa-times-circle"></i></span>
                            <form className="form">
                                <h3>Forgot your password?</h3>
                                <div className="form-box">
                                    <label>Enter your registered Email ID</label>
                                    <input type="text"/>
                                </div>
                                <button className="btn btn-thm">Send</button>
                            </form>
                        </div>
                    </Popup>
                </div>
            </Fragment>
        );
    }
}

export default Main;
