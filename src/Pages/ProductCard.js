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





const Info = () => {

    const {userData} = useContext(UserContext);
    const [name, setName] = useState("");
    const [productionorderCode, setproductionorderCode] = useState("");
    const [orderQuantity,setorderQuantity] = useState("");
    const [productId,setproductId] = useState("");
    let [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [listData, setListData] = useState({ lists: [] });
    const token = localStorage.getItem("Token")
    const [unitofMeasurement,setunitofMeasurement] = useState('kg');
    const headers = {
        headers: {

            "Authorization":`Bearer ${token}`
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/productinfo/1/getall`,headers
            );
            setListData({lists:result.data.data.ProductDetails})
            setLoading(false);
        };
        fetchData();
    }, [])

    let options = listData.lists.map(function (city) {
        return { value: city.productCode, label: city.productCode , name:city.productName };
    })

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        try{

            const body = {productionorderCode,orderQuantity,productId,unitofMeasurement};
            const loginResponse = await axios.post("https://acl-automation.herokuapp.com/api/v1/ProductionOrderscontroller/1/create",body,headers);
            window.location.reload();

        } catch(err) {
            err.response.data.message && setErr(err.response.data.message)
        }

    };

    const  handleChange = (newValue: any, actionMeta: any) => {
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
                        <h2 className="page-header">Production Order</h2>
                            <div className="row">
                                <div className="col-6">
                                    <div className="card full-height">
                                        <div>
                                            {err ? (
                                                <Alert severity="error">
                                                    <AlertTitle>Error</AlertTitle>
                                                    {err}
                                                </Alert>
                                            ) : null}
                                        <div className="rowuser">
                                            <label>Product Code</label>
                                            <CreatableSelect
                                                options={options}
                                                className="rowuserproductivity"
                                                components={{ SingleValue}}
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
                                                        opacity : 0.5
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="rowuser">
                                            <label>Product Order no.</label>
                                            <input type="number"  placeholder="" value={productionorderCode}  onChange={(e) => setproductionorderCode(e.target.value)} />
                                        </div>
                                        <div className="rowuser">
                                            <label>Product</label>
                                            <input type="text"  placeholder="" value={name} disabled/>
                                        </div>
                                        <div className="rowuser">
                                            <label>Quantity(KG)</label>
                                            <select  value={orderQuantity} onChange={(e) => setorderQuantity(e.target.value)}>
                                                <option value=""  selected></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="12">12</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="22">22</option>
                                                <option value="25">25</option>
                                                <option value="30">30</option>
                                            </select>
                                        </div>

                                        <div id="button" className="rowuser">
                                            <button   onClick={submit}>submit</button>
                                        </div>
                                    </div>
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

export default Info