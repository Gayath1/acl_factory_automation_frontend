import React, {useState} from 'react';
import "../assets/css/Login.css";


const Loginoperator = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div id="loginform">
            <h2 id="headerTitle">Login</h2>
            <div>
                <div className="rowlogin">
                    <label>Username</label>
                    <input type="text" autoFocus placeholder="Enter your username" value={email}  onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="rowlogin">
                    <label>Password</label>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>


                <div id="button" className="rowlogin">
                    <button  disabled={!validateForm()} onClick={handleSubmit}>Log in</button>
                </div>
            </div>
            <div id="alternativeLogin">


            </div>
        </div>
    )
}

export default Loginoperator