import React from 'react';
import '../styles/mainPageStyles.css'; 
import '../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../images/man-avatar.png';
import '../styles/customersTableStyles.css'; 


const OrderItemSection = ({ text, icon: Icon }) => { 
    const dataTable = [
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},
        { order_item_id: 1, order_id: '2', product_id: '50'},

    ];
    
    return(
        <div className='content-container'>
            <div className='header-section'>
                <a className='header-text'>OrderItems</a>
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
                    <button className='buttons-add'><a className='button-text'>Add OrderItem</a></button>
                    <button className='buttons-download'><a className='button-text'>Download</a></button>
                </div>
                <div className='table-section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '33.33%' }}>OrderItem ID</th>
                                <th style={{ width: '33.33%' }}>Order ID</th>
                                <th style={{ width: '33.33%' }}>Product ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTable.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{data.order_item_id}</td>
                                    <td>{data.order_id}</td>
                                    <td>{data.product_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default OrderItemSection;



