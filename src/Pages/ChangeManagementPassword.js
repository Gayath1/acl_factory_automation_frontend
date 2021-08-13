import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import {HashLoader} from "react-spinners";
import Email from '../assets/email.gif';
import {useHistory, useLocation} from "react-router-dom";



const ChangePasswordAdmin = (props) => {

    const [password, setpassword] = useState("");
    const [passwordConfirm, setpasswordConfirm] = useState("");
    const [err, setErr] = useState("");
    const [confirmationCode, setconfirmationCode] = useState('');
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const confirmationCode = location.state;
        setconfirmationCode(confirmationCode)
        setLoading(false);
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setErr("");
        setSuccess("");
        try{

            const body = {passwordConfirm,password,confirmationCode};
            const loginResponse = await axios.post(`https://acl-automation.herokuapp.com/api/v1/Management/1/changepasswordfirst`,body);
            setLoading(false)
            history.push('/Loginmanagement')
        } catch(err) {
            setLoading(false)
            err.response.data.message && setErr(err.response.data.message)
        }

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
            <h2 id="headerTitle">Change Password</h2>
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
                    <label>New password</label>
                    <input type="password"  placeholder="Enter your password" value={password}  onChange={(e) => setpassword(e.target.value)} />
                </div>
                <div className="rowlogin">
                    <label>Confirm new password</label>
                    <input type="password"   placeholder="Confirm your password" value={passwordConfirm}  onChange={(e) => setpasswordConfirm(e.target.value)} />
                </div>
                <div id="button" className="rowuser">
                    <button  onClick={submit}>Change Password</button>
                </div>
            </div>
            <div id="alternativeLogin">


            </div>
        </div>
    )
}

export default ChangePasswordAdmin