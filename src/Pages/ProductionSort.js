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
import {HashLoader} from "react-spinners";
import { css } from '@emotion/css'

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
    const [podata,setpodata] = useState([
        { value: 'Color', label: 'Yellow' },
        { value: 'Fruit', label: 'Apple' },
        { value: 'Tool', label: 'Spanner' },
    ])
    const [listData, setListData] = useState({ lists: [{
            "po": "1",
            "Shift": "A",
            "ProductLine": "1",
        },
            {
                "po": "9",
                "Shift": "B",
                "ProductLine": "2",
            }] });
    const {userData} = useContext(UserContext);
    const  [result,setResult] = useState([])

    const handleChange = (newValue: any, actionMeta: any) => {
        setLoading(true);
        let value = newValue.value;
        const result = listData.lists.filter((data) => {
            return data.po.search(value) != -1;
        });
        setResult(result);
        setLoading(false);

    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(false);
        };
        fetchData();
    }, [])

    useEffect(() => {
        // if (!result) {
        //     setResult(undefined)
        //     return
        // }
    console.log(result)
    }, [result])

      const customStyles = {
        menu: (provided, state) => ({
          ...provided,
          width: "90%",
          padding: 30,
        }),
      
        control: (_, { selectProps: { width }}) => ({
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
            <div style={{ padding: "10px 20px", textAlign: "center", justifyContent:"center", display:"flex", alignItems:"center", width:"100%", height:"100vh", backgroundColor:"#FFFFFF"}}>
                <HashLoader  loading={loading}  size={150} />
            </div>
        )
    }

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
                        "single-value--is-disabled": isDisabled
                    },
                    className
                )}
            >
                <div>{selectProps.getOptionLabel(data)}</div>
            </div>
        );
    };
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
                                                options={podata}
                                                className="rowuserproductivity"
                                                components={{ SingleValue }}
                                                isValidNewOption={() => false}
                                                // styles={customStyles}
                                                styles={{
                                                    menu: (provided, state) => ({
                                                        ...provided,
                                                        width: "95%",
                                                        padding: 30,
                                                    }),
                                                    singleValue: (provided, state) => ({
                                                        ...provided,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        opacity : 0.5
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

