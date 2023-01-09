import React from 'react';
import { Link } from 'react-router-dom';

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
      <a href='https://github.com/cascadetile/online-store/tree/exp-branch'><img className='footer-img' src={github} alt="github logo" /></a>
    </footer>
  )
}