import React, {Component,Fragment} from 'react';

class Main extends Component {
    constructor(props){
		super(props);
		this.state = { 
            forgot: false,
            form:{
                email:"",
            },
            validation:{
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
            wait_msg:"",
            btn_lock:false,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
	}	

    onChangeHandler(event){
        let {form} = this.state;
        form[event.target.name] = event.target.value;
        this.setState({form:form},this.validationHandler(event.target.name,event.target.value));
    }

    async onSubmitHandler(event){
        event.preventDefault();
        let {form,validation,btn_lock}= this.state;
        let alert = this.props.alert;
        this.setState({wait_msg:"Please Wait..."});
        if(!btn_lock){
            if(validation.status){
                this.setState({btn_lock:true});
                await axios({
                    url:"/api/forgot-password",
                    method:"POST",
                    data:form
                }).then((r)=>{
                    if(r.status == 200){
                        this.setState({wait_msg:"",btn_lock:false});
                        alert.success('Temporary password genrated (Valid for 4 hours). Please check in mail.');
                    }
                }).catch((r)=>{
                    this.setState({wait_msg:"",btn_lock:false});
                    alert.error('Unable to process request for forgot password');
                });
                
            }
            else{
                alert.info('Please complete login form!');
            }
        } else {
            alert.info('Please wait...');
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
            default:
                break;
        }
        validation.status = (validation.email.status);
        this.setState({validation:validation});
    }

    ValidateEmail(mail){
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    }

    render() {
        let {form, validation} = this.state;
        return (
            <Fragment>
                {/* Forgot form */}
                <form className="form" onSubmit={this.onSubmitHandler}>
                    <h3>Forgot your password?</h3>
                    <div className="form-box">
                        <label>
                            <small>Enter your registered Email ID</small>&nbsp;
                            <small className={validation.email.status==false?"text-danger":"d-none"}>
                                <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                {validation.email.message}
                            </small>
                        </label>
                        <input type="text" name="email" value={form.email} onChange={this.onChangeHandler}/>
                    </div>
                    <button className="btn-theme">Send</button>
                    &nbsp;<i className="text-danger">{this.state.wait_msg}</i>
                </form>
            </Fragment>
        );
    }
}

export default Main;
