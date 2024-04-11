import React from 'react';
import '../styles/customersTableStyles.css'; 


const CustomersTable = ({ dataTable }) => {
    return (
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
    );
}

export default CustomersTable;