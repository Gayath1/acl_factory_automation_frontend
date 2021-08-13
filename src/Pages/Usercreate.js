import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from "../components/table/Table";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import {HashLoader} from "react-spinners";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import avatar from "../assets/default.png";
import UserContext from "../userContext";

const fields = [
    "firstName",
    "lastName",
    "email",
    "epfNo",
    "Action"
]


const fields1 = [
    "firstName",
    "lastName",
    "epfNo",
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
const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)
const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.epfNo}</td>
        <td>
            <button className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const token = localStorage.getItem("Token")

const headers = {
    headers: {

        "Authorization":`Bearer ${token}`
    }
};

const deletedata = async (id) => {

    try{

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/operator/1/delete",body,headers);
        window.location.reload();

    } catch(err) {
       console.log(err);
    }

};

const deletedata1 = async (id) => {

    try{

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/Management/1/delete",body,headers);
        window.location.reload();

    } catch(err) {
        console.log(err);
    }

};

const deletedata2 = async (id) => {

    try{

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/Executives/1/delete",body,headers);
        window.location.reload();

    } catch(err) {
        console.log(err);
    }

};

const renderOrderBody1 = (item, index) => (
    <tr key={index}>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.epfNo}</td>
        <td>
            <button onClick={()=>{deletedata(item.id)}} className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const renderOrderBody2 = (item, index) => (
    <tr key={index}>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.epfNo}</td>
        <td>
            <button onClick={()=>{deletedata1(item.id)}} className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const renderOrderBody3 = (item, index) => (
    <tr key={index}>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.epfNo}</td>
        <td>
            <button onClick={()=>{deletedata2(item.id)}} className="usertblbutton" >Delete</button>
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
const Usercreate = () => {

    const classes = useStyles();
    const {userData} = useContext(UserContext);
    const [firstName,setfirstName] = useState("");
    const [lastName,setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setmobile] = useState("");
    const [epfNo,setepfNo] = useState("");
    const [shiftId,setshiftId] = useState("");
    const [departmentId,setdepartmentId] = useState("");
    const [type, setType] = React.useState('Management');
    const [permissionId,setpermissionId] = useState("");
    const [image,setImage]= ('');
    const [err, setErr] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [listData, setListData] = useState({ lists: [] });
    const [listData1, setListData1] = useState({ lists: [] });
    const [listData2, setListData2] = useState({ lists: [] });
    const [listData3, setListData3] = useState({ lists: [] });
    const [listData4, setListData4] = useState({ lists: [] });
    const [value, setValue] = React.useState(0);
    let [loading, setLoading] = useState(true);
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
                `https://acl-automation.herokuapp.com/api/v1/Management/1/getall`,headers
            );
            setListData({lists:result.data.data.management})
            const result1 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/Executives/1/getall`,headers
            );
            setListData1({lists:result1.data.data.executives})
            const result2 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/operator/1/getall`,headers
            );
            setListData2({lists:result2.data.data.OperatorsDetails})
            const result3 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/department/1/getall`,headers
            );
            setListData3({lists:result3.data.data.DepartmentDetails})
            const result4 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/shiftcontrollers/1/getall`,headers
            );
            setListData4({lists:result4.data.data.ShiftDetails})
            setLoading(false);
        };

        fetchData();
    }, [])

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    function validateForm1() {
        return epfNo.length > 0 && selectedFile.length !== null;;
    }

    function validateForm() {
        return email.length > 0 && selectedFile.length !== null;;
    }
    const handleChange = (event) => {
        setType(event.target.value);
    };

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }


    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        if(type === 'Operator'){
            try{
                const  formData = new FormData()

                formData.append('image',selectedFile)
                formData.append("email", email);
                formData.append("firstName", firstName);
                formData.append("lastName", lastName);
                formData.append("mobile", mobile);
                formData.append("epfNo", epfNo);
                formData.append("shiftId", shiftId);
                formData.append("departmentId", departmentId);
                // const body = {email, firstName,lastName,mobile,epfNo,permission};

                const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/operator/1/create",formData
                    ,{
                        //body: formData,
                        headers:{
                            'Accept': 'multipart/form-data',
                            "Authorization":`Bearer ${token}`
                        },
                        //credentials: 'include',
                    });

                window.location.reload();

            } catch(err) {
                err.response.data.message && setErr(err.response.data.message)
            }
        }else if(type === 'Executive'){
            try{
                const  formData = new FormData()

                formData.append('image',selectedFile)
                formData.append("email", email);
                formData.append("firstName", firstName);
                formData.append("lastName", lastName);
                formData.append("mobile", mobile);
                formData.append("epfNo", epfNo);
                formData.append("shiftId", shiftId);
                formData.append("departmentId", departmentId);
                formData.append("permissionId", permissionId);
                // const body = {email, firstName,lastName,mobile,epfNo,permission};

                const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/Executives/1/create",formData
                    ,{
                        //body: formData,
                        headers:{
                            'Accept': 'multipart/form-data',
                            "Authorization":`Bearer ${token}`
                        },
                        //credentials: 'include',
                    });

                window.location.reload();

            } catch(err) {
                err.response.data.message && setErr(err.response.data.message)
            }
        }else if(type === 'Management'){
            try{
                const  formData = new FormData()

                formData.append('image',selectedFile)
                formData.append("email", email);
                formData.append("firstName", firstName);
                formData.append("lastName", lastName);
                formData.append("mobile", mobile);
                formData.append("epfNo", epfNo);
                formData.append("shiftId", shiftId);
                formData.append("departmentId", departmentId);
                // const body = {email, firstName,lastName,mobile,epfNo,permission};

                const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/Management/1/create",formData
                    ,{
                        //body: formData,
                        headers:{
                            'Accept': 'multipart/form-data',
                            "Authorization":`Bearer ${token}`
                        },
                        //credentials: 'include',
                    });

                window.location.reload();

            } catch(err) {
                err.response.data.message && setErr(err.response.data.message)
            }
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
                    <h2 className="page-header">Users</h2>
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
                                <div className="rowuserradio">
                                <RadioGroup  aria-label="type" name="type" value={type} onChange={handleChange} row>
                                    <FormControlLabel value="Management" control={<Radio color="primary" />} label="Management" />
                                    <FormControlLabel value="Executive" control={<Radio color="primary" />} label="Executive" />
                                    <FormControlLabel value="Operator" control={<Radio color="primary" />} label="Operator" />
                                </RadioGroup>
                                </div>
                                <div className="rowuser">
                                    <label>First Name</label>
                                    <input type="text" autoFocus placeholder="enter your firstname" value={firstName}  onChange={(e) => setfirstName(e.target.value)} />
                                </div>
                                <div className="rowuser">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="enter your lastname" value={lastName} onChange={(e) => setlastName(e.target.value)}/>
                                </div>
                                {type === 'Operator' ?
                                    null
                                    :
                                    <div className="rowuser">
                                        <label>Email</label>
                                        <input type="email" id="email" pattern=".+@globex\.com"  placeholder="enter your email" value={email}  onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                }
                                <div className="rowuser">
                                    <label>Epf No</label>
                                    <input type="number" min="0" placeholder="enter your epf no" value={epfNo} onChange={(e) => setepfNo(e.target.value)}/>
                                </div>
                                <div className="rowuser">
                                    <label>Mobile</label>
                                    <input type="mobile" placeholder="enter your mobile no" value={mobile} onChange={(e) => setmobile(e.target.value)}/>
                                </div>
                                {type === 'Operator' ?
                                    <div className="rowuser">
                                        <label>Shift</label>
                                        <select id="department" name="department" value={shiftId} onChange={(e) => setshiftId(e.target.value)} >
                                            <option value=""  selected>please select Shift</option>
                                            {listData4.lists.map((country, key) => (
                                                <option key={key} value={country.id}>
                                                    {country.shiftName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    :
                                    null
                                }
                                {type === 'Executive' ?
                                    <div className="rowuser">
                                        <label>Shift</label>
                                        <select id="department" name="department" value={shiftId} onChange={(e) => setshiftId(e.target.value)} >
                                            <option value=""  selected>please select Shift</option>
                                            {listData4.lists.map((country, key) => (
                                                <option key={key} value={country.id}>
                                                    {country.shiftName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    :
                                    null
                                }
                                {type === 'Executive' ?
                                    <div className="rowuser">
                                        <label>Department</label>
                                        <select id="department" name="department" value={departmentId} onChange={(e) => setdepartmentId(e.target.value)} >
                                            <option value=""  selected>please select Department</option>
                                            {listData3.lists.map((country, key) => (
                                                <option key={key} value={country.id}>
                                                    {country.departmentName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    :
                                    null
                                }
                                {type === 'Executive' ?
                                    <div className="rowuser">
                                        <label>Permission</label>
                                        <select id="department" name="department" value={permissionId} onChange={(e) => setpermissionId(e.target.value)} >
                                            <option value=""  selected>please select permission</option>
                                            <option value="70"  selected>Production Executive</option>
                                            <option value="71">Electrical Executive</option>
                                            <option value="72">Mechanical-Executive</option>
                                        </select>
                                    </div>
                                    :
                                    null
                                }
                                {type === 'Operator' ?
                                    <div id="button" className="rowuser">
                                        <button disabled={!validateForm1()} onClick={submit}>Register</button>
                                    </div>
                                    :
                                    <div id="button" className="rowuser">
                                        <button  disabled={!validateForm()} onClick={submit}>Register</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card full-height">
                            <div>
                                <div className="rowuser">
                                    <label>User Image</label>
                                    <input type='file' onChange={onSelectFile} placeholder="select your Image" />
                                </div>
                               {/*<div className="rowuser">*/}
                                    <div >
                                        {selectedFile &&  <img className="form-imguser"  src={preview} /> }
                                    </div>
                                {/*</div>*/}
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
                                            <Tab label="Managers" {...a11yProps(0)} />
                                            <Tab label="Executives" {...a11yProps(1)} />
                                            <Tab label="Operators" {...a11yProps(2)} />
                                        </Tabs>
                                    </AppBar>
                                </div>
                                <TabPanel value={value} index={0}>
                                    <Table
                                        limit="5"
                                        headData={fields}
                                        renderHead={(item, index) => renderOrderHead(item, index)}
                                        bodyData={listData.lists}
                                        renderBody={(item, index) => renderOrderBody2(item, index)}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Table
                                        limit="5"
                                        headData={fields}
                                        renderHead={(item, index) => renderOrderHead(item, index)}
                                        bodyData={listData1.lists}
                                        renderBody={(item, index) => renderOrderBody3(item, index)}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Table
                                        limit="5"
                                        headData={fields1}
                                        renderHead={(item, index) => renderOrderHead(item, index)}
                                        bodyData={listData2.lists}
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

export default Usercreate