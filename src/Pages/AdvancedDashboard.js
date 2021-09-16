import React, {useEffect, useState} from 'react'

import {Link, Route} from 'react-router-dom'
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import StatusCard from '../components/status-card/StatusCard';
import Chart from 'react-apexcharts'
import Table from '../components/table/Table';
import Badge from '../components/badge/Badge';
import GaugeChart from 'react-gauge-chart'
import Select from 'react-select'
import axios from "axios";
import {HashLoader} from "react-spinners";

const chartOptions = {

    series: [{
        name: 'Good output',
        data: [44, 36]
    }, {
        name: 'Bad output',
        data: [5, 5]
    },],
    options: {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: ''
        },
        xaxis: {
            categories: ["Morning", "Evening"],
            labels: {
                formatter: function (val) {
                    return val + "%"
                }
            }
        },
        yaxis: {
            title: {
                text: undefined
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "%"
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
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

const productorder = [
    {label: "Production01", value: 1},
    {label: "Production02", value: 2},
    {label: "Production03", value: 3},
    {label: "Production04", value: 4},
    {label: "Production05", value: 5},
    {label: "Production06", value: 6},
];


const shift = [
    {label: "Morning", value: 1},
    {label: "Evening", value: 2},
    {label: "Night", value: 2},

];

const line = [
    {label: "Line01", value: 1},
    {label: "Line02", value: 2},

];

const AdvancedDashboard = () => {

    const [meter, setmeter] = useState('OEE');
    const [listData, setListData] = useState({lists: []});
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")
    const handleClick = (event) => {
        setmeter('OEE');
    };
    const handleClick1 = (event) => {
        setmeter('TEEP');
    };
    const handleClick2 = (event) => {
        setmeter('OOE');
    };

    const headers = {
        headers: {

            "Authorization": `Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/MachineCalculationController/1/getall`, headers
            );
            setListData({lists: result.data.data.id})
            setLoading(false);
        };
        fetchData();
    }, [])


    let months = listData.lists.map((item) => item.createdAt).filter((item, index, array) => array.indexOf(item) == index)

    const productTotals = listData.lists.reduce((obj, curr) => {
        if (!obj[curr.id]) {
            obj[curr.id] = []
        }

        obj[curr.id][months.indexOf(curr.createdAt)] = parseInt(curr.goodOutput)
        return obj
    }, {})

    const productTotals1 = listData.lists.reduce((obj, curr) => {
        if (!obj[curr.id]) {
            obj[curr.id] = []
        }

        obj[curr.id][months.indexOf(curr.createdAt)] = parseInt(curr.totalOutput)
        return obj
    }, {})

    const series = Object.entries(productTotals).map(([name, prodArr]) => {
        return {
            name: 'Good',
            data: months.map((month, monthIndex) => {
                if (!prodArr[monthIndex]) {
                    return 0
                } else {
                    return prodArr[monthIndex]
                }

            })
        }

    })
    const series1 = Object.entries(productTotals1).map(([name, prodArr]) => {
        return {
            name: 'Total',
            data: months.map((month, monthIndex) => {
                if (!prodArr[monthIndex]) {
                    return 0
                } else {
                    return prodArr[monthIndex]
                }

            })
        }

    })

    const chartOptions = {

        series: [...series, ...series1],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            title: {
                text: ''
            },
            xaxis: {
                categories: [...months],
                labels: {
                    formatter: function (val) {
                        return val + "%"
                    }
                }
            },
            yaxis: {
                title: {
                    text: undefined
                },
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + "%"
                    }
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
            }
        },


    }

    const statusCards = [
        {
            "icon": "bx bx-chip",
            "count": "19.95%",
            "title": "TEEP",
            "onClick": handleClick1
        },
        {
            "icon": "bx bx-chip",
            "count": "2.12%",
            "title": "OOE",
            "onClick": handleClick2
        },
        {
            "icon": "bx bx-chip",
            "count": `${listData.lists[0].oee}`,
            "title": "OEE",
            "onClick": handleClick
        },

    ]

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
            <Sidebar/>
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <div>
                        <h2 className="page-header">Factory:</h2>
                        <div className="row">
                            <div className="col-4">
                                <Select options={productorder}/>
                            </div>
                            <div className="col-4">
                                <Select options={shift}/>
                            </div>
                            <div className="col-4">
                                <Select options={line}/>
                                <br/>
                                <button style={{
                                    backgroundColor: '#4CAF50',
                                    border: '8px',
                                    color: "white",
                                    padding: "15px 32px",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    display: "inline-block",
                                    fontSize: "16px",
                                    margin: "4px 2px",
                                    cursor: "pointer",
                                    borderRadius: "10px"
                                }}>Explore
                                </button>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div className="row">
                            <div className="col-3">

                                <div className="card full-height">
                                    {meter === 'OEE' ?
                                        <>
                                            <GaugeChart id="gauge-chart1"
                                                        textColor="#000000"
                                                        needleColor="#06518c"
                                                        needleBaseColor="#06518c"
                                                        percent={listData.lists[0].oee}
                                            />
                                            <div className="card__footer">
                                                <Link to='/'>OEE</Link>
                                            </div>
                                        </>
                                        :
                                        null
                                    }
                                    {meter === 'OOE' ?
                                        <>
                                            <GaugeChart id="gauge-chart1"
                                                        textColor="#000000"
                                                        needleColor="#06518c"
                                                        needleBaseColor="#06518c"
                                            />
                                            <div className="card__footer">
                                                <Link to='/'>OOE</Link>
                                            </div>
                                        </>
                                        :
                                        null
                                    }
                                    {meter === 'TEEP' ?
                                        <>
                                            <GaugeChart id="gauge-chart1"
                                                        textColor="#000000"
                                                        needleColor="#06518c"
                                                        needleBaseColor="#06518c"
                                            />
                                            <div className="card__footer">
                                                <Link to='/'>TEEP</Link>
                                            </div>
                                        </>
                                        :
                                        null
                                    }


                                </div>
                            </div>

                            <div className="col-3">
                                <div className="card full-height">
                                    <GaugeChart id="gauge-chart1"
                                                textColor="#000000"
                                                needleColor="#06518c"
                                                needleBaseColor="#06518c"
                                                percent={listData.lists[0].oeeAvailability}
                                    />

                                    <div className="card__footer">
                                        <Link to='/'>Availability</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-3">
                                <div className="card full-height">
                                    <GaugeChart id="gauge-chart1"
                                                textColor="#000000"
                                                needleColor="#06518c"
                                                needleBaseColor="#06518c"
                                                percent={listData.lists[0].productivity}

                                    />
                                    <div className="card__footer">
                                        <Link to='/'>Performance</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="card full-height">
                                    <GaugeChart id="gauge-chart1"
                                                textColor="#000000"
                                                needleColor="#06518c"
                                                needleBaseColor="#06518c"
                                                percent={listData.lists[0].quality}

                                    />
                                    <div className="card__footer">
                                        <Link to='/'>Quality</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="col-12">
                                    {
                                        statusCards.map((item, index) => (
                                            <div className="raw" key={index}>
                                                <StatusCard
                                                    icon={item.icon}
                                                    count={item.count}
                                                    title={item.title}
                                                    onClick={item.onClick}
                                                />
                                            </div>

                                        ))
                                    }
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="card">
                                    <div className="card__header">
                                        <h3>Good output vs Bad output</h3>
                                    </div>
                                    <div className="card__body">
                                        <Chart options={chartOptions.options} series={chartOptions.series} type="bar"
                                               height={350}/>
                                        {/* <Table
                                            limit="5"
                                            headData={latestOrders.header}
                                            renderHead={(item, index) => renderOrderHead(item, index)}
                                            bodyData={latestOrders.body}
                                            renderBody={(item, index) => renderOrderBody(item, index)}
                                        /> */}
                                    </div>
                                    <div className="card__footer">
                                        <Link to='/'>view all</Link>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-8">
                                <div className="card">
                                    <div className="card__header">
                                        <h3>Good output vs Bad output</h3>
                                    </div> */}
                            {/* <div className="card__body"> */}
                            {/* <Chart options={chartOptions.options} series={chartOptions.series} type="bar" height={350} /> */}
                            {/* <Table
                                            limit="5"
                                            headData={latestOrders.header}
                                            renderHead={(item, index) => renderOrderHead(item, index)}
                                            bodyData={latestOrders.body}
                                            renderBody={(item, index) => renderOrderBody(item, index)}
                                        /> */}
                            {/* </div> */}
                            {/* <div className="card__footer">
                                        <Link to='/'>view all</Link>
                                    </div>
                                </div> */}
                            {/* </div> */}
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default AdvancedDashboard