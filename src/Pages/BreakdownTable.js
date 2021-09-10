import React, {useEffect, useState, forwardRef, useContext} from 'react'

import {Link, Route, useHistory} from 'react-router-dom'
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";

import Table from '../components/table/Table';
import Badge from '../components/badge/Badge';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from "axios";
import UserContext from "../userContext";
import {HashLoader} from "react-spinners";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};


const topCustomers = {
    head: [
        'user',
        'total orders',
        'total spending'
    ],
    body: [
        {
            "username": "john doe",
            "order": "490",
            "price": "$15,870"
        },
        {
            "username": "frank iva",
            "order": "250",
            "price": "$12,251"
        },
        {
            "username": "anthony baker",
            "order": "120",
            "price": "$10,840"
        },
        {
            "username": "frank iva",
            "order": "110",
            "price": "$9,251"
        },
        {
            "username": "anthony baker",
            "order": "80",
            "price": "$8,840"
        }
    ]
}

const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.username}</td>
        <td>{item.order}</td>
        <td>{item.price}</td>
    </tr>
)

const latestOrders = {
    header: [
        "order id",
        "user",
        "total price",
        "date",
        "status"
    ],
    body: [
        {
            id: "#OD1711",
            user: "john doe",
            date: "17 Jun 2021",
            price: "$900",
            status: "shipping"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "pending"
        },
        {
            id: "#OD1712",
            user: "frank iva",
            date: "1 Jun 2021",
            price: "$400",
            status: "paid"
        },
        {
            id: "#OD1713",
            user: "anthony baker",
            date: "27 Jun 2021",
            price: "$200",
            status: "refund"
        }
    ]
}

const rows = [
    {
        name: "Tomato",
        color: "red",
        quantity: 12,
        id: "01"
    },
    {
        name: "Banana",
        color: "yellow",
        quantity: 5,
        id: "02"
    },
    {
        name: "Lemon",
        color: "yellow",
        quantity: 20,
        id: ""
    },
    {
        name: "Blueberry",
        color: "blue",
        quantity: 50,
        id: ""
    }
]


const orderStatus = {
    "100": "warning",
    "130": "warning",
    "171": "success",
    "161": "success",
}

const orderStatusname = {
    "100": "Pending",
    "130" : "Breakdown",
    "171": "Executive",
    "161" : "Operator",
}

const fields = [
    "id",
    "Production order",
    "Production Run Id",
    "DownTime Start",
    "Status"
]

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.productionOrderId}</td>
        <td>{item.productionRunId}</td>
        <td>{item.downtimeStartTime}</td>
        <td>
            <Badge type={orderStatus[item.statusId]} content={orderStatusname[item.statusId]}/>
        </td>
    </tr>
)


const Downtimetable = () => {

    const [data, setData] = useState(rows);
    const {userData} = useContext(UserContext);
    const [checked, setChecked] = useState(false);
    const [listData, setListData] = useState({lists: []});
    const [listData1, setListData1] = useState({lists: []});
    const [listData2, setListData2] = useState({lists: []});
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")
    const history = useHistory();

    const headers = {
        headers: {

            "Authorization": `Bearer ${token}`
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/summaryDashboardUserbreakdown/1/${userData.role}/getall`, headers
            );
            setListData({lists: result.data.data.organization.getdowntimes})
            const result1 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/summaryDashboardUserProductionSlowRunList/1/${userData.role}/getall`, headers
            );
            setListData1({lists: result1.data.data.organization.getslowruns})
            const result2 = await axios(
                `https://acl-automation.herokuapp.com/api/v1/summaryDashboardUserProductionDowntimeListnotresponded/1/${userData.role}/getall`, headers
            );
            setListData2({lists: result2.data.data.organization.getdowntimes})
            setLoading(false);
        };
        fetchData();
    }, [])

    const filterValue = value => {
        if (value) {
            const filtered = data.filter(d => d.id.trim().length > 0);
            setData(filtered);
        } else {
            setData(rows);
        }
        setChecked(value);
    };

    const columns = [
        {
            title: "Id",
            field: "id",
        },
        {title: "Order Id", field: "productionOrderId", filtering: false},
        {title: "Run Id", field: "productionRunId", filtering: false},
        {title: "Start Time", field: "downtimeStartTime", filtering: false, hidden: true}
    ];

    if (loading) {
        return (
            <div style={{ padding: "10px 20px", textAlign: "center", justifyContent:"center", display:"flex", alignItems:"center", width:"100%", height:"100vh", backgroundColor:"#FFFFFF"}}>
                <HashLoader  loading={loading}  size={150} />
            </div>
        )
    }
    return (
        <>
            <Sidebar/>
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <div>
                        <h2 className="page-header">Dashboard</h2>
                        <div className="row">


                            <div className="col-8">
                                <div className="card">
                                    <div className="card__header">
                                        <h3>Machine Downtime reasons</h3>
                                    </div>
                                    <div className="card__body">
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
                        <div className="row">
                            <div className="col-8">
                                <div className="card">
                                    <div className="card__header">
                                        <h3>Not responded </h3>
                                    </div>
                                    <div className="card__body">
                                        <MaterialTable
                                            title=""
                                            columns={columns}
                                            data={listData2.lists}
                                            icons={tableIcons}
                                            // options={{
                                            //     filtering: true
                                            // }}
                                        />
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="card">
                                    <div className="card__header">
                                        <h3>Slow Speed</h3>
                                    </div>
                                    <div className="card__body">
                                        <MaterialTable
                                            title=""
                                            columns={columns}
                                            data={listData.lists}
                                            icons={tableIcons}
                                            // options={{
                                            //     filtering: true
                                            // }}
                                        />
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="card">
                                    <div className="card__header">
                                        <h3>Planned Production</h3>
                                    </div>
                                    <div className="card__body">
                                        <MaterialTable
                                            title=""
                                            columns={columns}
                                            data={data}
                                            icons={tableIcons}
                                            // options={{
                                            //     filtering: true
                                            // }}
                                        />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Downtimetable
