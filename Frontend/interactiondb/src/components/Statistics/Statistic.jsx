import React from 'react';
import '../../styles/statisticStyles.css'; 

const Statistic = ({ description, value }) => {
    return (
        <div className='statistic'>
            <a className='statisctic-description'>{description}</a>
            <a className='statistic-value'>{value}</a>
        </div>
    );
}

export default Statistic;