import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import "../assets/css/buttonchoose.css";
import "../assets/css/filter.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import {makeStyles} from '@material-ui/core/styles';
import CreatableSelect from 'react-select/creatable';
import UserContext from "../userContext";
import {HashLoader} from "react-spinners";
import {css} from '@emotion/css'
import axios from "axios";

const fields = [
    "Product Id",
    "Order Quantity",
    "Product Code",
    "Name",
    "Product line Id",
    "Created At",
    "Action"
]

const rows = [
    {
        "po": "1",
        "Shift": "A",
        "ProductLine": "1",
    },
    {
        "po": "9",
        "Shift": "B",
        "ProductLine": "2",
    }
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.productId}</td>
        <td>{item.productInfos.productCode}</td>
        <td>{item.productInfos.productName}</td>
        <td>{item.orderQuantity}</td>
        <td>{item.Shift}</td>
        <td>
            <button className="usertblbutton">Delete</button>
        </td>
    </tr>
)

const Device = () => {
    const classes = useStyles();
    const [isCollapsed, setIsCollapsed] = useState(true);
    let [loading, setLoading] = useState(true);
    const token = localStorage.getItem("Token")
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({lists: []});
    const [listData1, setListData1] = useState({lists: []});
    const [productionOrders, setproductionOrders] = useState('');
    const {userData} = useContext(UserContext);


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
            setLoading(false);
        };
        fetchData();
    }, [])

    let options = listData.lists.map(function (city) {
        return {value: city.id, label: city.productCode, name: city.productName};
    })

    useEffect(() => {
        // if (!result) {
        //     setResult(undefined)
        //     return
        // }
        console.log(listData1)
    }, [listData1])

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            width: "90%",
            padding: 30,
        }),

        control: (_, {selectProps: {width}}) => ({
            width: "400px"
        })
    }

    function closeNav() {
        setIsCollapsed(true)
        //document.getElementById("myfilter").style.height = "100px";
    }

    function openNav() {
        setIsCollapsed(false)
        //document.getElementById("myfilter").style.height = "500px";
    }

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

    const  handleChange = (newValue: any, actionMeta: any) => {
        setproductionOrders(newValue.value)
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

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {

            const body = {productionOrders};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/ProductionOrderscontroller/1/sort", body, headers);
            setListData1({lists: loginResponse.data.data.productionOrders})
            setLoading(false);

        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };
    return (
        <>
            {userData.role === 70 ? (
                <>
                    <Sidebar/>
                    <div id="main" className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <h2 className="page-header">Sort Page</h2>
                            <div className="row">
                                {isCollapsed === false ?
                                    <div className="col-6">
                                        <div id="myfilter" className="filter-modal__wrapper">
                                            <div>
                                                <div className="filter-modal__actions button">
                                                    <button onClick={closeNav}>x</button>
                                                </div>

                                                <div className="rowuser">
                                                    <label>Production Order No</label>
                                                    {/*<CreatableSelect*/}
                                                    {/*    className="rowuserproductivity"*/}
                                                    {/*    label="Single select"*/}
                                                    {/*    components={{*/}
                                                    {/*        DropdownIndicator: () => null,*/}
                                                    {/*        IndicatorSeparator: () => null,*/}
                                                    {/*        indicatorsContainer: () => null,*/}
                                                    {/*        SingleValue*/}
                                                    {/*    }}*/}
                                                    {/*    formatCreateLabel={() => undefined}*/}
                                                    {/*    isValidNewOption={() => false}*/}
                                                    {/*    options={podata}*/}
                                                    {/*    isClearable={true}*/}
                                                    {/*    onChange={handleChange}*/}
                                                    {/*    styles={customStyles}*/}
                                                    {/*    placeholder=""*/}
                                                    {/*    // onChange={(event) =>handleSearch(event)}*/}
                                                    {/*/>*/}
                                                    <CreatableSelect
                                                        options={options}
                                                        className="rowuserproductivity"
                                                        onChange={handleChange}
                                                        components={{SingleValue}}
                                                        isValidNewOption={() => false}
                                                        // styles={customStyles}
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
                                                    <label>Select a shift</label>
                                                    <div className="wrapper">
                                                        <input type="radio" name="select" id="option-1"/>
                                                        <input type="radio" name="select" id="option-2"/>
                                                        <input type="radio" name="select" id="option-3"/>
                                                        <label htmlFor="option-1" className="option option-1">
                                                            <div className="dot"></div>
                                                            <span>A</span>
                                                        </label>
                                                        <label htmlFor="option-2" className="option option-2">
                                                            <div className="dot"></div>
                                                            <span>B</span>
                                                        </label>
                                                        <label htmlFor="option-3" className="option option-3">
                                                            <div className="dot"></div>
                                                            <span>C</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="rowuser">
                                                    <label>Select a production line</label>
                                                    <div className="wrapper1">
                                                        <input type="radio" name="select1" id="option1-4"/>
                                                        <input type="radio" name="select1" id="option1-5"/>
                                                        <input type="radio" name="select1" id="option1-6"/>
                                                        <label htmlFor="option1-4" className="option1 option1-4">
                                                            <div className="dot"></div>
                                                            <span>A</span>
                                                        </label>
                                                        <label htmlFor="option1-5" className="option1 option1-5">
                                                            <div className="dot"></div>
                                                            <span>B</span>
                                                        </label>
                                                        <label htmlFor="option1-6" className="option1 option1-6">
                                                            <div className="dot"></div>
                                                            <span>C</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div id="button" className="rowuser">
                                                    <button onClick={submit}>Apply</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="col-3">
                                        <div className="filterbtn">
                                            <div id="button" className="rowuser">
                                                <button onClick={openNav}>Filter</button>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card full-height">
                                        <Table
                                            limit="5"
                                            headData={fields}
                                            renderHead={(item, index) => renderOrderHead(item, index)}
                                            bodyData={listData1.lists}
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

export default Device

