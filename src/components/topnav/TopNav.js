import React,{useContext} from 'react'

import './topnav.css'

import { Link } from 'react-router-dom'
import UserContext from '../../userContext';
import Dropdown from '../dropdown/Dropdown'

// import user_image from '../../assets/images/tuat.png'

const notifications = [
    {
        "icon": "bx bx-error",
        "content": "Curabitur id eros quis nunc suscipit blandit"
    },
    {
        "icon": "bx bx-package",
        "content": "Duis malesuada justo eu sapien elementum, in semper diam posuere"
    },
    {
        "icon": "bx bx-cart",
        "content": "Donec at nisi sit amet tortor commodo porttitor pretium a erat"
    },
    {
        "icon": "bx bx-error",
        "content": "In gravida mauris et nisi"
    },
    {
        "icon": "bx bx-cart",
        "content": "Curabitur id eros quis nunc suscipit blandit"
    }
]

const user_menu = [
    {
        "icon": "bx bx-user",
        "content": "Profile"
    },
    {
        "icon": "bx bx-wallet-alt",
        "content": "My Wallet"
    },
    {
        "icon": "bx bx-cog",
        "content": "Settings"
    },
    {
        "icon": "bx bx-log-out-circle bx-rotate-180",
        "onClick":ClearLocalStorage,
        "route": "/Home",
        "content": "Logout"
    }
]

const curr_user = {
    display_name: 'Tuat Tran',
    // image: user_image
}


function ClearLocalStorage(){
    localStorage.clear();
}

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu =(item, index) => (
    <Link to={item.route} key={index}>
        <div className="notification-item" onClick={item.onClick}>
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Topnav = () => {

    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/'>View All</Link>}
                    />
                    {/* dropdown here */}
                </div>
            </div>
        </div>
    )
}

export default Topnav