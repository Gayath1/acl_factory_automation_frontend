import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { Empty } from 'antd';
import "../assets/css/VerifyAdmin.css";
import 'antd/dist/antd.css';


const Otp = () => {

    const [otp, setOtp] = useState("");



    const   handleChange= (e) => {
        setOtp(e.target.value)
    }


    return (


        <>

                <div className="layout__content-main">
                    <h2 className="page-header"></h2>
                    <div className="row">
                        <div className="col-3">

                        </div>
                        <div className="col-6">
                            <div className="card">
                                <div >
                                    <Empty
                                        description={
                                          <span>
                                            We have sent a verification code on your email.
                                            <br/>Please enter the verification code below.
                                          </span>
                                        }
                                    />
                                    <div className="rowuser">
                                    <OtpInput className="clasicotp"
                                              inputStyle="inputStyle"
                                              errorStyle="error"
                                              value={otp}
                                              onChange={  (otp ) => {setOtp(otp )}}
                                              numInputs={4}


                                        //  separator={<span></span>}
                                    />
                                    </div>
                                </div>
                                <div className="btn-row">
                                    <button className="btn margin-top--large" >
                                    Verify
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">

                        </div>
                    </div>
                </div>

        </>



    );

}

export default Otp