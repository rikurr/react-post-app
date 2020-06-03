import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderLogin from './HeaderLogin';
import HeaderNav from './HeaderNav';
import StateContext from '../Context/StateContext';

const HeaderWrap = styled.header`
  background: #fff;
  height: 66px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const HeaderInner = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const HeaderLogo = styled.h2`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 2.8rem;
  a {
    color: #e84726;
  }
  a:hover {
    text-decoration: none;
    color: #e84726;
    opacity: 0.8;
  }
`;

const Header = () => {
  const { login } = useContext(StateContext);
  return (
    <HeaderWrap>
      <HeaderInner>
        <HeaderLogo>
          <Link to='/'>vixoa</Link>
        </HeaderLogo>
        {login ? <HeaderNav /> : <HeaderLogin />}
      </HeaderInner>
    </HeaderWrap>
  );
};

export default Header;
