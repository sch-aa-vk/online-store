import React from 'react';
import github from 'assets/github.svg';
import rsschool from 'assets/rsschool.svg';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <a href='https://rs.school/js/'>
        <img className='footer-img' src={rsschool} alt="" />
      </a>
      <p>online store 2022</p>
      <div className="footer-links">
        <a href='https://github.com/cascadetile' className='footer-link'><img className='footer-img' src={github} alt="github logo" />cascadetile</a>
        <a href='https://github.com/sch-aa-vk' className='footer-link'><img className='footer-img' src={github} alt="github logo" />sch-aa-vk</a>
      </div>
    </footer>
  )
}