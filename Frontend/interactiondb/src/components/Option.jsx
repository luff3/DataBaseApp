import React from 'react';
import '../styles/optionStyles.css'; 


const Option = ({ text, icon: Icon }) => { 
    return(
        <div className='option-button'>
            {Icon && <Icon className="option-icon" />} 
            <a className="option-text">{text}</a>
        </div>
    )
}


export default Option;