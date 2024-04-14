import React from 'react';
import '../styles/mainPageStyles.css'; 
import Sidebar from './Sidebar';
import ContentSection from './ContentSection';


const MainPage = () => {
    return(
        <div className='main-container'>
            <Sidebar></Sidebar>
             <ContentSection></ContentSection>
        </div>
    );
}

export default MainPage;
