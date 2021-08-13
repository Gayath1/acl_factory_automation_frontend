import React, {useEffect, useState} from 'react';
import OtpInput from 'react-otp-input';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import {Alert, AlertTitle} from "@material-ui/lab";
import verify from '../assets/verify.gif'


const Otp = (props) => {
    const [loadingverify,setloadingverify] = useState(false);
    const [confirmationCode, setconfirmationCode] = useState(props.match.params.confirmationCode);
    const [err, setErr] = useState("");
    const history = useHistory();

    const   handleChange= (e) => {
        setconfirmationCode(e.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            setErr("");
            try{

                const body = {confirmationCode};
                const loginResponse = await axios.post(`https://acl-automation.herokuapp.com/api/v1/Management/1/verify/${confirmationCode}`,body);
                setloadingverify(true)
                setTimeout(()=>{
                    //this will make sure the loader is not showed anymore, and your main content will popup
                    setloadingverify(false)
                    history.push({pathname: '/ChangeManagementPassword',
                        state: confirmationCode
                    })
                }, 5000)

            } catch(err) {
                err.response.data.message && setErr(err.response.data.message)
            }

        };
        fetchData();
    }, [])

    // const submit = async (e) => {
    //     e.preventDefault();
    //     setErr("");
    //     try{
    //
    //         const body = {confirmationCode};
    //         const loginResponse = await axios.post(`https://acl-automation.herokuapp.com/api/v1/admin/1/verify/${confirmationCode}`,body);
    //         history.push("/Loginadmin");
    //
    //     } catch(err) {
    //         err.response.data.message && setErr(err.response.data.message)
    //     }
    //
    // };

    if (loadingverify) {
        return (
            <div className="layout__content-main">
                <div style={{ padding: "5px 20px", textAlign: "center", justifyContent:"center", display:"flex", alignItems:"center", width:"100%", height:"90vh", backgroundColor:"#FFFFFF"}}>
                    <img src={verify} alt="loading..." />
                </div>
                <h2 className="page-header" style={{  textAlign: "center", justifyContent:"center", display:"flex", alignItems:"center"}}><a href="/Loginmanagement">Account verified!Please Login</a></h2>
            </div>
        )
    }
    return (


        <>

            {/*<div className="layout__content-main">*/}
            {/*    <h2 className="page-header"></h2>*/}
            {/*    <div className="row">*/}
            {/*        <div className="col-3">*/}

            {/*        </div>*/}
            {/*        <div className="col-6">*/}
            {/*            <div className="card">*/}
            {/*                <div >*/}
            {/*                    {err ? (*/}
            {/*                        <Alert severity="error">*/}
            {/*                            <AlertTitle>Error</AlertTitle>*/}
            {/*                            {err}*/}
            {/*                        </Alert>*/}
            {/*                    ) : null}*/}
            {/*                    <Empty*/}
            {/*                        description={*/}
            {/*                          <span>*/}
            {/*                            We have sent a verification code on your email.*/}
            {/*                            <br/>Please enter the verification code below.*/}
            {/*                          </span>*/}
            {/*                        }*/}
            {/*                    />*/}
            {/*                    <div className="rowuser">*/}
            {/*                    <OtpInput className="clasicotp"*/}
            {/*                              inputStyle="inputStyle"*/}
            {/*                              errorStyle="error"*/}
            {/*                              value={confirmationCode}*/}
            {/*                              onChange={  (otp ) => {setconfirmationCode(otp )}}*/}
            {/*                              numInputs={6}*/}


            {/*                        //  separator={<span></span>}*/}
            {/*                    />*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="btn-row">*/}
            {/*                    <button className="btn margin-top--large" onClick={submit}>*/}
            {/*                    Verify*/}
            {/*                    </button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="col-3">*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </>



    );

}

export default Otp