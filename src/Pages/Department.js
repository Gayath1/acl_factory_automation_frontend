import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";



const fields = [
    "firstName",
    "email",
    "epfNo",
    "Status"
]

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


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)
const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.firstName}</td>
        <td>{item.email}</td>
        <td>{item.epfNo}</td>
        <td>
            <button className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const Department = () => {
    const classes = useStyles();
    const [departmentName, setdepartmentName] = useState("");
    const [err, setErr] = useState("");
    const token = localStorage.getItem("Token")

    const headers = {
        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

    function validateForm() {
        return departmentName.length > 0;
    }

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{

            const body = {departmentName};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/department/1/create",body,headers);
            window.location.reload();

        } catch(err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };

    return (
        <>
            <Sidebar/>
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <h2 className="page-header">Department</h2>
                    <div className="row">
                        <div className="col-6">
                            <div className="card full-height">
                                <div>
                                    {err ? (
                                        <Alert severity="error">
                                            <AlertTitle>Error</AlertTitle>
                                            {err}
                                        </Alert>
                                    ) : null}
                                    <div className="rowuser">
                                        <label>Department Name</label>
                                        <input type="text" autoFocus placeholder="department name" value={departmentName} onChange={(e) => setdepartmentName(e.target.value)} />
                                    </div>
                                    <div id="button" className="rowuser">
                                        <button disabled={!validateForm()}  onClick={submit}>submit</button>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card full-height">
                                    <Table
                                        limit="5"
                                        headData={fields}
                                        renderHead={(item, index) => renderOrderHead(item, index)}
                                        bodyData={rows}
                                        renderBody={(item, index) => renderOrderBody(item, index)}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Department