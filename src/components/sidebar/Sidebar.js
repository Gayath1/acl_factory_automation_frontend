import React,{useState} from 'react'

import { Link } from 'react-router-dom'

import './sidebar.css'



const sidebar_items = [
    {
        "display_name": "Dashboard",
        "route": "/Dashboard",
        "icon": "bx bx-category-alt"
    },
    {
        "display_name": "Admin",
        "route": "/Admin",
        "icon": "bx bx-user"
    },
    {
        "display_name": "Users",
        "route": "/Usercreate",
        "icon": "bx bx-user-pin"
    },
    {
        "display_name": "Departments",
        "route": "/Department",
        "icon": "bx bx-building"
    },
    {
        "display_name": "Factories",
        "route": "/analytics",
        "icon": "bx bxs-factory"
    },
    {
        "display_name": "Devices",
        "route": "/categories",
        "icon": "bx bx-devices"
    },
    {
        "display_name": "Product Line",
        "route": "/discount",
        "icon": "bx bx-barcode"
    },
    {
        "display_name": "settings",
        "route": "/settings",
        "icon": "bx bx-cog"
    }
]

const SidebarItem = props => {

    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const activeItem = sidebar_items.findIndex(item => item.route === window.location.pathname)

    function closeNav() {
        setIsCollapsed(true)
        document.getElementById("mySidebar").style.width = "80px";
        document.getElementById("main").style.paddingLeft = "80px";
    }

    function openNav() {
        setIsCollapsed(false)
        document.getElementById("mySidebar").style.width = "300px";
        // document.getElementById("main").style.paddingLeft = "300px";
        {window.matchMedia("(max-width: 800px)").matches?
            (document.getElementById("main").style.paddingLeft = "80px"):
            document.getElementById("main").style.paddingLeft = "300px";
        }
    }


    return (
        <div id="mySidebar" className='sidebar'>
            {isCollapsed === true ? <div className="sidebar__itemmenu">
                <button className="sidebar__item-inner"  onClick={openNav}><i className='bx bx-menu'></i></button>
            </div>:
                <div className="sidebar__itemmenu">
                    <button className="sidebar__item-inner"  onClick={closeNav}><i className='bx bx-menu'></i></button>
                </div>
            }

            <div className="sidebar__logo">
                {/*<img src={logo} alt="company logo" />*/}
            </div>
            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                        {isCollapsed === true ?
                            <SidebarItem
                                icon={item.icon}
                                active={index === activeItem}
                            />:
                            <SidebarItem
                                title={item.display_name}
                                icon={item.icon}
                                active={index === activeItem}
                            />
                        }
                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar