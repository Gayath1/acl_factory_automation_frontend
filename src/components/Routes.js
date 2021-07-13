import React from 'react'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Dashboard from '../Pages/Dashboard'
import Loginadmin from "../Pages/Loginadmin";
import Home from "../Pages/Home";



const Routes = () => {
    return (

            <Switch>

                    <Route path="/Loginadmin" component={Loginadmin}/>
                    <Route path="/Home" component={Home}/>
                    <Route path="/Dashboard" component={Dashboard} />


            </Switch>





    )
}

export default Routes