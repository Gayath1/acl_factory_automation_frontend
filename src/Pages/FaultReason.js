import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import { makeStyles } from '@material-ui/core/styles';
import {HashLoader} from "react-spinners";
import {Alert, AlertTitle} from "@material-ui/lab";
import axios from "axios";
import moment from "moment";


const fields = [
    "Department Name",
    "Created At",
    "Action"
]



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
        <td>{item.departmentName}</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button className="usertblbutton" >Delete</button>
        </td>
    </tr>
)


const Fault = () => {
    const classes = useStyles();
    const [faultreason, setfaultreason] = useState("");
    const [faultType, setfaultType] = useState("");
    const [departmentId, setdepartmentId] = useState("");
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({ lists: [] });
    const [listData1, setListData1] = useState({ lists: [] });
    let [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")

    const headers = {
        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/department/1/getall`,headers
            );
            setListData({lists:result.data.data.DepartmentDetails})
            const result1 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/faultreason/1/getall`,headers
            );
            setListData1({lists:result1.data.data.DepartmentDetails})
            setLoading(false);
        };

        fetchData();
    }, [])

    function validateForm() {
        return faultreason.length > 0 && faultType.length > 0 && departmentId.length > 0;
    }

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{

            const body = {faultreason,faultType,departmentId};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/faultreason/1/create",body,headers);
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
            <Sidebar/>
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <h2 className="page-header">Fault Manage</h2>
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
                                        <label>Reason</label>
                                        <input type="text" autoFocus placeholder="" value={faultreason}  onChange={(e) => setfaultreason(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Fault Type</label>
                                        <input type="text"  placeholder="" value={faultType}  onChange={(e) => setfaultType(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Department</label>
                                        <select id="department" name="department" value={departmentId} onChange={(e) => setdepartmentId(e.target.value)} >
                                            <option value=""  selected>please select Department</option>
                                            {listData.lists.map((country, key) => (
                                                <option key={key} value={country.id}>
                                                    {country.departmentName}
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
                            {/* <Grid item xs={6}>
                            <div className="card full-height">

                            </div>
                            </Grid> */}
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
    )
}

export default Fault