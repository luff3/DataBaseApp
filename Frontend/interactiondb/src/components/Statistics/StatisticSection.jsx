import React, { useState, useEffect } from 'react';
import '../../styles/mainPageStyles.css'; 
import '../../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../../images/man-avatar.png';
import '../../styles/customersTableStyles.css'; 
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash   } from '@fortawesome/free-solid-svg-icons';
import Statistic from './Statistic';
import AmountChart from './AmountChart';
import { getTotalForLastMonth, getMostPopularClothes, getTopEmployee, getStatistic} from '../../services/statisticServices.js'


const StatistcSection = () => { 
    const [totalPrice, setTotalPrice] = useState('');
    const [mostFrequentProduct, setMostFrequentProduct] = useState('');
    const [topSellingEmployee, setTopSellingEmployee] = useState('');

    useEffect(()=>{
        getTotalPriceForLastMonth();
        getMostPopularPurchase();
        getTopSellEmployee();
        getStatistic();
    },[])
    
    const getTotalPriceForLastMonth = () => {
        getTotalForLastMonth()
        .then((data) => {
            let price= data.TotalSalesForLastMonth;
            setTotalPrice(`${price}$`);
            console.log(data.TotalSalesForLastMonth);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    const getMostPopularPurchase = () => {
        getMostPopularClothes()
        .then((data) => {
            let purchase= data.MostPurchasedProduct;
            setMostFrequentProduct(`${purchase}`);
            console.log(data.MostPurchasedProduct);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
    const getTopSellEmployee = () => {
        getTopEmployee()
        .then((data) => {
            let employee= data.TopSellingEmployee;
            setTopSellingEmployee(`${employee}`);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    

    return(
        <div className='content-container'>
            <ToastContainer />
            <div className='header-section'>
                <a className='header-text'>Statistics</a>
                <div className='user-section'>
                    <div className='image-header-container'>
                        <img  src={manAvatar} alt='nike logo' className='user-pic'/> 
                    </div>
                    <div className='text-container'>
                        <a className='user-name'>Vasylko Peleshko</a>
                        <a className='user-role'>Admin</a>
                    </div>
                    <button className='log-out-button'>
                        <FiLogOut className='log-out-icon' /> 
                    </button>
                </div>
            </div>
            <div className='main-section'>
                <div className='statistic-container'>
                    <div className='head-statistics-container'>
                        <Statistic description="Total price of goods sold for the last month:" value={totalPrice} /> 
                        <Statistic description="The most frequently ordered product:" value={mostFrequentProduct} /> 
                        <Statistic description="The employee who sold the most goods:" value={topSellingEmployee} />     
                    </div>
                </div>
                <div className='chart-section'>
                    <a className='diagram-head-text'>Order flow diagram</a>
                    <div className='chart-container'>
                        <AmountChart/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatistcSection;



