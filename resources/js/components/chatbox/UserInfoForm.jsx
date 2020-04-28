import React, {Component,Fragment} from 'react';

class UserInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            form:{
                email:"", phone:"", name:""
            },
            validation:{
                email:{ status:null, message:"" },
                phone:{ status:null, message:"" },
                name:{ status:null, message:"" },
                status:false
            },
            message:{
                type:null, text:""
            },
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event){
        let {form} = this.state;
        form[event.target.name] = event.target.value;
        this.setState({form:form},this.validationHandler(event.target.name,event.target.value));
    }

    validationHandler(input,value){
        let {validation} = this.state;
        switch(input){
            case 'email':
                if(!this.ValidateEmail(value)){
                    validation.email.message = "Enter a Valid Email";
                    validation.email.status = false;
                }
                else{
                    validation.email.message = "";
                    validation.email.status = true;
                }
                break;
            case 'phone':
                if(value.match(/(?!^\d+$)^.+$/)){
                    validation.phone.message = "Must be number.";
                    validation.phone.status = false;
                }
                else{
                    validation.phone.message = "";
                    validation.phone.status = true;
                }
                break;
            case 'name':
                if(value.length < 3){
                    validation.name.message = "Minimum 3 character required";
                    validation.name.status = false;
                }
                else{
                    validation.name.message = "";
                    validation.name.status = true;
                }
                break;
            default:
                break;
        }
        validation.status = (validation.email.status && validation.phone.status && validation.name.status);
        this.setState({validation:validation});
    }

    ValidateEmail(mail){
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
     }

    onSubmitHandler(event){
        event.preventDefault();
    }

    render() {
        let {form,validation} = this.state;
        return (
            <Fragment>
                <form className="form px-3 py-4" onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label className="mb-0">Email address
                            <span className={validation.email.status==false?"text-danger":"d-none"}>
                                <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                {validation.email.message}
                            </span>
                        </label>
                        <input type="email" name="email" onChange={this.onChangeHandler} className="form-control" id="email" value={form.email} placeholder="Enter email"/>
                        <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label className="mb-0">Phone Number
                            <span className={validation.phone.status==false?"text-danger":"d-none"}>
                                <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                {validation.phone.message}
                            </span>
                        </label>
                        <input type="text" name="phone" onChange={this.onChangeHandler} className="form-control" id="mobile" value={form.phone} placeholder="Enter mobile no."/>
                    </div>
                    <div className="form-group">
                        <label className="mb-0">Full Name
                            <span className={validation.name.status==false?"text-danger":"d-none"}>
                                <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                {validation.name.message}
                            </span>
                        </label>
                        <input type="text" name="name" onChange={this.onChangeHandler} className="form-control" id="name" value={form.name} placeholder="Enter your full name"/>
                    </div>
                    <button className="btn btn-danger btn-block" disabled={!validation.status}>Submit</button>
                </form>
            </Fragment>
        );
    }
}

export default UserInfoForm;
