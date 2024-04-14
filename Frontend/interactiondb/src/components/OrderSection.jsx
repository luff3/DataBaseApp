import React from 'react';
import '../styles/mainPageStyles.css'; 
import '../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../images/man-avatar.png';
import '../styles/customersTableStyles.css'; 


const OrderSection = ({ text, icon: Icon }) => { 
    const dataTable = [
        { order_id: 1, customer_id: '2', employee_id: '50', total_amount: '100', order_date: '2024-01-01'},
        { order_id: 1, customer_id: '2', employee_id: '50', total_amount: '100', order_date: '2024-01-01'},
        { order_id: 1, customer_id: '2', employee_id: '50', total_amount: '100', order_date: '2024-01-01'},
    ];
    
    return(
        <div className='content-container'>
            <div className='header-section'>
                <a className='header-text'>Orders</a>
                <div className='user-section'>
                    <div className='image-header-container'>
                        <img  src={manAvatar} alt='nike logo' className='user-pic'/> 
                    </div>
                    <div className='text-container'>
                        <a className='user-name'>Vasylko Peleshko</a>
                        <a className='user-role'>Admin</a>
                    </div>
                    <button className='log-out-button'>
                        <FiLogOut className='log-out-icon' /> {/* Замінюємо іконку на FiLogOut */}
                    </button>
                </div>
            </div>
            <div className='main-section'>
                <div className='buttons-section'>
                    <button className='buttons-add'><a className='button-text'>Add Order</a></button>
                    <button className='buttons-download'><a className='button-text'>Download</a></button>
                </div>
                <div className='table-section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '18.75%' }}>Order ID</th>
                                <th style={{ width: '18.75%' }}>Customer ID</th>
                                <th style={{ width: '18.75%' }}>Employee ID</th>
                                <th style={{ width: '18.75%' }}>Total Amount</th>
                                <th style={{ width: '25%' }}>Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTable.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{data.order_id}</td>
                                    <td>{data.customer_id}</td>
                                    <td>{data.employee_id}</td>
                                    <td>{data.total_amount}</td>
                                    <td>{data.order_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default OrderSection;



