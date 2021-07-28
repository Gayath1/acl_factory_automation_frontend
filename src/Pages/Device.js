import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import moment from "moment";
import {HashLoader} from "react-spinners";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserContext from "../userContext";


const fields = [
    "Device Id",
    "Factory ",
    "Product line Id",
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

const active = async (productlineId,uuid) => {

    try{

        const body = {productlineId,uuid};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/device/1/activate",body,headers);
        window.location.reload();

    } catch(err) {
       console.log(err)
    }

};

const submitdelete = async (id) => {

    try{

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/device/1/delete",body,headers);
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
        <td>{item.id}</td>
        <td>{item.factories.factoryName}</td>
        <td>{item.productlineId}</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button onClick={()=>{submitdelete(item.id)}} className="usertblbutton" >Delete</button>
        </td>
    </tr>
)
const renderOrderBody1 = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.factories.factoryName}</td>
        <td>{item.productlineId}</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button onClick={()=>{active(item.productlineId,item.uuid)}} className="usertblactivebutton" >Activate</button>
        </td>
    </tr>
)

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Device = () => {
    const classes = useStyles();
    const {userData} = useContext(UserContext);
    const [uuid, setUuid] = useState("");
    const [productlineId,setproductlineId] = useState("");
    const [factoryId,setfactoryId] = useState("");
    const [deviceTypeId,setdeviceTypeId] = useState("");
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({ lists: [] });
    const [listData1, setListData1] = useState({ lists: [] });
    const [listData2, setListData2] = useState({ lists: [] });
    const [listData3, setListData3] = useState({ lists: [] });
    const [listData4, setListData4] = useState({ lists: [] });
    let [loading, setLoading] = useState(true);
    const [value, setValue] = React.useState(0);
    const token = localStorage.getItem("Token")


    const headers = {
        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

    const handletab = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/device/1/getall/pending`,headers
            );
            setListData({lists:result.data.data.DeviceDetails})
            const result1 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/device/1/getallinfo`,headers
            );
            setListData1({lists:result1.data.data.DeviceDetails})
            const result2 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/productlines/1/getall`,headers
            );
            setListData2({lists:result2.data.data.ProductLinesDetails})
            const result3 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/factories/1/getall`,headers
            );
            setListData3({lists:result3.data.data.FactoryDetails})
            const result4 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/devicetypes/1/getall`,headers
            );
            setListData4({lists:result4.data.data.deviceTypes})
            setLoading(false);
        };
        fetchData();
    }, [])



    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{

            const body = {uuid,productlineId,factoryId};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/device/1/create",body,headers);
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
                    <h2 className="page-header">Device</h2>
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
                                        <label>MAC Address</label>
                                        <input type="text" autoFocus placeholder="" value={uuid}  onChange={(e) => setUuid(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Device Type</label>
                                        <select id="department" name="department" value={deviceTypeId} onChange={(e) => setdeviceTypeId(e.target.value)} >
                                            <option value=""  selected></option>
                                            {listData4.lists.map((country, key) => (
                                                <option key={key} value={country.id}>
                                                    {country.deviceTypename}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="rowuser">
                                         <label>Product Line</label>
                                         <select id="department" name="department" value={productlineId} onChange={(e) => productlineId(e.target.value)} >
                                            <option value=""  selected></option>
                                            {listData2.lists.map((country, key) => (
                                                <option key={key} value={country.productlineNo}>
                                                    {country.productlineText}
                                                </option>
                                            ))}
                                         </select>
                                    </div>
                                    <div className="rowuser">
                                        <label>Factory</label>
                                        <select id="department" name="department" value={factoryId} onChange={(e) => setfactoryId(e.target.value)} >
                                            <option value=""  selected></option>
                                            {listData3.lists.map((country, key) => (
                                                <option key={key} value={country.id}>
                                                    {country.factoryName}
                                                </option>
                                            ))}
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
                                <div className="card__header">
                                <AppBar position="static" style={{background: `linear-gradient(90deg, #06518C 0%, #62B4FF 97.85%)` ,borderRadius:"8px"}}>
                                    <Tabs TabIndicatorProps={{
                                        style: {
                                            backgroundColor: "#ffffff"
                                        }
                                    }} value={value} onChange={handletab}  >
                                        <Tab label="Active" {...a11yProps(0)} />
                                        <Tab label="Pending" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                            </div>
                            <TabPanel value={value} index={0}>
                                <Table
                                    limit="5"
                                    headData={fields}
                                    renderHead={(item, index) => renderOrderHead(item, index)}
                                    bodyData={listData1.lists}
                                    renderBody={(item, index) => renderOrderBody(item, index)}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Table
                                    limit="5"
                                    headData={fields}
                                    renderHead={(item, index) => renderOrderHead(item, index)}
                                    bodyData={listData.lists}
                                    renderBody={(item, index) => renderOrderBody1(item, index)}
                                />
                            </TabPanel>
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

export default Device