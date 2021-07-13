import React, {useEffect} from 'react'

import {Link, Route} from 'react-router-dom'
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";



const statusCards = [
    {
        "icon": "bx bx-shopping-bag",
        "count": "1,995",
        "title": "Total sales"
    },
    {
        "icon": "bx bx-cart",
        "count": "2,001",
        "title": "Daily visits"
    },
    {
        "icon": "bx bx-dollar-circle",
        "count": "$2,632",
        "title": "Total income"
    },
    {
        "icon": "bx bx-receipt",
        "count": "1,711",
        "title": "Total orders"
    }
]



const Dashboard = () => {



    return (
        <>
            <Sidebar/>
            <div className="layout__content">
                <TopNav/>
                <div className="layout__content-main">


        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className="col-6" key={index}>

                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="col-6">
                    <div className="card full-height">
                        {/* chart */}

                    </div>
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card__header">
                            <h3>top customers</h3>
                        </div>
                        <div className="card__body">

                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card__header">
                            <h3>latest orders</h3>
                        </div>
                        <div className="card__body">

                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</div>
</>
    )
}

export default Dashboard