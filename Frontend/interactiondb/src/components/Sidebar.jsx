import React, { useState } from 'react';
import '../styles/sidebar.css'; 
import { FaUserFriends, FaUserTie, FaShoppingCart, FaBoxOpen, FaCube, FaChartBar, FaTshirt } from 'react-icons/fa';
import logoPic from '../images/nike.png';
import Option from './Option';
import { Link,  Outlet, useLocation } from 'react-router-dom';

const Sidebar = ({ text, icon: Icon }) => { 
    const location = useLocation();
    const [activeOption, setActiveOption] = useState(location.pathname);

    return(
        <div className='sidebar-container'>
            <div className='image-container'>
                <img src={logoPic} alt='nike logo' className='logo'/> 
            </div>
            <div className='options-section'>
                <Link to="/customer" className="option-link">
                    <Option text="Customers" icon={FaUserFriends} isActive={activeOption === '/customer'} onClick={() => setActiveOption('/customer')} isFirst={true}></Option> 
                </Link>
                <Link to="/product" className="option-link">
                    <Option text="Products" icon={FaCube} isActive={activeOption === '/product'} onClick={() => setActiveOption('/product')}></Option> 
                </Link>
                <Link to="/employee" className="option-link">
                    <Option text="Employees" icon={FaUserTie} isActive={activeOption === '/employee'} onClick={() => setActiveOption('/employee')}></Option>
                </Link>
                <Link to="/order" className="option-link">
                    <Option text="Orders" icon={FaShoppingCart} isActive={activeOption === '/order'} onClick={() => setActiveOption('/order')}></Option>
                </Link>
                <Link to="/orderitem" className="option-link">
                    <Option text="Order Items" icon={FaBoxOpen} isActive={activeOption === '/orderitem'} onClick={() => setActiveOption('/orderitem')}></Option>
                </Link>
                <Link to="/prodSpec" className="option-link">
                    <Option text="Product Specific" icon={FaTshirt} isActive={activeOption === '/prodSpec'} onClick={() => setActiveOption('/prodSpec')}></Option>
                </Link>
                <Link to="/statistic" className="option-link">
                    <Option text="Statistics" icon={FaChartBar} isActive={activeOption === '/statistic'} onClick={() => setActiveOption('/statistic')}></Option>
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Sidebar;
