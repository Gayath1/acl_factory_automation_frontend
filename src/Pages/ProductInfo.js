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
import UserContext from "../userContext";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import {Checkbox, FormGroup} from "@material-ui/core";


const fields = [
    "Product Name",
    "Product Code",
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
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button onClick={()=>{submitdelete(item.id)}} className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const Info = () => {
    const classes = useStyles();
    const {userData} = useContext(UserContext);
    const [productName, setproductName] = useState("");
    // const [productId, setproductId] = useState("");
    const [factoryId, setfactoryId] = useState("");
    const [productCode, setproductCode] = useState("");
    const [machineSpeed, setmachineSpeed] = useState("");
    const [downTime, setdownTime] = useState("");
    const [productLineId, setproductLineId] = React.useState('');
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({ lists: [] });
    const [listData1, setListData1] = useState({ lists: [] });
    const [Pline, setPline] = useState( [] );
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")
    const [data,setdata] = useState([{
        id:"",
        speed:"",
    }]);

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
            const result1 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/productlines/1/getall`,headers
            );
            setListData1({lists:result1.data.data.ProductLinesDetails})
            setLoading(false);
        };
        fetchData();
    }, [])

    function removeDuplicates(arr) {
        const map = new Map();
        arr.forEach(v => map.set(v.id, v)) // having `departmentName` is always unique
        return [...map.values()];
    }

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{
            const returnPline = removeDuplicates(Pline);
            const body = {productName,productCode,machineSpeed,downTime,factoryId,productLineId};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/productinfo/1/create",body,headers);
            // setproductId(loginResponse.data.id);
            const productId = loginResponse.data.data.id;
            const body1=({productId,productLineId,returnPline,machineSpeed})
            setproductName('');
            setmachineSpeed('');
            const loginResponse1 = await axios.post("https://acl-automation.herokuapp.com/api/v1/productlinemachinespeedcontroller/1/create",body1,headers);
            //window.location.reload();

        } catch(err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };

    const onSelect1Change=(e) =>{
        setdata({
            ...data,
            speed: e.target.value
        })


    }
    const onSelect2Change=(id, e)=> {
        setPline([...Pline, { id: id , speed: e.target.value}]);
    }


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
                            <div className="col-6">
                                <div className="card full-height">

                                        <div className="rowuser">
                                        {listData1.lists.map((country, index) => (
                                          <>
                                              <label>Product line&nbsp;{country.productlineNo}&nbsp; Speed</label>
                                                {/*<select id="department" name="department" value={Pline.id} onChange={onSelect1Change} >*/}
                                                {/*    <option value=""  selected>please select Product line</option>*/}
                                                {/*    <option key={index} value={country.id}>*/}
                                                {/*        {country.productlineNo}*/}
                                                {/*    </option>*/}
                                                {/*</select>*/}


                                                {/*<label>Product line{country.productlineNo}</label>*/}
                                                <input type="number"  placeholder=""  onChange={(e) => onSelect2Change(country.id, e)} value={Pline.speed}/>
                                                <br/>
                                              <br/>
                                            </>
                                        ))}
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

export default Info