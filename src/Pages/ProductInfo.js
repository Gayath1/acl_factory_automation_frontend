import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import moment from "moment";
import {HashLoader} from "react-spinners";


const fields = [
    "Product Name",
    "Product Code",
    "Machine Speed",
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

        "Authorization":`Bearer ${token}`
    }
};


const submitdelete = async (id) => {

    try{

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/productinfo/1/delete",body,headers);
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
        <td>{item.productName}</td>
        <td>{item.productCode}</td>
        <td>{item.machineSpeed}&nbsp;RPM</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button onClick={()=>{submitdelete(item.id)}} className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const Info = () => {
    const classes = useStyles();
    const [productName, setproductName] = useState("");
    const [productCode, setproductCode] = useState("");
    const [machineSpeed, setmachineSpeed] = useState("");
    const [downTime, setdownTime] = useState("");
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
                `https://acl-automation.herokuapp.com/api/v1/productinfo/1/getall`,headers
            );
            setListData({lists:result.data.data.ProductDetails})
            setLoading(false);
        };
        fetchData();
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{

            const body = {productName,productCode,machineSpeed,downTime};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/productinfo/1/create",body,headers);
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
                    <h2 className="page-header">Product Information</h2>
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
                                        <label>Product Name</label>
                                        <input type="text" autoFocus placeholder="" value={productName}  onChange={(e) => setproductName(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Product Code</label>
                                        <input type="text"  placeholder="" value={productCode}  onChange={(e) => setproductCode(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Machine Speed</label>
                                        <input type="number"  placeholder="" value={machineSpeed}  onChange={(e) => setmachineSpeed(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Down Time</label>
                                        <select id="department" name="department" value={downTime} onChange={(e) => setdownTime(e.target.value)} >
                                            <option value=""  selected>please select DownTime</option>
                                            <option value="5">05 Min</option>
                                            <option value="10">10 Min</option>
                                            <option value="15">15 Min</option>
                                            <option value="20">20 Min</option>
                                            <option value="25">25 Min</option>
                                            <option value="30">30 Min</option>
                                        </select>
                                    </div>

                                    <div id="button" className="rowuser">
                                        <button   onClick={submit}>submit</button>
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

export default Info