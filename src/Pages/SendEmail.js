import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import {HashLoader} from "react-spinners";
import Email from '../assets/email.gif';
import {useHistory} from "react-router-dom";



const SendEmail = () => {

    const [email, setEmail] = useState("");
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const submit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setErr("");
        setSuccess("");
        try{

            const body = {email};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/admin/1/forgotpasswordverify/email",body);
            setSuccess(loginResponse.data)
            setLoading(false)
        } catch(err) {
            setLoading(false)
            err.response.data.message && setErr(err.response.data.message)
        }

    };

    const Home = async (e) => {
       history.push('/Home')

    };

    if (loading) {
        return (
            <div style={{ padding: "10px 20px", textAlign: "center", justifyContent:"center", display:"flex", alignItems:"center", width:"100%", height:"100vh", backgroundColor:"#FFFFFF"}}>
                <img src={Email} alt="loading..." />
            </div>
        )
    }

    return (
        <div id="loginform">
            <h2 id="headerTitle">Forgot Password</h2>
            <div>
                {err ? (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {err}
                    </Alert>
                ) : null}
                {success ? (
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {success}
                    </Alert>
                ) : null}
                <div className="rowlogin">
                    <label>Email</label>
                    <input type="email" id="email"  placeholder="Enter your email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div id="button" className="rowuser">
                    <button  onClick={submit}>Verify</button>
                </div>
                <div id="button" className="rowuser">
                    <button  onClick={Home}>Home</button>
                </div>
            </div>
            <div id="alternativeLogin">


            </div>
        </div>
    )
}

export default SendEmail