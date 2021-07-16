import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


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


const Usercreate = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = React.useState('Management')
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
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <h2 className="page-header">Users</h2>
                    <div className="row">
                    <div className="col-6">
                        <div className="card full-height">
                            <div>
                                <div className="rowuserradio">
                                <RadioGroup  aria-label="type" name="type" value={type} onChange={handleChange} row>
                                    <FormControlLabel value="Management" control={<Radio color="primary" />} label="Management" />
                                    <FormControlLabel value="Executive" control={<Radio color="primary" />} label="Executive" />
                                    <FormControlLabel value="Operator" control={<Radio color="primary" />} label="Operator" />
                                </RadioGroup>
                                </div>
                                <div className="rowuser">
                                    <label>First Name</label>
                                    <input type="text" autoFocus placeholder="enter your firstname" value={email}  onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="rowuser">
                                    <label>Last Name</label>
                                    <input type="text" placeholder="enter your lastname" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                {type === 'Operator' ?
                                    null
                                    :
                                    <div className="rowuser">
                                        <label>Email</label>
                                        <input type="email" id="email" pattern=".+@globex\.com"  placeholder="enter your email" value={email}  onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                }
                                <div className="rowuser">
                                    <label>Epf No</label>
                                    <input type="number" placeholder="enter your epf no" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="rowuser">
                                    <label>Mobile</label>
                                    <input type="mobile" placeholder="enter your mobile no" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                {type === 'Operator' ?
                                    <div className="rowuser">
                                        <label>Department</label>
                                        <select id="department" name="department">
                                            <option value=""  selected>please select department</option>
                                            <option value="Plastic">Plastic</option>
                                            <option value="Wire">Wire</option>
                                            <option value="Electric">Electric</option>
                                            <option value="IT">IT</option>
                                        </select>
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
                    <div className="row">
                        <div className="col-12">
                            <div className="card full-height">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>First name</TableCell>
                                                <TableCell align="center">Email</TableCell>
                                                <TableCell align="center">Epf no</TableCell>
                                                <TableCell align="center">Mobile</TableCell>
                                                <TableCell align="center">Type</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">{row.calories}</TableCell>
                                                    <TableCell align="center">{row.fat}</TableCell>
                                                    <TableCell align="center">{row.carbs}</TableCell>
                                                    <TableCell align="center">{row.protein}</TableCell>
                                                    <TableCell align="center"><button className="usertblbutton"  disabled={!validateForm()} onClick={handleSubmit}>Delete</button></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usercreate