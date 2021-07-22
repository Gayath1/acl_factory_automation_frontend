import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import UserContext from "../userContext";
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
const rows = [
    {
        "id": 1,
        "firstName": "mujeeb",
        "lastName": "singham",
        "email": "chandulagayan@gmail.com",
        "verificationtoken": "1234",
        "epfNo": null,
        "phoneNo": "0776465645",
        "image": null,
        "statusId": 1,
        "password": "$2y$10$zrrjILLqTKyxYiR3jrOdvuaE.tEG3U148gVPoe7zYQLpitytXpyU2 ",
        "createdAt": "2021-07-16T10:38:11.002Z",
        "updatedAt": "2021-07-16T10:38:11.002Z",
    },
    {
        "id": 9,
        "firstName": "Gayath",
        "lastName": "Chandula",
        "email": "chandulagayan1@gmail.com",
        "verificationtoken": "g96wx6",
        "epfNo": "47586598",
        "phoneNo": null,
        "image": "uploads/dashboard.JPG-1626512057383.jpeg",
        "statusId": 50,
        "password": "$2b$10$vqy4Pln0C.V88NOCdpOOFOKZYHbVGWv.yV/7XLn7cpYxLQnV2PzPi",
    }
];


const ProductCalendar = () => {

    const {userData} = useContext(UserContext);
    const localizer = momentLocalizer(moment);
    const [listData, setListData] = useState({ lists: [] });

    const events= rows.map((appointment)=>{
        return {
            id: appointment.id,
            title: appointment.firstName,
            start: new Date(appointment.createdAt),
            end: new Date(appointment.updatedAt),
            allDay: true
        }
    })
    return (
        <>
            {userData.role === 70? (
                <>
                  <Sidebar/>
                    <div id="main" className="layout__content">
                        <TopNav/>
                            <div className="layout__content-main">
                                <h2 className="page-header">Product Calendar</h2>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card full-height">
                                            <Calendar
                                                localizer={localizer}
                                                events={events}
                                                startAccessor='start'
                                                endAccessor='end'
                                                views={['month', 'day', 'week']}
                                                style={{height: 500}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </>
            ):null}
        </>
    )
}

export default ProductCalendar