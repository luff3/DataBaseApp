import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../styles/mainPageStyles.css'; 
import Sidebar from './Sidebar';
import ContentSection from './Customer/CustomerSection.jsx';
import ProductSection from './Product/ProductSection.jsx';
import EmployeeSection from './Employee/EmployeeSection.jsx';
import OrderSection from './OrderSection.jsx';
import OrderItemSection from './OrdetItemSection.jsx';
import StatistcSection from './Statistics/StatisticSection.jsx';
import LoginPage from './LoginPage.jsx'
import manAvatar from '../images/man-avatar.png';

const MainPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState("");

    const handleLogin = (isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
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
                            <Route path="customer" element={<ContentSection />} />
                            <Route path="product" element={<ProductSection />} />
                            <Route path="employee" element={<EmployeeSection />} />
                            <Route path="order" element={<OrderSection />} />
                            <Route path="orderitem" element={<OrderItemSection />} />
                            <Route path="statistic" element={<StatistcSection />}/>
                            </Route>
                        </Routes>
                </BrowserRouter>
        
            </div>  )}  
        </>

    );
}

export default MainPage;
