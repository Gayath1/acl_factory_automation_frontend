import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import CreatableSelect from 'react-select/creatable';
import UserContext from "../userContext";
import {css} from "@emotion/css";
import axios from "axios";
import {HashLoader} from "react-spinners";
import {Alert, AlertTitle} from "@material-ui/lab";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "../components/table/Table";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Badge from "../components/badge/Badge";

const fields = [
    "Id",
    "P.O code",
    "Quantity",
    "Status",
    "Created At",
    "Action"
]

const fields1 = [
    "Id",
    "P.O code",
    "Status",
    "Created At",
    "Action"
]

const orderStatus = {
    "50": "warning",
    "200": "success",
}
const orderStatusname = {
    "50": "Pending",
    "200": "Finish",
}

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
const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.productionorderCode}</td>
        <td>{item.orderQuantity}</td>
        <td>
            <Badge type={orderStatus[item.statusId]} content={orderStatusname[item.statusId]}/>
        </td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            {/*<button onClick={()=>{submitdelete(item.id)}} className="usertblbutton" >Delete</button>*/}
        </td>
    </tr>
)

const token = localStorage.getItem("Token")
const headers = {
    headers: {

        "Authorization": `Bearer ${token}`
    }
};

const changestatus = async (id) => {
    try {

        const body = {id};
        const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/ProductionOrderscontroller/1/updatepending", body, headers);
        window.location.reload();

    } catch (err) {
        console.log(err);
    }

};

const renderOrderBody1 = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.productionorderCode}</td>
        <td>
            <Badge type={orderStatus[item.statusId]} content={orderStatusname[item.statusId]}/>
        </td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button onClick={() => {
                changestatus(item.id)
            }} className="usertblactivebutton">Complete
            </button>
        </td>
    </tr>
)

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Info = () => {

    const {userData} = useContext(UserContext);
    const [name, setName] = useState("");
    const [productionorderCode, setproductionorderCode] = useState("");
    const [orderQuantity, setorderQuantity] = useState("");
    const [productId, setproductId] = useState("");
    let [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [value, setValue] = React.useState(0);
    const [listData, setListData] = useState({lists: []});
    const [listData1, setListData1] = useState({lists: []});
    const [listData2, setListData2] = useState({lists: []});
    const token = localStorage.getItem("Token")
    const [unitofMeasurement, setunitofMeasurement] = useState('kg');
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
                `https://acl-automation.herokuapp.com/api/v1/ProductionOrderscontroller/1/getall`, headers
            );
            setListData1({lists: result1.data.data.productionOrders})
            const result2 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/ProductionOrderscontroller/1/getallpending`, headers
            );
            setListData2({lists: result2.data.data.productionOrders})
            setLoading(false);
        };
        fetchData();
    }, [])

    let options = listData.lists.map(function (city) {
        return {value: city.id, label: city.productCode, name: city.productDescription};
    })

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try {

            const body = {productionorderCode, orderQuantity, productId, unitofMeasurement};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/ProductionOrderscontroller/1/create", body, headers);
            window.location.reload();

        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };


    const handletab = (event, newValue) => {
        setValue(newValue);
    };
    const handleChange = (newValue: any, actionMeta: any) => {
        setproductId(newValue.value)
        setName(newValue.name)
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
            {userData.role === 70 ? (
                <>
                    <Sidebar/>
                    <div id="main" className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <h2 className="page-header">Production Order</h2>
                            {/*    <div className="row">*/}
                            {/*        <div className="col-6">*/}
                            {/*            <div className="card full-height">*/}
                            {/*                <div>*/}
                            {/*                    {err ? (*/}
                            {/*                        <Alert severity="error">*/}
                            {/*                            <AlertTitle>Error</AlertTitle>*/}
                            {/*                            {err}*/}
                            {/*                        </Alert>*/}
                            {/*                    ) : null}*/}
                            {/*                <div className="rowuser">*/}
                            {/*                    <label>Product Code</label>*/}
                            {/*                    <CreatableSelect*/}
                            {/*                        options={options}*/}
                            {/*                        className="rowuserproductivity"*/}
                            {/*                        components={{ SingleValue}}*/}
                            {/*                        isValidNewOption={() => false}*/}
                            {/*                        placeholder=""*/}
                            {/*                        // styles={customStyles}*/}
                            {/*                        onChange={handleChange}*/}
                            {/*                        styles={{*/}
                            {/*                            control: base => ({*/}
                            {/*                                ...base,*/}
                            {/*                                border: 0,*/}
                            {/*                                // This line disable the blue border*/}
                            {/*                                boxShadow: 'none'*/}
                            {/*                            }),*/}
                            {/*                            menu: (provided, state) => ({*/}
                            {/*                                ...provided,*/}
                            {/*                                width: "95%",*/}
                            {/*                                padding: 30,*/}
                            {/*                            }),*/}
                            {/*                            singleValue: (provided, state) => ({*/}
                            {/*                                ...provided,*/}
                            {/*                                display: "flex",*/}
                            {/*                                alignItems: "center",*/}
                            {/*                                opacity : 0.5*/}
                            {/*                            })*/}
                            {/*                        }}*/}
                            {/*                    />*/}
                            {/*                </div>*/}
                            {/*                <div className="rowuser">*/}
                            {/*                    <label>Product Order no.</label>*/}
                            {/*                    <input type="number"  placeholder="" value={productionorderCode}  onChange={(e) => setproductionorderCode(e.target.value)} />*/}
                            {/*                </div>*/}
                            {/*                <div className="rowuser">*/}
                            {/*                    <label>Product</label>*/}
                            {/*                    <input type="text"  placeholder="" value={name} disabled/>*/}
                            {/*                </div>*/}
                            {/*                <div className="rowuser">*/}
                            {/*                    <label>Quantity(KG)</label>*/}
                            {/*                    <select  value={orderQuantity} onChange={(e) => setorderQuantity(e.target.value)}>*/}
                            {/*                        <option value=""  selected></option>*/}
                            {/*                        <option value="1">1</option>*/}
                            {/*                        <option value="2">2</option>*/}
                            {/*                        <option value="3">3</option>*/}
                            {/*                        <option value="4">4</option>*/}
                            {/*                        <option value="5">5</option>*/}
                            {/*                        <option value="10">10</option>*/}
                            {/*                        <option value="12">12</option>*/}
                            {/*                        <option value="15">15</option>*/}
                            {/*                        <option value="20">20</option>*/}
                            {/*                        <option value="22">22</option>*/}
                            {/*                        <option value="25">25</option>*/}
                            {/*                        <option value="30">30</option>*/}
                            {/*                    </select>*/}
                            {/*                </div>*/}

                            {/*                <div id="button" className="rowuser">*/}
                            {/*                    <button   onClick={submit}>submit</button>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="row">
                                <div className="col-12">
                                    <div className="card full-height">
                                        <div className="card__header">
                                            <AppBar position="static" style={{
                                                background: `linear-gradient(90deg, #06518C 0%, #62B4FF 97.85%)`,
                                                borderRadius: "8px"
                                            }}>
                                                <Tabs TabIndicatorProps={{
                                                    style: {
                                                        backgroundColor: "#ffffff"
                                                    }
                                                }} value={value} onChange={handletab}>
                                                    <Tab label="Production orders" {...a11yProps(0)} />
                                                    <Tab label="Pending" {...a11yProps(1)} />
                                                </Tabs>
                                            </AppBar>
                                        </div>
                                        <TabPanel value={value} index={0}>
                                            <Table
                                                limit="5"
                                                headData={fields}
                                                renderHead={(item, index) => renderOrderHead(item, index)}
                                                bodyData={listData1.lists}
                                                renderBody={(item, index) => renderOrderBody(item, index)}
                                            />
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <Table
                                                limit="5"
                                                headData={fields1}
                                                renderHead={(item, index) => renderOrderHead(item, index)}
                                                bodyData={listData2.lists}
                                                renderBody={(item, index) => renderOrderBody1(item, index)}
                                            />
                                        </TabPanel>
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

export default Info