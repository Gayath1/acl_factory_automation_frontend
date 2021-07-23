import React, {useContext, useEffect, useState} from 'react';
import "../assets/css/Usercreate.css";
import "../assets/css/buttonchoose.css";
import "../assets/css/filter.css";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CreatableSelect from 'react-select/creatable';
import UserContext from "../userContext";


function createData(name,empty) {
    return { name,empty};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


const Device = () => {
    const classes = useStyles();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const {userData} = useContext(UserContext);


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

    function closeNav() {
        setIsCollapsed(true)
        //document.getElementById("myfilter").style.height = "100px";
    }

    function openNav() {
        setIsCollapsed(false)
        //document.getElementById("myfilter").style.height = "500px";
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
                        <div className="col-6">
                            <div className="card full-height">
                                <div>
                               
                                <div className="rowuser">
                                    <label>Production Order No</label>
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
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            {isCollapsed === false ?
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
                                                onInputChange={handleInputChange}
                                                styles={customStyles}
                                                placeholder=""

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
                                            <button>submit</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div id="myfilter" className="filter-modal__wrapper">
                                    <div className="filter-modal__actions button">
                                        <button onClick={openNav}>x</button>
                                    </div>
                                </div>
                            }
                        </div>
                        </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="card full-height">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Type</TableCell>
                                                <TableCell align="center">UUID</TableCell>
                                                
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="center">{row.empty}</TableCell>
                                                   
                                                    <TableCell align="center"><button className="usertblbutton"  onClick={handleSubmit}>Delete</button></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
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