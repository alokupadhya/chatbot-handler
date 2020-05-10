import React, {Component,Fragment} from 'react';

class UserInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            form:{
                email:"", mobile:"", full_name:""
            },
            validation:{
                email:{ status:null, message:"" },
                mobile:{ status:null, message:"" },
                full_name:{ status:null, message:"" },
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
            case 'mobile':
                if(value.match(/(?!^\d+$)^.+$/)){
                    validation.mobile.message = "Must be number.";
                    validation.mobile.status = false;
                }
                else{
                    validation.mobile.message = "";
                    validation.mobile.status = true;
                }
                break;
            case 'full_name':
                if(value.length < 3){
                    validation.full_name.message = "Minimum 3 character required";
                    validation.full_name.status = false;
                }
                else{
                    validation.full_name.message = "";
                    validation.full_name.status = true;
                }
                break;
            default:
                break;
        }
        validation.status = (validation.email.status && validation.mobile.status && validation.full_name.status);
        this.setState({validation:validation});
    }

    ValidateEmail(mail){
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
     }

    async onSubmitHandler(event){
        event.preventDefault();
        let {form}= this.state;
        await axios({
            url:"/api/vu/store",
            headers: {
                'ContentType':'application/json',
                'Accept':'application/json',
            },
            method:"POST",
            data:form
        }).then((response)=>{
            alert(response.data.msg);
        }).catch((error)=>{
            if(error.response.status == 422){
                if(error.response.data.status == 1){
                    this.bindServerError(error.response.data.msg);
                }
            }
            else{
                alert("Unable to create chat session, Please refresh & try again.");
            }
        });
    }

    bindServerError(errors){
        let { validation } = this.state;
        if(typeof(errors.full_name)!="undefined"){
            validation.full_name.message = errors.full_name[0];
            validation.full_name.status = false;
        }
        if(typeof(errors.email)!="undefined"){
            validation.email.message = errors.email[0];
            validation.email.status = false;
        }
        if(typeof(errors.mobile)!="undefined"){
            validation.mobile.message = errors.mobile[0];
            validation.mobile.status = false;
        }
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
                        <label className="mb-0">Mobile Number
                            <span className={validation.mobile.status==false?"text-danger":"d-none"}>
                                <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                {validation.mobile.message}
                            </span>
                        </label>
                        <input type="text" name="mobile" onChange={this.onChangeHandler} className="form-control" id="mobile" value={form.mobile} placeholder="Enter mobile no."/>
                    </div>
                    <div className="form-group">
                        <label className="mb-0">Full Name
                            <span className={validation.full_name.status==false?"text-danger":"d-none"}>
                                <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                {validation.full_name.message}
                            </span>
                        </label>
                        <input type="text" name="full_name" onChange={this.onChangeHandler} className="form-control" id="name" value={form.full_name} placeholder="Enter your full name"/>
                    </div>
                    <button className="btn btn-danger btn-block" disabled={!validation.status}>Submit</button>
                </form>
            </Fragment>
        );
    }
}

export default UserInfoForm;
