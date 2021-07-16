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


function createData(name, duration,ky) {
    return { name, duration,ky };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


const Settings = () => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
 


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
                    <h2 className="page-header">Settings</h2>
                    <div className="row">
                        <div className="col-6">
                            <div className="card full-height">
                                <div>
                               
                                <div className="rowuser">
                                <label>Name</label>
                                        <input type="text" autoFocus placeholder="" value={name}  onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="rowuser">
                                <label>Duration</label>
                                        <input type="text" autoFocus placeholder="" value={duration}  onChange={(e) => setDuration(e.target.value)} />
                                    </div>

                                   


                                    <div id="button" className="rowuser">
                                        <button   onClick={handleSubmit}>submit</button>
                                    </div>



                                </div>
                            </div>
                        </div>
                        </div>
                    <div className="row">
                        <div className="col-9">
                            <div className="card full-height">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="center">Duration</TableCell>
                                                <TableCell align="center">Keey</TableCell>
                                              
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">{row.duration}</TableCell>
                                                    <TableCell align="center">{row.ky}</TableCell>
                                                  
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

export default Settings