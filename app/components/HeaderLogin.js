import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Button, Input } from './common';
import Axios from 'axios';
import DispachContext from '../Context/DispatchContext';

const HeaderForm = styled.form`
  display: flex;
  input {
    margin-right: 4px;
  }
`;

const HeaderLogin = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const appDispach = useContext(DispachContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/login', {
        username,
        password,
      });
      if (response.data) {
        appDispach({ type: 'login', payload: response.data });
        appDispach({type: 'flashMessage', payload: 'ログインしました'})
      } else {
        alert('失敗');
      }
      setUsername('');
      setPassword('');
    } catch (error) {
      alert(response.data);
    }
  };
  return (
    <>
      <HeaderForm onSubmit={handleSubmit}>
        <div>
          <Input small
            onChange={(e) => setUsername(e.target.value)}
            name='username'
            type='text'
            placeholder='ユーザーネーム'
            autoComplete='off'
          />
        </div>
        <div>
          <Input small
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            type='password'
            placeholder='パスワード'
          />
        </div>
        <div>
          <Button>ログイン</Button>
        </div>
      </HeaderForm>
    </>
  );
};

export default HeaderLogin;
