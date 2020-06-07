import React,{useState, Fragment} from 'react';
import {Route,Redirect} from 'react-router-dom';
import Auth from '../services/auth';
import { Cube } from 'react-preloaders';

const AgentRoute = ({component: Component, ...rest})=>{
    const [auth,setAuth] = useState(undefined);
    (()=>{
        Auth.isAgent().then(
            (data)=>{
                setAuth(data);
            }
        )
    })()
    if(auth!=undefined){
        return(
            <Route
                {...rest}
                render={
                    props => {
                        //console.log("agent route ++++");
                        if (auth) {
                            return (
                                <React.Fragment>
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

export default AgentRoute;