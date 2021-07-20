import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";


function createData(name,lks) {
    return { name, lks };
}

const rows = [
    createData('Frozen yoghurt', 159 ),
    createData('Ice cream sandwich', 237),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 356),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


const ProductLine = () => {
    const classes = useStyles();
    const [durations, setdurations] = useState("");
    const [name, setproductlineNo] = useState("");
    const [factoryId,setfactoryId] = useState("");
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({ lists: [] });
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")

    const headers = {
        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{

            const body = {durations,name,factoryId};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/productlines/1/create",body,headers);
            window.location.reload();

        } catch(err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };


    return (
        <>
            <Sidebar/>
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <h2 className="page-header">Product Line</h2>
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
                                        <label>Product Line No</label>
                                        <input type="text" autoFocus placeholder="" value={name}  onChange={(e) => setproductlineNo(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Durations</label>
                                        <input type="text"  placeholder="" value={durations}  onChange={(e) => setdurations(e.target.value)} />
                                    </div>
                                    <div className="rowuser">
                                        <label>Factory Id</label>
                                        <input type="text"  placeholder="" value={factoryId}  onChange={(e) => setfactoryId(e.target.value)} />
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
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="center">Organization Id</TableCell>
                                                
                                                
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">{row.lks}</TableCell>
                                                    {/* <TableCell align="center">{row.fat}</TableCell> */}
                                                    {/* <TableCell align="center">{row.carbs}</TableCell>
                                                    <TableCell align="center">{row.protein}</TableCell> */}
                                                    <TableCell align="center"><button className="usertblbutton"  >Delete</button></TableCell>
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

export default ProductLine