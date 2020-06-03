import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterWrap = styled.footer`
  padding-top: 20px;
  border-top: 1px solid #aaa;
  margin: 0 auto;
  margin: 80px 0;
  width: 100%;
  p {
    text-align: center;
  }

  a {
    color: #e84726;
  }
  a:hover {
    opacity: 0.8;
    color: #e84726;
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterWrap>
      <p>
        <Link to='/'>
          Home
        </Link>{' '}
        |
        <Link to='/about-us'>
          About Us
        </Link>{' '}
        |
        <Link to='/terms'>
          Terms
        </Link>
      </p>
      <p>
        Copyright &copy; 2020{' '}
        <Link to='/'>
          vixoa
        </Link>
        . All rights reserved.
      </p>
    </FooterWrap>
  );
};

export default Footer;
