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
import {Alert, AlertTitle} from "@material-ui/lab";
import axios from "axios";


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


const Factory = () => {
    const classes = useStyles();
    const [factoryName, setfactoryName] = useState("");
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({ lists: [] });
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")

    const headers = {
        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

    function validateForm() {
        return factoryName.length > 0 ;
    }

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{

            const body = {factoryName};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/factories/1/create",body,headers);
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
                    <h2 className="page-header">Factories</h2>
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
                                <label>Name</label>
                                        <input type="text" autoFocus placeholder="" value={factoryName}  onChange={(e) => setfactoryName(e.target.value)} />
                                    </div>

                                    <div id="button" className="rowuser">
                                        <button  disabled={!validateForm()}   onClick={submit}>submit</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                        </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card full-height">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Factory