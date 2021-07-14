import React from 'react'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Dashboard from '../Pages/Dashboard'
import Loginadmin from "../Pages/Loginadmin";
import Home from "../Pages/Home";
import Loginexecutive from "../Pages/Loginexecutive";
import Loginoperator from '../Pages/Loginoperator';
import Usercreate from "../Pages/Usercreate";


const Routes = () => {
    return (

            <Switch>

                <Route path="/Loginoperator" component={Loginoperator} />
                <Route path="/Loginexecutive" component={Loginexecutive} />
                <Route path="/Loginadmin" component={Loginadmin}/>
                <Route path="/Home" component={Home}/>
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/Usercreate" component={Usercreate} />
            </Switch>





    )
}

export default Routes