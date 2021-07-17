import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import {makeStyles} from "@material-ui/core/styles";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import axios from 'axios';
import {Alert, AlertTitle} from "@material-ui/lab";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

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



const Usercreate = () => {

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [mobile,setMobile] = useState("");
    const [epfNo,setEpfNo] = useState("");
    const [permission,setPermission] = useState("")
    const [type, setType] = React.useState('Admin')
    const [image,setImage]= ('');
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [err, setErr] = useState("");
    const [listData, setListData] = useState([] );
    const token = localStorage.getItem("Token")
    const headers = {
        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

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

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/admin/1/getall`,headers
            );
            setListData(result.data.data.organizationUser[0].users)

        };
        fetchData();
    }, [])

    function validateForm() {
        return email.length > 0 ;
    }
    const handleChange = (event) => {
        setType(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{
            const  formData = new FormData()
            formData.append('image',selectedFile)
            formData.append("email", email);
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("mobile", mobile);
            formData.append("epfNo", epfNo);
            formData.append("permission", permission);
            // const body = {email, firstName,lastName,mobile,epfNo,permission};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/admin/1/create",formData
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

    };
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    console.log(listData)
    return (
        <>
            <Sidebar/>
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <h2 className="page-header">Admin</h2>
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
                                        <label>First Name</label>
                                        <input type="text" autoFocus placeholder="enter your firstname" value={firstName}  onChange={(e) => setfirstName(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Last Name</label>
                                        <input type="text" placeholder="enter your lastname" value={lastName} onChange={(e) => setlastName(e.target.value)}/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Email</label>
                                        <input type="email" id="email" pattern=".+@globex\.com"  placeholder="enter your email" value={email}  onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Epf No</label>
                                        <input type="number" placeholder="enter your epf no" value={epfNo} onChange={(e) => setEpfNo(e.target.value)}/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Mobile</label>
                                        <input type="mobile" placeholder="enter your mobile no" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Permission</label>
                                        <select id="department" name="department" value={permission} onChange={(e) => setPermission(e.target.value)}>
                                            <option value=""  selected></option>
                                            <option value="1">Admin</option>
                                            <option value="50">Associate-Admin</option>
                                        </select>
                                    </div>

                                    <div id="button" className="rowuser">
                                        <button  disabled={!validateForm()} onClick={submit}>Register</button>
                                    </div>
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

export default Usercreate