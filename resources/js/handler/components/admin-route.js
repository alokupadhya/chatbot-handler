import React, { useState, useEffect, Fragment } from 'react';
import {Route,Redirect} from 'react-router-dom';
import { Cube } from 'react-preloaders';

import Navbar from '../components/navbar/MainNav';

import Auth from '../services/auth';
import User from '../services/user';


const AdminRoute = ({component: Component, ...rest})=>{
    const [auth,setAuth] = useState(undefined);
    useEffect(()=>{
        Auth.isAdmin().then(
            (data)=>{
                setAuth(data);
            }
        )
        User.getUserDetails().then(
            (data)=>{
                localStorage.setItem('user',JSON.stringify(data));
            }
        )
    });
    if(auth!=undefined){
        return(
            <Route
                {...rest}
                render={
                    props => {
                        console.log("admin route ====");
                        if (auth) {
                            return (
                                <React.Fragment>
                                    <Navbar/>
                                    <div className="mb-5"></div>
                                    <Component {...props}/>
                                </React.Fragment>
                            )
                        } else {
                            return <Redirect
                                to={
                                    {
                                        pathname: "/",
                                        state: {
                                            from: props.location
                                        }
                                    }
                                }
                            />
                        }
                    }
                }
            />
        );
    }
    return(
        <Fragment>
                <Cube/>
        </Fragment>
    )
   
}

export default AdminRoute;