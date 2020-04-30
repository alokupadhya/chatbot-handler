import React, {Component,Fragment} from 'react';
import './style.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className="home-banner" id="home">
                    <div className="banner-text">
                        <h1>Access the information you need</h1>
                        <h3>Online, anytime</h3>
                    </div>
                </div>
                <div className="home-welcome" id="about">
                    <h2>Welcome to Federation</h2>
                    <p>
                        At Federation University, the desire to transform lives and enhance communities informs everything we do. From research that improves people’s lives right around the world, to supporting our students to succeed at their studies and in life – we make a difference. With campuses in Ballarat, Berwick, Brisbane, Gippsland and the Wimmera, we became Federation University in 2014 – a new entity bringing together almost 150 years of history from our predecessor institutions. As a young university, we have the energy and optimism of youth combined with the knowledge and experience that comes from our history as one of the oldest universities in Australia, dating back to 1870. We are a diverse community with over 24,000 domestic and international students and 110,000 alumni across Australia and the world. We are creating a Federation of independent thinkers, of like-minded individuals who are determined to make their mark.
                    </p>
                    <div className="container">
                        <div className="row">
                            <div className="col-md col-sm-12">
                                <img src={'/img/about-1.jpg'}/>
                                <h3>Our university</h3>
                            </div>
                            <div className="col-md col-sm-12">
                                <img src={'/img/about-2.jpg'}/>
                                <h3>Our campuses</h3>
                            </div>
                            <div className="col-md col-sm-12">
                                <img src={'/img/about-3.jpg'}/>
                                <h3>Our history</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Home;
