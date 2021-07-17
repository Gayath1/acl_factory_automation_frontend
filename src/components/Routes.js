import React,{useState} from 'react'

import {BrowserRouter, Route, Switch} from 'react-router-dom'

import UserContext from './../userContext';
import Dashboard from '../Pages/Dashboard'
import Loginadmin from "../Pages/Loginadmin";
import Home from "../Pages/Home";
import Loginexecutive from "../Pages/Loginexecutive";
import Loginmanagement from '../Pages/Loginmanagement';
import Usercreate from "../Pages/Usercreate";
import Admin from "../Pages/Admin";
import Department from '../Pages/Department';
import Factory from "../Pages/Factories";
import Device from "../Pages/Device";
import ProductLine from "../Pages/ProductLine";
import Settings from "../Pages/Settings";
import Fault from "../Pages/FaultReason";
import ProductInfo from "../Pages/ProductInfo";

const Routes = () => {
    const [ userData, setUserData] = useState({
        token:"",
        user: "",
        role: "",
    });
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <Switch>

                <Route path="/Loginmanagement" component={Loginmanagement} />
                <Route path="/Loginexecutive" component={Loginexecutive} />
                <Route path="/Loginadmin" component={Loginadmin}/>
                <Route path="/Home" component={Home}/>
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/Usercreate" component={Usercreate} />
                <Route path="/Admin" component={Admin} />
                <Route path="/Department" component={Department} />
                <Route path="/Factory" component={Factory} />
                <Route path="/Device" component={Device} />
                <Route path="/ProductLine" component={ProductLine} />
                <Route path="/Settings" component={Settings} />
                <Route path="/Fault" component={Fault} />
                <Route path="/ProductInfo" component={ProductInfo} />

            </Switch>
        </UserContext.Provider>




    )
}

export default Routes