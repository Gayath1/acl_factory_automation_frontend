import React, {useEffect, useState} from 'react';
import OtpInput from 'react-otp-input';
import { Empty } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import {Link, useHistory} from 'react-router-dom';
import {Alert, AlertTitle} from "@material-ui/lab";
import pleaseverify from '../assets/warning.gif'




const Pleaseverify = (props) => {


    useEffect(() => {

    }, [])


    return (


        <>


                <>
                    <div className='form-containerhome'>
                        <div className='form-content-lefthome'>
                            <img className='imgverify' src={pleaseverify} alt='spaceship' />
                        </div>

                        <div className='form-content-right'>
                            <div className="btnhome">

                                <h1><span>Your Account is not Verified!</span></h1>
                                <Link to="/Home">
                                    <button className="form-input-btnhome"  type='submit'>
                                        Home
                                    </button>
                                </Link>
                                <Link to='#'
                                    onClick={(e) => {
                                        window.open('mailto:email@example.com?subject=Subject&body=Body%20goes%20here');
                                        e.preventDefault();
                                    }}>
                                    <button className="form-input-btnhome"  type='submit'>
                                        Contact Innovigent
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </>


        </>



    );

}

export default Pleaseverify