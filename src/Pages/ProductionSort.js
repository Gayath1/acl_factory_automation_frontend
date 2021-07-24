import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import "../assets/css/buttonchoose.css";
import "../assets/css/filter.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import { makeStyles } from '@material-ui/core/styles';
import CreatableSelect from 'react-select/creatable';
import UserContext from "../userContext";
import moment from "moment";
import {HashLoader} from "react-spinners";
import axios from "axios";


const fields = [
    "Device Id",
    "Factory ",
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
        <td>{item.po}</td>
        <td>{item.ProductLine}</td>
        <td>{item.Shift}</td>
        <td>
            <button className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const Device = () => {
    const classes = useStyles();
    const [isCollapsed, setIsCollapsed] = useState(true);
    let [loading, setLoading] = useState(true);
    const [listData, setListData] = useState({ lists: [] });
    const {userData} = useContext(UserContext);
    let result = [];

    const handleChange = (newValue: any, actionMeta: any) => {
        setLoading(true);
        let value = newValue.value;
        result = [];
        result = listData.lists.filter((data) => {
            return data.po.search(value) != -1;
        });
        setListData(result);
        setLoading(false);

    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(false);
        };
        fetchData();

    }, [])
      const customStyles = {
        menu: (provided, state) => ({
          ...provided,
          width: "80%",
          borderBottom: '1px dotted pink',
          color: state.selectProps.menuColor,
          padding: 30,
        }),
      
        control: (_, { selectProps: { width }}) => ({
          width: "400px"
        }),
      
        singleValue: (provided, state) => {
          const opacity =  0.5 ;
          const transition = 'opacity 300ms';

      
          return { ...provided, opacity, transition };
        }
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
            <div style={{ padding: "10px 20px", textAlign: "center", justifyContent:"center", display:"flex", alignItems:"center", width:"100%", height:"100vh", backgroundColor:"#FFFFFF"}}>
                <HashLoader  loading={loading}  size={150} />
            </div>
        )
    }
    return (
        <>
            {userData.role === 70? (
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
                                            <CreatableSelect
                                                className="rowuserproductivity"
                                                components={{
                                                    DropdownIndicator: () => null,
                                                    IndicatorSeparator: () => null
                                                }} r

                                                isClearable
                                                onChange={handleChange}
                                                styles={customStyles}
                                                placeholder=""
                                                // onChange={(event) =>handleSearch(event)}
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
                                            <button>Apply</button>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                :
                                <div className="col-3">
                                    <div  className="filterbtn">
                                    <div id="button" className="rowuser">
                                        <button  onClick={openNav}>Filter</button>
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
                                    bodyData={result}
                                    renderBody={(item, index) => renderOrderBody(item, index)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
            ):null}
            </>
    )
}

export default Device