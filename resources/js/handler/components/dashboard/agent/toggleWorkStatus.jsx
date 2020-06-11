import React,{Fragment,Component} from 'react';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:{}
        };
        this.onClickToggle = this.onClickToggle.bind(this);
    }

    componentDidMount(){
        let {user} = this.state;
        user = JSON.parse(localStorage.getItem('user'));
        this.setState({user});        
    }

    async onClickToggle(){
        let {user} = this.state;
        let alert = this.props.alert;
        if(user.work_status_id === 1 || user.work_status_id === 2){
            let _token = localStorage.getItem('_token');
            await axios({
                url:"/api/agent/update-work-status",
                method:"POST",
                headers: {
                    'Authorization': 'Bearer '+ _token,
                    'ContentType':'application/json',
                    'Accept':'application/json'
                },
            }).then((r)=>{
                if(r.status == 200){
                    alert.success(r.data.msg);
                    user.work_status_id = (user.work_status_id===1)?2:1;
                    this.setState({user});
                }
            }).catch((error)=>{
                alert.error("Unable to update status, Please refresh & try again.");
            });
        }
        else{
            alert.error("You can't update status.");
        }
    }

    render(){
        let {user} = this.state;
        return(
            <Fragment>
                <div className="row">
                    <div className="col-6">
                        <h5 className="mb-0 pt-2">
                            <b>
                                {
                                    (user.work_status_id == 1)?
                                        "Offline"
                                    : (user.work_status_id == 2)?
                                        "Online"
                                    : "Idle"
                                }
                            </b>
                        </h5>
                    </div>
                    <div className="col-6 text-right">
                        {
                            (user.work_status_id == 1)?
                                <i className="fa fa-toggle-off text-danger fa-2x btn" onClick={this.onClickToggle}></i>
                            : (user.work_status_id == 2)?
                                <i className="fa fa-toggle-on text-success fa-2x btn" onClick={this.onClickToggle}></i>
                            : <i className="fa fa-toggle-on text-muted fa-2x btn" onClick={this.onClickToggle}></i>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Main;