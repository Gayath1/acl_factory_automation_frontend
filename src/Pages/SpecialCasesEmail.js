import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import {HashLoader} from "react-spinners";
import moment from 'moment';
import UserContext from "../userContext";
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
    },
    {
        field: 'permissionId',
        headerName: 'Permission Id',
        width: 180,
    },
];

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

        "Authorization":`Bearer ${token}`
    }
};


const submitdelete = async (id) => {

    try{

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/specialcasescontroller/1/delete",body,headers);
        window.location.reload();

    } catch(err) {
        console.log(err)
    }

};

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)
const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.name}</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button onClick={()=>{submitdelete(item.id)}} className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const SpecialCaseEmail = () => {
    const classes = useStyles();
    const {userData} = useContext(UserContext);
    const [specialcaseId, setspecialcaseId] = useState("");
    const [err, setErr] = useState("");
    const [emailreceipents, setemailreceipents] = useState([]);
    const [listData, setListData] = useState({ lists: [] });
    const [listData1, setListData1] = useState({ lists: [] });
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")

    const headers = {
        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/specialcasescontroller/1/getall`,headers
            );
            setListData({lists:result.data.data.specialCase})
            const result1 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/Executives/1/getall`,headers
            );
            setListData1({lists:result1.data.data.executives})
            setLoading(false);
        };
        fetchData();
    }, [])

    function validateForm() {
        return specialcaseId.length > 0;
    }

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{

            const body = {specialcaseId,emailreceipents};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/specialcaseemaillreceipentcontroller/1/create",body,headers);
            window.location.reload();

        } catch(err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };

    if (loading) {
        return (
            <div style={{ padding: "10px 20px", textAlign: "center", justifyContent:"center", display:"flex", alignItems:"center", width:"100%", height:"100vh", backgroundColor:"#FFFFFF"}}>
                <HashLoader  loading={loading}  size={150} />
            </div>
        )
    }
    return (
        <>
            {userData.role === 1 || userData.role === 50? (
                <>
                    <Sidebar/>
                    <div id="main" className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <h2 className="page-header">Fault Cases</h2>
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
                                                <label>Special Name</label>
                                                <select id="department" name="department" value={specialcaseId} onChange={(e) => setspecialcaseId(e.target.value)} >
                                                    <option value=""  selected>please select Special case</option>
                                                    {listData.lists.map((country, key) => (
                                                        <option key={key} value={country.id}>
                                                            {country.name}
                                                        </option>
                                                    ))}
                                                </select>
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
                                        <div style={{ height: 400, width: '100%' }}>
                                            <DataGrid
                                                rows={listData1.lists}
                                                columns={columns}
                                                pageSize={5}
                                                checkboxSelection
                                                disableSelectionOnClick
                                                onSelectionModelChange={(e) => {
                                                    const selectedIDs = new Set(e.selectionModel);
                                                    const selectedRowData = listData1.lists.filter((row) =>
                                                        selectedIDs.has(row.id)
                                                    );
                                                    setemailreceipents(selectedRowData)
                                                    console.log("selected rowData:", selectedRowData);
                                                }}
                                                // selectionModel={selectionModel}
                                            />
                                        </div>
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

export default SpecialCaseEmail