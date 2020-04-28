import React, {Component,Fragment} from 'react';
import './style.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: false,
        };
        this.onClickSlide = this.onClickSlide.bind(this);
    }

    onClickSlide(){
        this.setState({sidebarOpen:!this.state.sidebarOpen});
        if(this.state.sidebarOpen){
            document.getElementById("nav-res").style.right = '-300px';
            console.log("close");
        }

        else{
            console.log("open");
            document.getElementById("nav-res").style.right = '0px';
        }
    }

    render() {
        return (
            <Fragment>
                <div className="nav">
                    <div className="nav-brand">
                        <img src={'/img/logo.png'} width="200"/>
                    </div>
                    <div className="nav-menu">
                        <ul className="nav-links">
                            <li className="link">
                                <a href="#home">Home</a>
                            </li>
                            <li className="link">
                                <a href="#about">About</a>
                            </li>
                            <li className="link">
                                <a href="#footer">Get In Touch</a>
                            </li>
                            <li className="link">
                                <a>Call Us 613-5327-9018</a>
                            </li>
                        </ul>
                        <div className="nav-ham">
                            <i className="fa fa-bars fa-2x" onClick={this.onClickSlide}></i>
                        </div>
                    </div>
                </div>
                        
                <ul className="nav-links-res" id="nav-res">
                    <i className="fa fa-times-circle fa-2x" onClick={this.onClickSlide}></i>
                    <li className="link">
                        <a>Home</a>
                    </li>
                    <li className="link">
                        <a>About</a>
                    </li>
                    <li className="link">
                        <a>Get In Touch</a>
                    </li>
                    <li className="link">
                        <a>Call Us 613-5327-9018</a>
                    </li>
                </ul>
            </Fragment>
        );
    }
}

export default Navbar;
