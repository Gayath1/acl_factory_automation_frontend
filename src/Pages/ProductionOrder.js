import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import { makeStyles } from '@material-ui/core/styles';
import CreatableSelect from 'react-select/creatable';
import UserContext from "../userContext";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import {css} from "@emotion/css";



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


const Device = () => {
    const classes = useStyles();
    const {userData} = useContext(UserContext);
    const [porder, setPorder] = useState("");
    const [operator, setOperator] = useState("");
    const [productionorderCode,setproductionorderCode] = useState('');


    function handleSubmit(event) {
        event.preventDefault();
    }


    const  handleChange = (newValue: any, actionMeta: any) => {
        console.group('Value Changed');
        console.log(newValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
      };
      const handleInputChange = (inputValue: any, actionMeta: any) => {
        console.group('Input Changed');
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
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


    return (
        <>
            {userData.role === 70? (
        <>
            <Sidebar/>
            <div id="main" className="layout__content">
                <TopNav/>
                <div className="layout__content-main">
                    <h2 className="page-header">Product Order</h2>
                    <div className="row">
                        <div className="col-6">
                            <div className="card full-height">
                                <div>
                                <div className="rowuser">
                                        <label>Product Order</label>
                                        <select id="shift" name="department">
                                            <option value=""  selected></option>
                                            <option value="morning">Night</option>
                                            <option value="night">Morning</option>
                                        </select>
                                    </div>
                               <div className="rowuser">
                                   <label>Product</label>
                                   <CreatableSelect
                                       className="rowuserproductivity"
                                       components={{ SingleValue}}
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
                                               opacity : 0.5
                                           })
                                       }}
                                   />
                                             </div>
                                

                                    <div className="rowuser">
                                        <label>Operator</label>
                                        <input type="text"  placeholder="" value={operator}  onChange={(e) => setOperator(e.target.value)} />
                                    </div>

                               


                                    <div id="button" className="rowuser">
                                        <button   onClick={handleSubmit}>submit</button>
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

export default Device