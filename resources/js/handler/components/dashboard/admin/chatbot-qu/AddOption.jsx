import React, { Component,Fragment } from 'react';
import Popup from "reactjs-popup";

class AddOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup:false,
            form:{
                option:"",
                id:this.props.id
            },
            validation:{
                status:false,
                option:{
                    message:"",
                    status:null
                }
            }
        }
        this.openCloseFrom = this.openCloseFrom.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.callParent = this.callParent.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
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

    async onSubmitHandler(event){
        event.preventDefault();
        let {form,validation}= this.state;
        let _token = localStorage.getItem('_token');
        let alert = this.props.alert;
        console.log(form);
        
        if(validation.status){
            await axios({
                url:"/api/admin/bot/add-option",
                method:"POST",
                headers: {
                    'Authorization': 'Bearer '+ _token,
                    'ContentType':'application/json',
                    'Accept':'application/json'
                },
                data:form
            }).then((r)=>{
                if(r.status == 200){
                    alert.success("Option added to node");
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

    validationHandler(input,value){
        let {validation} = this.state;
        switch(input){
            case 'option':
                if(value.length < 4){
                    validation.option.message = "Minimum 4 character requiered";
                    validation.option.status = false;
                }
                else if(value.length > 20){
                    validation.option.message = "Max 20 character allowed";
                    validation.option.status = false;
                }
                else{
                    validation.option.message = "";
                    validation.option.status = true;
                }
                break;
            default:
                break;
        }
        validation.status = (validation.option.status);
        this.setState({validation:validation});
    }

    
    render() {
        let {form,validation} = this.state;
        return (
            <Fragment>
                <div className="text-center mt-4">
                    <button className="btn btn-theme" onClick={this.openCloseFrom}>
                        <i className="fa fa-plus-circle text-light mr-2" title='Add Option'></i>
                        <span className="text-light">Add Option</span>
                    </button>
                </div>
                <Popup modal open={this.state.popup} closeOnDocumentClick={false} closeOnEscape={false}>
                    <div className="popup-container">
                        <span className="close-on-popup" onClick={this.openCloseFrom}><i className="fa fa-times-circle"></i></span>
                        <form className="form" onSubmit={this.onSubmitHandler}>
                            <h3>Add Option to Node</h3>
                            <div className="form-box">
                                <label>Option
                                    <small className={validation.option.status==false?"text-danger":"d-none"}>
                                        <i className="fa fa-exclamation-triangle"></i>&nbsp;
                                        {validation.option.message}
                                    </small>
                                </label>
                                <input type="text" name="option" value={form.option} onChange={this.onChangeHandler}/>
                            </div>
                            <button className="btn-theme">Add</button>
                        </form>
                    </div>
                </Popup>
            </Fragment>
        );
    }
}

export default AddOption;