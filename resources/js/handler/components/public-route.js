import React,{useState, useEffect,Fragment} from 'react';
import {Route,Redirect} from 'react-router-dom';
import Auth from '../services/auth';
import { Cube } from 'react-preloaders';

const PublicRoute = ({component: Component, ...rest})=>{

    const [authAdmin,setAuthAdmin] = useState(undefined);
    const [authAgent,setAuthAgent] = useState(undefined);

    useEffect(()=>{
        Auth.isAdmin().then(
            (data)=>{
                setAuthAdmin(data);
            }
        )
        Auth.isAgent().then(
            (data)=>{
                setAuthAgent(data);
            }
        )
    });

    if(authAdmin!=undefined && authAgent!=undefined){
        return(
            <Route
                {...rest}
                render={
                    props => {
                        console.log("public route ----");
                        if (authAdmin) {
                            return <Redirect
                                to={
                                    {
                                        pathname: "/dashboard/admin",
                                        state: {
                                            from: props.location
                                        }
                                    }
                                }
                            />
                        } 
                        else if (authAgent) {
                            return <Redirect
                                to={
                                    {
                                        pathname: "/dashboard/agent",
                                        state: {
                                            from: props.location
                                        }
                                    }
                                }
                            />
                        } else {
                            return <Component {...props}/>
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

export default PublicRoute;