import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


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


const Info = () => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [speed, setSpeed] = useState("");


    // create a preview as a side effect, whenever selected file is changed
    

    // function validateForm() {
    //     return email.length > 0 && password.length > 0;
    // }
    // const handleChange = (event) => {
    //     setType(event.target.value);
    // };
    // const imagehandleChange = (event) => {
    //     setImage(event.target.files[0]);
    // };

    function handleSubmit(event) {
        event.preventDefault();
    }

    // const onSelectFile = e => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setSelectedFile(undefined)
    //         return
    //     }

    //     // I've kept this example simple by using the first image instead of multiple
    //     setSelectedFile(e.target.files[0])
    // }

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
                               
                                <div className="rowuser">
                                <label>Product Name</label>
                                        <input type="text" autoFocus placeholder="" value={name}  onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="rowuser">
                                <label>Product Code</label>
                                        <input type="text" autoFocus placeholder="" value={code}  onChange={(e) => setCode(e.target.value)} />
                                    </div>

                                    <div className="rowuser">
                                <label>Machine Speed</label>
                                        <input type="text" autoFocus placeholder="" value={speed}  onChange={(e) => setSpeed(e.target.value)} />
                                    </div>


                                    <div id="button" className="rowuser">
                                        <button   onClick={handleSubmit}>submit</button>
                                    </div>



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
                                                <TableCell>First name</TableCell>
                                                <TableCell align="center">Email</TableCell>
                                                <TableCell align="center">Epf no</TableCell>
                                                <TableCell align="center">Mobile</TableCell>
                                                <TableCell align="center">Type</TableCell>
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
                                                    <TableCell align="center"><button className="usertblbutton"  onClick={handleSubmit}>Delete</button></TableCell>
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

export default Info