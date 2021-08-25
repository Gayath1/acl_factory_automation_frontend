import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import {Alert, AlertTitle} from "@material-ui/lab";
import moment from "moment";
import {HashLoader} from "react-spinners";
import UserContext from "../userContext";
import {css} from "@emotion/css";
import CreatableSelect from "react-select/creatable";
import TableMaterial from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

const fields = [
    "Product Name",
    "Product Code",
    "Created At",
    "Action"
]

const rows = [
    {
        "id": 1,
        "firstName": "mujeeb",
        "lastName": "singham",
        "email": "chandulagayan@gmail.com",
        "verificationtoken": "1234",
        "epfNo": null,
        "phoneNo": "0776465645",
        "image": null,
        "statusId": 1,
        "password": "$2y$10$zrrjILLqTKyxYiR3jrOdvuaE.tEG3U148gVPoe7zYQLpitytXpyU2 ",
        "createdAt": "2021-07-16T10:38:11.002Z",
        "updatedAt": "2021-07-16T10:38:11.002Z",
    },
    {
        "id": 9,
        "firstName": "Gayath",
        "lastName": "Chandula",
        "email": "chandulagayan1@gmail.com",
        "verificationtoken": "g96wx6",
        "epfNo": "47586598",
        "phoneNo": null,
        "image": "uploads/dashboard.JPG-1626512057383.jpeg",
        "statusId": 50,
        "password": "$2b$10$vqy4Pln0C.V88NOCdpOOFOKZYHbVGWv.yV/7XLn7cpYxLQnV2PzPi",
    }
];

// const useStyles = makeStyles(theme => ({
//     root: {
//         width: "100%"
//     },
//     paper: {
//         marginTop: theme.spacing(3),
//         width: "100%",
//         overflowX: "auto",
//         marginBottom: theme.spacing(2)
//     },
//     table: {
//         minWidth: 650
//     }
// }));

const token = localStorage.getItem("Token")

const headers = {
    headers: {

        "Authorization": `Bearer ${token}`
    }
};


const submitdelete = async (id) => {

    try {

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/productinfo/1/delete", body, headers);
        window.location.reload();

    } catch (err) {
        console.log(err)
    }

};

const fields1 = [
    "Product line",
    "Speed",
    "SlowSpeed"
]

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.productName}</td>
        <td>{item.productCode}</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button onClick={() => {
                submitdelete(item.id)
            }} className="usertblbutton">Delete
            </button>
        </td>
    </tr>
)

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 130,
        height: 40
    },
    input: {
        width: 130,
        height: 40
    }
}));


const createData = (name, calories, fat, carbs, protein) => ({
    id: name.replace(" ", "_"),
    name,
    calories,
    fat,
    carbs,
    protein,
    isEditMode: false
});


const CustomTableCell = ({row, name, onChange}) => {
    const classes = useStyles();
    const {isEditMode} = row;
    return (
        <TableCell align="left" className={classes.tableCell}>
            {isEditMode ? (
                <Input
                    value={row[name]}
                    name={name}
                    onChange={e => onChange(e, row)}
                    className={classes.input}
                />
            ) : (
                row[name]
            )}
        </TableCell>
    );
};

const ProductionSpeed = () => {
    const classes = useStyles();
    const {userData} = useContext(UserContext);
    const [productName, setproductName] = useState("");
    // const [productId, setproductId] = useState("");
    const [factoryId, setfactoryId] = useState("");
    const [productCode, setproductCode] = useState("");
    const [machineSpeed, setmachineSpeed] = useState("");
    const [downTime, setdownTime] = useState("");
    const [slowspeed, setslowspeed] = useState("");
    const [productLineId, setproductLineId] = React.useState('');
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({lists: []});
    const [listData1, setListData1] = useState( []);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")
    const [previous, setPrevious] = React.useState({});
    const headers = {
        headers: {

            "Authorization": `Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/productinfo/1/getall`, headers
            );
            setListData({lists: result.data.data.ProductDetails})
            const result1 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/productlines/1/getall`, headers
            );
            setListData1(result1.data.data.ProductLinesDetails)
            setLoading(false);
        };
        fetchData();
    }, [])



    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            const body = {productName, productCode, machineSpeed, downTime, factoryId, productLineId, slowspeed,listData1};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/productinfo/1/create", body, headers);
            // setproductId(loginResponse.data.id);
            const productId = loginResponse.data.data.id;
            const body1 = ({productId, productLineId, machineSpeed, slowspeed,listData1})
            setproductName('');
            setmachineSpeed('');
            const loginResponse1 = await axios.post("https://acl-automation.herokuapp.com/api/v1/productlinemachinespeedcontroller/1/create", body1, headers);
            //window.location.reload();

        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };


    const handleChange = (newValue: any, actionMeta: any) => {
        setproductName(newValue.value)
        // setName(newValue.name)
    };

    const onToggleEditMode = id => {
        setListData1(state => {
            return listData1.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        if (!previous[row.id]) {
            setPrevious(state => ({...state, [row.id]: row}));
        }
        const value = e.target.value;
        const name = e.target.name;
        const {id} = row;
        const newRows = listData1.map(row => {
            if (row.id === id) {
                return {...row, [name]: value};
            }
            return row;
        });
        setListData1(newRows);
    };

    const onRevert = id => {
        const newRows = listData1.map(row => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setListData1(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };

    const SingleValue = ({
                             cx,
                             getStyles,
                             selectProps,
                             data,
                             isDisabled,
                             className,
                             ...props
                         }) => {
        console.log(props);
        return (
            <div
                className={cx(
                    css(getStyles("singleValue", props)),
                    {
                        "single-value": true,
                        "single-value--is-disabled": isDisabled,

                    },
                    className
                )}
            >
                <div>{selectProps.getOptionLabel(data)}</div>
            </div>
        );
    };


    let options = listData.lists.map(function (city) {
        return {value: city.id, label: city.productCode, name: city.productName};
    })

    if (loading) {
        return (
            <div style={{
                padding: "10px 20px",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100vh",
                backgroundColor: "#FFFFFF"
            }}>
                <HashLoader loading={loading} size={150}/>
            </div>
        )
    }
    return (
        <>
            {userData.role === 1 || userData.role === 50 ? (
                <>
                    <Sidebar/>
                    <div id="main" className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <h2 className="page-header">Product Information</h2>
                            <div className="row">
                                <div className="col-6">
                                    <div className="card full-height">
                                        <div>
                                            <form onSubmit={submit}>
                                                {err ? (
                                                    <Alert severity="error">
                                                        <AlertTitle>Error</AlertTitle>
                                                        {err}
                                                    </Alert>
                                                ) : null}
                                                <div className="rowuser">
                                                    <label>Product Name</label>
                                                    <CreatableSelect
                                                        options={options}
                                                        className="rowuserproductivity"
                                                        components={{SingleValue}}
                                                        isValidNewOption={() => false}
                                                        placeholder=""
                                                        // styles={customStyles}
                                                        onChange={handleChange}
                                                        styles={{
                                                            control: base => ({
                                                                ...base,
                                                                border: 0,
                                                                // This line disable the blue border
                                                                boxShadow: 'none'
                                                            }),
                                                            menu: (provided, state) => ({
                                                                ...provided,
                                                                width: "95%",
                                                                padding: 30,
                                                            }),
                                                            singleValue: (provided, state) => ({
                                                                ...provided,
                                                                display: "flex",
                                                                alignItems: "center",
                                                                opacity: 0.5
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                <div className="rowuser">
                                                    <label>Product Code</label>
                                                    <input type="text" placeholder="" value={productCode}
                                                           onChange={(e) => setproductCode(e.target.value)} required/>
                                                </div>
                                                <div className="rowuser">
                                                    <label>Down Time</label>
                                                    <select id="department" name="department" value={downTime}
                                                            onChange={(e) => setdownTime(e.target.value)} required>
                                                        <option value="" selected>please select DownTime</option>
                                                        <option value="5">05 Min</option>
                                                        <option value="10">10 Min</option>
                                                        <option value="15">15 Min</option>
                                                        <option value="20">20 Min</option>
                                                        <option value="25">25 Min</option>
                                                        <option value="30">30 Min</option>
                                                    </select>
                                                </div>

                                                <div id="button" className="rowuser">
                                                    <button  type="submit">submit</button>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card full-height">
                                        <Paper className={classes.root}>
                                            <TableMaterial className={classes.table} aria-label="caption table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left"/>
                                                        <TableCell align="left">Product line</TableCell>
                                                        <TableCell align="left">Speed</TableCell>
                                                        <TableCell align="left">Slow Speed</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {listData1.map(row => (
                                                        <TableRow key={row.id}>
                                                            <TableCell className={classes.selectTableCell}>
                                                                {row.isEditMode ? (
                                                                    <>
                                                                        <IconButton
                                                                            aria-label="done"
                                                                            onClick={() => onToggleEditMode(row.id)}
                                                                        >
                                                                            <DoneIcon/>
                                                                        </IconButton>
                                                                        <IconButton
                                                                            aria-label="revert"
                                                                            onClick={() => onRevert(row.id)}
                                                                        >
                                                                            <RevertIcon/>
                                                                        </IconButton>
                                                                    </>
                                                                ) : (
                                                                    <IconButton
                                                                        aria-label="delete"
                                                                        onClick={() => onToggleEditMode(row.id)}
                                                                    >
                                                                        <EditIcon/>
                                                                    </IconButton>
                                                                )}
                                                            </TableCell>
                                                            <CustomTableCell {...{
                                                                row,
                                                                name: "productlineNo",
                                                                onChange
                                                            }} />
                                                            <CustomTableCell {...{row, name: "speed", onChange}} />
                                                            <CustomTableCell {...{row, name: "slowspeed", onChange}} />
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </TableMaterial>
                                        </Paper>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card full-height">
                                        <Table
                                            limit="5"
                                            headData={fields}
                                            renderHead={(item, index) => renderOrderHead(item, index)}
                                            bodyData={listData.lists}
                                            renderBody={(item, index) => renderOrderBody(item, index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}

export default ProductionSpeed