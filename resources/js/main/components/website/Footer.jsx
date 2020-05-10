import React, {Component,Fragment} from 'react';
import './style.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className="footer" id="footer">
                    <div className="footer-services">
                        <h3>Contact</h3>
                        <ul>
                            <li>
                                <i>Australia:</i><br/>
                                <b>1800 FED UNI (1800 333 864)</b>
                            </li>
                            <li>
                                <i>International:</i><br/>
                                <b>61 3 5327 9018</b>
                            </li>
                            <li>
                                <i>Email:</i><br/>
                                <b>info@federation.edu.au</b>
                            </li>
                            <li>
                                <i>Emergency on campus:</i><br/>
                                <b>1800 FED SEC (1800 333 732)</b>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-company">
                        <h3>Ask Federation</h3>
                        <p>
                        The answer to your enquiry may be just a step away.
                        <br/>
                        If you don't find an answer you can submit an enquiry online.
                        </p>
                    </div>
                    <div className="footer-social">
                        <h3>Social</h3>
                        <ul>
                            <li><i className="fab fa-2x fa-facebook"></i></li>
                            <li><i className="fab fa-2x fa-twitter"></i></li>
                        </ul>
                    </div>
                    <div className="footer-form">
                        <h3>Acknowledgement of Country</h3>
                        <p>
                            Federation University Australia acknowledges the Traditional Custodians of the lands and waters where our campuses, centres and field stations are located and we pay our respects to Elders past and present, and extend our respect to all Aboriginal and Torres Strait Islander and First Nations Peoples.
                        </p>
                    </div>
                    <div className="footer-sub-left">
                        <small>© Copyright Federation University Australia</small  >
                    </div>
                    <div className="footer-sub-right">

                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Navbar;
