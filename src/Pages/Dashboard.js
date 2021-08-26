import React, {useEffect, useState, forwardRef} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {Link, Route, useHistory} from 'react-router-dom';
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import StatusCard from '../components/status-card/StatusCard';
import Chart from 'react-apexcharts'
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
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import moment from "moment";
import axios from "axios";


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

const fields = [
    "Device Id",
    "Factory ",
    "Product line Id",
    "Created At",
    "Action"
]

function TabPanel1(props) {
    const {children, value1, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value1 !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value1 === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps1(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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

const chartOptions = {
    series: [{
        name: 'PRODUCT A',
        data: [44, 55, 41, 67, 22, 43]
    }, {
        name: 'PRODUCT B',
        data: [13, 23, 20, 8, 13, 27]
    }, {
        name: 'PRODUCT C',
        data: [11, 17, 15, 15, 21, 14]
    }, {
        name: 'PRODUCT D',
        data: [21, 7, 25, 13, 22, 8]
    }],
    options: {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10
            },
        },
        xaxis: {
            type: 'datetime',
            categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                '01/05/2011 GMT', '01/06/2011 GMT'
            ],
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
    },
}


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
    "shipping": "primary",
    "pending": "warning",
    "paid": "success",
    "refund": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.user}</td>
        <td>{item.price}</td>
        <td>{item.date}</td>
        <td>
            <Badge type={orderStatus[item.status]} content={item.status}/>
        </td>
    </tr>
)

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

const Dashboard = () => {

    const classes = useStyles();
    const [data, setData] = useState(rows);
    const [checked, setChecked] = useState(false);
    const [value, setValue] = React.useState(0);
    const [value1, setValue1] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [listData, setListData] = useState({lists: []});
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
                `https://acl-automation.herokuapp.com/api/v1/factories/1/getall`, headers
            );
            setListData({lists: result.data.data.FactoryDetails})
            setLoading(false);
        };
        fetchData();
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClick2 = (event) => {
        history.push('/BreakdownTable')
    };


    const statusCards = [
        {
            "icon": "bx bx-error-alt",
            "count": "1,995",
            "title": "Not respond",
            "color": "#ffcc00"
        },
        {
            "icon": "bx bxs-traffic-barrier",
            "count": "2,001",
            "title": "Total Breakdown",
            "onClick": handleClick1,
            "color": "#fb0b12"
        },
        {
            "icon": "bx bx-pause",
            "count": "$2,632",
            "title": "Slow Speeds",
            "color": "#fca11a"
        },
        {
            "icon": "bx bx-wrench",
            "count": "1,711",
            "title": "Downtime",
            "onClick": handleClick,
            "color": "#fca11a"
        },
        {
            "icon": "bx bxl-product-hunt",
            "count": "1,711",
            "title": "Planned Production",
            "onClick": handleClick,
            "color": "#4caf50"
        },
        {
            "icon": "bx bx-chevrons-right",
            "count": "SEE MORE",
            "title": ">>>>>>>>",
            "onClick": handleClick2,
            "color": "#ffffff"
        }
    ]


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const handletab = (event, newValue) => {
        setValue(newValue);
    };
    const handletab1 = (event, newValue) => {
        setValue1(newValue);
    };

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
            title: "Name",
            field: "name",
        },
        {title: "Color", field: "color", filtering: false},
        {title: "Quantity", field: "quantity", filtering: false},
        {title: "ID", field: "id", filtering: false, hidden: true}
    ];

    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const id = open ? 'simple-popover' : undefined;
    const id1 = open1 ? 'simple-popover' : undefined;

    return (
        <>
            <Sidebar/>
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <AppBar position="static" style={{
                        background: `linear-gradient(90deg, #06518C 0%, #62B4FF 97.85%)`,
                        borderRadius: "8px"
                    }}>
                        <Tabs TabIndicatorProps={{
                            style: {
                                backgroundColor: "#ffffff"
                            }
                        }} value={value} onChange={handletab}>
                            {listData.lists.map((country, index) => (
                                <Tab
                                    label={country.factoryName}
                                    id={`simple-tab-${index}`}
                                    key={country.id}
                                    ariaControls={`simple-tabpanel-${index}`}
                                />
                            ))}
                        </Tabs>
                    </AppBar>
                </div>
                {listData.lists.map((tabInfo, index) => (
                    <TabPanel value={value} index={index}>
                        <div>
                            <h2 className="page-header">Dashboard</h2>
                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        {
                                            statusCards.map((item, index) => (
                                                <div className="col-6" key={index}>
                                                    <StatusCard
                                                        icon={item.icon}
                                                        count={item.count}
                                                        title={item.title}
                                                        onClick={item.onClick}
                                                        color={item.color}
                                                    />
                                                </div>
                                            ))
                                        }
                                        <Popover
                                            id={id1}
                                            open={open1}
                                            anchorEl={anchorEl1}
                                            onClose={handleClose1}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={data}
                                                icons={tableIcons}
                                                // options={{
                                                //     filtering: true
                                                // }}
                                            />
                                        </Popover>
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                        >
                                            <MaterialTable
                                                title=""
                                                columns={columns}
                                                data={data}
                                                icons={tableIcons}
                                                // options={{
                                                //     filtering: true
                                                // }}
                                            />
                                        </Popover>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card full-height">
                                        {/* chart */}
                                        <Chart options={chartOptions.options} series={chartOptions.series} type="bar"
                                               height={350}/>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card__header">
                                        <h3>DownTimes</h3>
                                    </div>
                                    <div className="card__body">
                                        <Chart options={chartOptions.options} series={chartOptions.series} type="line"
                                               height={350}/>
                                    </div>
                                    <div className="card__footer">
                                        <Link to='/AdvancedDashboard'>view all</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                ))}


            </div>

        </>
    )
}

export default Dashboard