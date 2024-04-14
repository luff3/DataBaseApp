import React from 'react';
import '../styles/optionStyles.css'; 

const Option = ({ text, icon: Icon, isActive, onClick }) => { 
    return(
        <div className={`option-button ${isActive ? 'active' : ''}`} onClick={onClick}>
            {Icon && <Icon className="option-icon" />} 
            <a className="option-text">{text}</a>
        </div>
    )
}

export default Option;
