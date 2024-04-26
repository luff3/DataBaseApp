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


const StatistcSection = () => { 
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
                        <Statistic description="Total price of goods sold for the last month:" value="123204 $" /> 
                        <Statistic description="The most frequently ordered product:" value="Anime jeans #A3434" /> 
                        <Statistic description="The employee who sold the most goods:" value="Kate Smith" />     
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



