import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Page from './Page';
import { Button, Input, TextArea, PostForm } from './common';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import DispachContext from '../Context/DispatchContext';
import StateContext from '../Context/StateContext';

const CreatePost = ({ history }) => {
  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  const appDispach = useContext(DispachContext);
  const { user } = useContext(StateContext);

  const { title, body } = post;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/create-post', {
        title,
        body,
        token: user.token,
      });
      appDispach({
        type: 'flashMessage',
        payload: '新しいポストを作成しました。',
      });
      setPost({
        title: '',
        body: '',
      });
      history.push(`/post/${response.data}`);
    } catch (error) {
      console.log('作成失敗');
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPost({ ...post, [name]: value });
  };
  return (
    <Page title='Create Post'>
      <PostForm onSubmit={handleSubmit}>
        <div>
          <label>
            <p>タイトル</p>
          </label>
          <Input
            name='title'
            value={title}
            onChange={handleChange}
            autoFocus
            name='title'
            id='post-title'
            type='text'
            placeholder=''
            autocomplete='off'
          />
        </div>
        <div>
          <label>
            <p>内容</p>
          </label>
          <TextArea
            name='body'
            value={body}
            onChange={handleChange}
            id='post-body'
            type='text'
          ></TextArea>
        </div>
        <div>
          <Button small={true}>作成</Button>
        </div>
      </PostForm>
    </Page>
  );
};

export default withRouter(CreatePost);
