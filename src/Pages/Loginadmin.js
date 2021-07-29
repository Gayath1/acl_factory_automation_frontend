import React, {useContext,useState} from 'react';
import "../assets/css/Login.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import UserContext from '../userContext';
import {HashLoader} from "react-spinners";

const Loginadmin = () => {

    const { setUserData } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let [loading, setLoading] = useState('');
    const [err, setErr] = useState("");
    const history = useHistory();
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const submit = async (e) => {
        //e.preventDefault();
        setErr("");
        setLoading(true);
        try{
            const body = ({email, password});
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/admin/login", body);
            setUserData({
                token: loginResponse.data.data.token,
                user: loginResponse.data.data.user.id,
                role : loginResponse.data.data.userpermissions.permissions.id,

            });

            localStorage.setItem("Token", loginResponse.data.data.token);
            setLoading(false)
            {loginResponse.data.data.user.statusId === '1'?
                history.push("/Dashboard")
            :
                history.push("/verify");
            }



        } catch(err) {
            setLoading(false)
            err.response.data.message && setErr(err.response.data.message)
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
        <div id="loginform">
            <h2 id="headerTitle">Login</h2>
            <div>
                {err ? (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {err}
                    </Alert>
                ) : null}
                <div className="rowlogin">
                    <label>Username</label>
                    <input type="email" id="email" autoFocus placeholder="Enter your username" value={email}  onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="rowlogin">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>


                <div id="button" className="rowlogin">
                    <button  disabled={!validateForm()} onClick={submit}>Log in</button>
                </div>
            </div>
            <div id="alternativeLogin">


            </div>
        </div>
    )
}

export default Loginadmin