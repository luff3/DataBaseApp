import React, { useState } from 'react';
import '../styles/pagination.css'; 

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [activePage, setActivePage] = useState(1);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <button 
            key={number} 
            onClick={() => {
              paginate(number);
              setActivePage(number);
            }} 
            className={number === activePage ? 'page-item active' : 'page-item'}
          >
            <a className='page-link'>
              {number}
            </a>
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
