import React, {useEffect,useState} from 'react';
import "../assets/css/Login.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

const Loginadmin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
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


            localStorage.setItem("Token", loginResponse.data.data.token);
            setLoading(false)
            history.push("/Dashboard");


        } catch(err) {
            setLoading(false)
            err.response.data.message && setErr(err.response.data.message)
        }
    };


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