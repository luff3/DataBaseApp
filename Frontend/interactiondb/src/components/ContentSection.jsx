import React from 'react';
import '../styles/mainPageStyles.css'; 
import '../styles/contentSectionStyles.css'
import { FiLogOut } from 'react-icons/fi'; 
import manAvatar from '../images/man-avatar.png';
import '../styles/customersTableStyles.css'; 


const ContentSection = ({ text, icon: Icon }) => { 
    const dataTable = [
        { customerId: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        { customerId: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
        // Add more data as needed
    ];
    
    return(
        <div className='content-container'>
            <div className='header-section'>
                <a className='header-text'>Customers</a>
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
                    <button className='buttons-add'><a className='button-text'>Add Customer</a></button>
                    <button className='buttons-download'><a className='button-text'>Download</a></button>
                </div>
                <div className='table-section'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>Customer ID</th>
                                <th style={{ width: '18%' }}>First Name</th>
                                <th style={{ width: '18%' }}>Last Name</th>
                                <th style={{ width: '26%' }}>Email</th>
                                <th style={{ width: '18%' }}>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTable.map((data, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{data.customerId}</td>
                                    <td>{data.firstName}</td>
                                    <td>{data.lastName}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default ContentSection;



