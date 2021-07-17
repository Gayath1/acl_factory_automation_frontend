import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {
    CDataTable,
} from '@coreui/react'
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const fields = [
        "DT_RowId",
        "color",
        "value",
        "Status"
]

const rows = [
    {
        DT_RowId: "1",
        color: "red",
        value: "#f00"
    },
    {
        DT_RowId: "2",
        color: "green",
        value: "#0f0"
    },
    {
        DT_RowId: "3",
        color: "blue",
        value: "#00f"
    },
    {
        DT_RowId: "4",
        color: "cyan",
        value: "#0ff"
    },
    {
        DT_RowId: "1",
        color: "red",
        value: "#f00"
    },
    {
        DT_RowId: "2",
        color: "green",
        value: "#0f0"
    },
    {
        DT_RowId: "3",
        color: "blue",
        value: "#00f"
    },
    {
        DT_RowId: "4",
        color: "cyan",
        value: "#0ff"
    },
    {
        DT_RowId: "1",
        color: "red",
        value: "#f00"
    },
    {
        DT_RowId: "2",
        color: "green",
        value: "#0f0"
    },
    {
        DT_RowId: "3",
        color: "blue",
        value: "#00f"
    },
    {
        DT_RowId: "4",
        color: "cyan",
        value: "#0ff"
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
        <td>{item.DT_RowId}</td>
        <td>{item.color}</td>
        <td>{item.value}</td>
        <td>
            <button className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const Usercreate = () => {

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = React.useState('Admin')
    const [image,setImage]= ('');
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();


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

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    const handleChange = (event) => {
        setType(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
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
                                    <div className="rowuser">
                                        <label>First Name</label>
                                        <input type="text" autoFocus placeholder="enter your firstname" value={email}  onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Last Name</label>
                                        <input type="text" placeholder="enter your lastname" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Email</label>
                                        <input type="email" id="email" pattern=".+@globex\.com"  placeholder="enter your email" value={email}  onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Epf No</label>
                                        <input type="number" placeholder="enter your epf no" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Mobile</label>
                                        <input type="mobile" placeholder="enter your mobile no" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Permission</label>
                                        <select id="department" name="department">
                                            <option value=""  selected></option>
                                            <option value="SuperAdmin">Super Admin</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>

                                    <div id="button" className="rowuser">
                                        <button  disabled={!validateForm()} onClick={handleSubmit}>Register</button>
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