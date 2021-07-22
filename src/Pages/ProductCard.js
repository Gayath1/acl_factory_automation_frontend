import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import CreatableSelect from 'react-select/creatable';
import UserContext from "../userContext";





const Info = () => {

    const {userData} = useContext(UserContext);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [quantity, setQuantity] = useState("");




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
    

    return (
        <>
            {userData.role === 70? (
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
                                        <div className="rowuser">
                                            <label>Product</label>
                                            <CreatableSelect
                                            className="rowuserproductivity"
                                            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}r
                                            isClearable
                                            onChange={handleChange}
                                            onInputChange={handleInputChange}
                                            styles={customStyles}
                                            placeholder=""
                                            />
                                        </div>
                                        <div className="rowuser">
                                            <label>Produc Order NO.</label>
                                            <input type="text" autoFocus placeholder="" value={code}  onChange={(e) => setCode(e.target.value)} />
                                        </div>
                                        <div className="rowuser">
                                            <label>Product Code</label>
                                            <input type="text" autoFocus placeholder="" value={name}  onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="rowuser">
                                            <label>Quantity</label>
                                            <input type="text" autoFocus placeholder="50" value={quantity}  onChange={(e) => setQuantity(e.target.value)}  disabled/>
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

export default Info