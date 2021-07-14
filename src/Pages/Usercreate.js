import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Usercreate = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = React.useState('Admin')
    const [image,setImage]= ('');
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    const handleChange = (event) => {
        setType(event.target.value);
    };
    const imagehandleChange = (event) => {
        setImage(event.target.files[0]);
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    return (
        <>
            <Sidebar/>
            <div className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <h2 className="page-header">Users</h2>
                    <div className="row">
                    <div className="col-6">
                        <div className="card full-height">
                            <div>
                                <div className="rowuser">
                                <RadioGroup  aria-label="type" name="type" value={type} onChange={handleChange} row>
                                    <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                                    <FormControlLabel value="Executive" control={<Radio />} label="Executive" />
                                    <FormControlLabel value="Operator" control={<Radio />} label="Operator" />
                                </RadioGroup>
                                </div>
                                <div className="rowuser">
                                    <label>First Name</label>
                                    <input type="text" autoFocus placeholder="Enter your FirstName" value={email}  onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="rowuser">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="Enter your LastName" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="rowuser">
                                    <label>Email</label>
                                    <input type="email" id="email" pattern=".+@globex\.com"  placeholder="Enter your Email" value={email}  onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <div className="rowuser">
                                    <label>Epf No</label>
                                    <input type="number" placeholder="Enter your Epf No" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="rowuser">
                                    <label>Mobile</label>
                                    <input type="mobile" placeholder="Enter your mobile No" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                {type === 'Operator' ?
                                    <div className="rowuser">
                                        <label>Department</label>
                                        <input type="text" placeholder="Enter your department" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    :
                                    null
                                }

                                <div id="button" className="rowuser">
                                    <button  disabled={!validateForm()} onClick={handleSubmit}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card full-height">
                            <div>
                                <div className="rowuser">
                                    <label>User Image</label>
                                    <input type='file' onChange={onSelectFile} placeholder="select your Image" />
                                </div>
                               {/*<div className="rowuser">*/}
                                    <div >
                                        {selectedFile &&  <img className="form-imguser"  src={preview} /> }
                                    </div>
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usercreate