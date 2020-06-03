import React, { useState } from 'react';
import styled from 'styled-components';
import Page from './Page';
import Axios from 'axios';
import { Button, Input } from './common';

const HomeWrap = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Form = styled.form`
  width: 40%;
  div {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const HomeTitle = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const HomeGuest = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post('/register', {
        username,
        email,
        password,
      });
      console.log('作成');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log('失敗');
      console.log(error.response.data);
    }
  };
  return (
    <Page wide={true} title='Top'>
      <HomeWrap>
        <HomeTitle>
          <h1>Remember Writing?</h1>
          <p>
            Are you sick of short tweets and impersonal &ldquo;shared&rdquo;
            posts that are reminiscent of the late 90&rsquo;s email forwards? We
            believe getting back to actually writing is the key to enjoying the
            internet again.
          </p>
        </HomeTitle>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              small
              onChange={(e) => setUsername(e.target.value)}
              id='username-register'
              name='username'
              type='text'
              placeholder='ユーザーネーム'
              autoComplete='off'
            />
          </div>
          <div>
            <Input
              small
              onChange={(e) => setEmail(e.target.value)}
              id='email-register'
              name='email'
              type='text'
              placeholder='you@example.com'
              autoComplete='off'
            />
          </div>
          <div>
            <Input
              small
              onChange={(e) => setPassword(e.target.value)}
              id='password-register'
              name='password'
              type='password'
              placeholder='パスワードを作成'
            />
          </div>
          <div>
            <Button type='submit'>アカウント作成</Button>
          </div>
        </Form>
      </HomeWrap>
    </Page>
  );
};

export default HomeGuest;
