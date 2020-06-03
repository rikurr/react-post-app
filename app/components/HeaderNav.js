import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DispachContext from '../Context/DispatchContext';
import StateContext from '../Context/StateContext';
import ReactTooltip from 'react-tooltip';

import { Button, AvatarSmall } from './common';

const HeaderNavWrap = styled.nav``;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    margin-right: 10px;
    cursor: pointer;
  }

  .header-post {
    padding: 13px;
    background: #53a573;
    margin-right: 6px;
    border-radius: 6px;
    font-size: 1.3rem;
    a {
      margin-right: 0px;
    }
    :hover {
      opacity: 0.8;
      text-decoration: none;
    }
    color: #fff;
  }
`;

const HeaderNav = () => {
  const appDispach = useContext(DispachContext);
  const { user } = useContext(StateContext);

  const handleLogout = () => {
    appDispach({ type: 'logout' });
  };

  const handleSearchIcon = (e) => {
    e.preventDefault();
    appDispach({ type: 'openSearch' });
  };

  return (
    <HeaderNavWrap>
      <NavList>
        <li>
          <a
            data-for='search'
            data-tip='Search'
            onClick={handleSearchIcon}
            href='#'
            className='header-search-icon'
          >
            <i className='fas fa-search'></i>
          </a>
        </li>{' '}
        <ReactTooltip place='bottom' id='search' className='cutom-tooltip' />{' '}
        <li>
          <span data-for='chat' data-tip='Chat' className='header-chat-icon'>
            <i className='fas fa-comment'></i>
            <span className='chat-count-badge text-white'> </span>
          </span>
        </li>{' '}
        <ReactTooltip place='bottom' id='chat' className='cutom-tooltip' />{' '}
        <li>
          <Link
            data-for='profile'
            data-tip='Profile'
            to={`/profile/${user.username}`}
          >
            <AvatarSmall className='header-avator-small' src={user.avatar} />
          </Link>{' '}
        </li>
        <ReactTooltip place='bottom' id='profile' className='cutom-tooltip' />
        <li>
          <Link className='header-post' to='/create-post'>
            Create Post
          </Link>
        </li>
        <li>
          <Button onClick={handleLogout} logout>
            Sign Out
          </Button>
        </li>
      </NavList>
    </HeaderNavWrap>
  );
};

export default HeaderNav;
