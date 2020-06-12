import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {withAlert} from 'react-alert';
import RequestedList from '../../../../components/dashboard/admin/requested-qu';

class Index extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Fragment>
                <div className="container-fluid box">
                    <div className="row">
                        <div className="col-12 p-0">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-light">
                                    <li className="breadcrumb-item" aria-current="page">
                                        <Link to="/dashboard/admin">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Requested Questions</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 p-0 bg-light rounded shadow-sm">
                            <RequestedList type={'show'} alert={this.props.alert}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withAlert()(Index);