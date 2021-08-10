import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import { makeStyles } from '@material-ui/core/styles';
import {HashLoader} from "react-spinners";
import {Alert, AlertTitle} from "@material-ui/lab";
import axios from "axios";
import moment from "moment";
import UserContext from "../userContext";


const fields = [
    "Name",
    "Duration",
    "Created At",
    "Action"
]
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
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/systemsettings/1/delete",body,headers);
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
        <td>{item.durations}</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button onClick={()=>{submitdelete(item.id)}} className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const Settings = () => {
    const classes = useStyles();
    const {userData} = useContext(UserContext);
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({ lists: [] });
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
                `https://acl-automation.herokuapp.com/api/v1/systemsettings/1/getall`,headers
            );
            setListData({lists:result.data.data.SystemSettingsDetails})
            setLoading(false);
        };
        fetchData();
    }, [])

    function validateForm() {
        return name.length > 0;
    }


    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{

            const body = {name,duration};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/systemsettings/1/create",body,headers);
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
                    <h2 className="page-header">Settings</h2>
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
                                        <label>Name</label>
                                        <input type="text" autoFocus placeholder="" value={name}  onChange={(e) => setName(e.target.value)} required/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Duration</label>
                                        <input type="text"  placeholder="" value={duration}  onChange={(e) => setDuration(e.target.value)} required/>
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
            ):null}
            </>
    )
}

export default Settings