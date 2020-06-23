import React from 'react';
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <span>
             <NavLink to="/SignIn">Sign in{"    "} </NavLink>
            </span>
            <span>
             <NavLink to="/SignUp">Sign up</NavLink>
            </span>
        </div>
    );
};

export default Navigation;