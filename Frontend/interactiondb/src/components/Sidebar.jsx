import React from 'react';
import '../styles/sidebar.css'; 
import { FaUserFriends, FaUserTie, FaShoppingCart, FaBoxOpen, FaCube } from 'react-icons/fa';
import logoPic from '../images/nike.png';
import Option from './Option';
import { Link,  Outlet } from 'react-router-dom';

const Sidebar = ({ text, icon: Icon }) => { 
    return(
        <div className='sidebar-container'>
            <div className='image-container'>
                <img src={logoPic} alt='nike logo' className='logo'/> 
            </div>
            <div className='options-section'>
            <Link to="/customer">
                <Option text="Customers" icon={FaUserFriends} isFirst={true}></Option> 
            </Link>
            <Link to="/product">
                <Option text="Products" icon={FaCube}></Option> 
            </Link>
            <Link to="/employee">
                <Option text="Employees" icon={FaUserTie}></Option>
            </Link>
            <Link to="/order">
                <Option text="Orders" icon={FaShoppingCart}></Option>
            </Link>
            <Link to="/orderitem">
                <Option text="Order Items" icon={FaBoxOpen}></Option>
            </Link>
            </div>
            <Outlet />
        </div>
    )
}


export default Sidebar;