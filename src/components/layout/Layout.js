import React, {useState} from 'react'

import './layout.css'

import Routes from "../Routes";
import {BrowserRouter, Route} from 'react-router-dom'

const Layout = () => {


        return (

            <BrowserRouter>

                <Routes/>

            </BrowserRouter>

        )

}

export default Layout