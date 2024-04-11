import React from 'react';
import '../styles/sidebar.css'; 
import { FaUserFriends, FaUserTie, FaShoppingCart, FaBoxOpen, FaCube } from 'react-icons/fa';
import logoPic from '../images/nike.png';
import Option from './Option';

const Sidebar = ({ text, icon: Icon }) => { 
    return(
        <div className='sidebar-container'>
            <div className='image-container'>
                <img src={logoPic} alt='nike logo' className='logo'/> 
            </div>
            <div className='options-section'>
                <Option text="Customers" icon={FaUserFriends} isFirst={true}></Option> 
                <Option text="Employees" icon={FaUserTie}></Option>
                <Option text="Orders" icon={FaShoppingCart}></Option>
                <Option text="Order Items" icon={FaBoxOpen}></Option>
                <Option text="Products" icon={FaCube}></Option> 
            </div>
        </div>
    )
}


export default Sidebar;