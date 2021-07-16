import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/styles";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

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
                                        <input type="text" autoFocus placeholder="Enter your FirstName" value={email}  onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Last Name</label>
                                        <input type="text" placeholder="Enter your LastName" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Email</label>
                                        <input type="email" id="email" pattern=".+@globex\.com"  placeholder="Enter your Email" value={email}  onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Epf No</label>
                                        <input type="number" placeholder="Enter your Epf No" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div className="rowuser">
                                        <label>Mobile</label>
                                        <input type="mobile" placeholder="Enter your mobile No" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Firstname</TableCell>
                                                <TableCell align="center">Admin type</TableCell>
                                                <TableCell align="center">Email</TableCell>
                                                <TableCell align="center">Epf no</TableCell>
                                                <TableCell align="center">Mobile</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">{row.calories}</TableCell>
                                                    <TableCell align="center">{row.fat}</TableCell>
                                                    <TableCell align="center">{row.carbs}</TableCell>
                                                    <TableCell align="center">{row.protein}</TableCell>
                                                    <TableCell align="center"><button className="usertblbutton"  disabled={!validateForm()} onClick={handleSubmit}>Delete</button></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usercreate