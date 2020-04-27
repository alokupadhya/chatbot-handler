import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Application extends Component {
    render() {
        return (
            <React.Fragment>
                Hello, world!<br/>
                This is ReactJS
            </React.Fragment>
        );
    }
}

if (document.getElementById('application')) {
    ReactDOM.render(<Application />, document.getElementById('application'));
}
