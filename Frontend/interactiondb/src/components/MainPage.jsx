import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../styles/mainPageStyles.css'; 
import Sidebar from './Sidebar';
import ContentSection from './Customer/CustomerSection.jsx';
import ProductSection from './Product/ProductSection.jsx';
import EmployeeSection from './Employee/EmployeeSection.jsx';
import OrderSection from './Order/OrderSection.jsx';
import OrderItemSection from './OrderItem/OrdetItemSection.jsx';
import StatistcSection from './Statistics/StatisticSection.jsx';
import LoginPage from './LoginPage.jsx'
import ProductSpecificSection from './ProductSpecific/ProsuctSpecificSection.jsx';
import manAvatar from '../images/man-avatar.png';

const MainPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState("");
    const [username, setUsername] = useState("");

    const handleLogin = (isAuthenticated, username) => {
        setIsAuthenticated(isAuthenticated);
        setUsername(username);
    };
    
    return(
        <>
            {!isAuthenticated ? (
                    <LoginPage onLogin={handleLogin} />
            ) : ( 
            <div className='main-container'>
                <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Sidebar />}>
                            <Route path="customer" element={<ContentSection username={username}/>} />
                            <Route path="product" element={<ProductSection  username={username}/>} />
                            <Route path="employee" element={<EmployeeSection username={username}/>} />
                            <Route path="order" element={<OrderSection username={username}/>} />
                            <Route path="orderitem" element={<OrderItemSection username={username}/>} />
                            <Route path="prodSpec" element={<ProductSpecificSection username={username}/>}/>
                            <Route path="statistic" element={<StatistcSection username={username}/>}/>
                            </Route>
                        </Routes>
                </BrowserRouter>
        
            </div>  )}  
        </>

    );
}

export default MainPage;
