import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import {HashLoader} from "react-spinners";
import moment from 'moment';
import UserContext from "../userContext";


const fields = [
    "Department Name",
    "Created At",
    "Action"
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

const token = localStorage.getItem("Token")

const headers = {
    headers: {

        "Authorization": `Bearer ${token}`
    }
};


const submitdelete = async (id) => {

    try {

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/department/1/delete", body, headers);
        window.location.reload();

    } catch (err) {
        console.log(err)
    }

};

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)
const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.departmentName}</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button onClick={() => {
                submitdelete(item.id)
            }} className="usertblbutton">Delete
            </button>
        </td>
    </tr>
)

const Department = () => {
    const classes = useStyles();
    const {userData} = useContext(UserContext);
    const [departmentName, setdepartmentName] = useState("");
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({lists: []});
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")

    const headers = {
        headers: {

            "Authorization": `Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/department/1/getall`, headers
            );
            setListData({lists: result.data.data.DepartmentDetails})
            setLoading(false);
        };
        fetchData();
    }, [])

    function validateForm() {
        return departmentName.length > 0;
    }

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {

            const body = {departmentName};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/department/1/create", body, headers);
            window.location.reload();

        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };

    if (loading) {
        return (
            <div style={{
                padding: "10px 20px",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                backgroundColor: "#FFFFFF"
            }}>
                <HashLoader loading={loading} size={150}/>
            </div>
        )
    }
    return (
        <>
            {userData.role === 1 || userData.role === 50 ? (
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
                                            <form onSubmit={submit}>
                                                {err ? (
                                                    <Alert severity="error">
                                                        <AlertTitle>Error</AlertTitle>
                                                        {err}
                                                    </Alert>
                                                ) : null}
                                                <div className="rowuser">
                                                    <label>Department Name</label>
                                                    <input type="text" autoFocus placeholder="department name"
                                                           value={departmentName}
                                                           onChange={(e) => setdepartmentName(e.target.value)}
                                                           required/>
                                                </div>
                                                <div id="button" className="rowuser">
                                                    <button type="submit">submit</button>
                                                </div>

                                            </form>

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
                                            bodyData={listData.lists}
                                            renderBody={(item, index) => renderOrderBody(item, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}

export default Department