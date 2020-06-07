import React, {Component,Fragment} from 'react';
import { withAlert } from 'react-alert'
import LoginForm from '../../components/forms/login/Main';
import './style.css';

class Main extends Component {
    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 bg-light mt-5 rounded py-4 col-lg-4 text-center mx-auto">
                            <LoginForm alert={this.props.alert}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withAlert()(Main);
