import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Page from './Page';
import { useImmerReducer } from 'use-immer';
import { useParams, Link, withRouter } from 'react-router-dom';
import Axios from 'axios';

import { Button, Input, TextArea, PostForm, LoadingIcon } from './common';
import StateContext from '../Context/StateContext';
import DispatchContext from '../Context/DispatchContext';
import NotFound from './NotFound';

const LiveValidateMessage = styled.p`
  z-index: 1;
  padding: 5px;
  border-radius: 4px;
  color: #e65661;
  background: #faaaaa;
`;

const EditPost = ({history}) => {
  const { user } = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const initialState = {
    title: {
      value: '',
      hasErrors: false,
      message: '',
    },
    body: {
      value: '',
      hasErrors: false,
      message: '',
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0,
  };
  const immerReducer = (draft, action) => {
    switch (action.type) {
      case 'fetchComplete':
        draft.title.value = action.payload.title;
        draft.body.value = action.payload.body;
        draft.isFetching = false;
        return;
      case 'titleChange':
        draft.title.hasErrors = false;
        draft.title.value = action.payload;
        return;
      case 'bodyChange':
        draft.body.hasErrors = false;
        draft.body.value = action.payload;
        return;
      case 'submitRequest':
        if (!draft.title.hasErrors && !draft.body.hasErrors) {
          draft.sendCount++;
        }
        return;
      case 'saveRequestStarted':
        draft.isSaving = true;
        return;
      case 'saveRequestFinished':
        draft.isSaving = false;
        return;
      case 'titleRules':
        if (!action.payload.trim()) {
          draft.title.hasErrors = true;
          draft.title.message = 'タイトルが空白です。';
        }
        return;
      case 'bodyRules':
        if (!action.payload.trim()) {
          draft.body.hasErrors = true;
          draft.body.message = 'ポスト内容が空白です。';
        }
        return;
      case 'notFound':
        draft.notFound = true;
    }
  };

  const [state, dispatch] = useImmerReducer(immerReducer, initialState);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: 'titleRules', payload: state.title.value });
    dispatch({ type: 'bodyRules', payload: state.body.value });
    dispatch({ type: 'submitRequest' });
  };

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get(`/post/${state.id}`, {
          cancelToken: ourRequest.token,
        });
        if (response.data) {
          dispatch({
            type: 'fetchComplete',
            payload: response.data,
          });
          if (user.username != response.data.author.username) {
            appDispatch({ type: 'flashMessage', payload: '投稿を編集する権限はありません' })
            history.push('/')
          }
        } else {
          dispatch({ type: 'notFound' });
        }
      } catch (error) {
        console.log('リクエストキャンセル');
      }
    };
    fetchPost();
    return () => ourRequest.cancel();
  }, []);

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: 'saveRequestStarted' });
      const ourRequest = Axios.CancelToken.source();
      const fetchPost = async () => {
        try {
          await Axios.post(
            `/post/${state.id}/edit`,
            {
              title: state.title.value,
              body: state.body.value,
              token: user.token,
            },
            {
              cancelToken: ourRequest.token,
            }
          );
          dispatch({ type: 'saveRequestFinished' });
          appDispatch({
            type: 'flashMessage',
            payload: 'ポストを更新しました。',
          });
        } catch (error) {
          console.log('リクエストキャンセル');
        }
      };
      fetchPost();
      return () => ourRequest.cancel();
    }
  }, [state.sendCount]);

  if (state.notFound) {
    return <NotFound />;
  }

  if (state.isFetching)
    return (
      <Page title='...'>
        <LoadingIcon />
      </Page>
    );

  return (
    <Page title='Edit Post'>
      <Link to={`/post/${state.id}`}>&laquo; 戻る</Link>
      <PostForm onSubmit={submitHandler}>
        <div>
          <label>
            <p>タイトル</p>
          </label>
          {state.title.hasErrors && (
            <LiveValidateMessage>{state.title.message}</LiveValidateMessage>
          )}
          <Input
            onBlur={(e) =>
              dispatch({ type: 'titleRules', payload: e.target.value })
            }
            onChange={(e) =>
              dispatch({ type: 'titleChange', payload: e.target.value })
            }
            name='title'
            value={state.title.value}
            autoFocus
            name='title'
            type='text'
            placeholder=''
            autocomplete='off'
          />
        </div>
        <div>
          <label>
            <p>内容</p>
          </label>
          {state.body.hasErrors && (
            <LiveValidateMessage>
              タイトルを修正してください
            </LiveValidateMessage>
          )}
          <TextArea
            onBlur={(e) =>
              dispatch({ type: 'bodyRules', payload: e.target.value })
            }
            onChange={(e) =>
              dispatch({ type: 'bodyChange', payload: e.target.value })
            }
            name='body'
            value={state.body.value}
            type='text'
          />
        </div>
        <div>
          <Button small={true} disabled={state.isSaving}>
            更新
          </Button>
        </div>
      </PostForm>
    </Page>
  );
};

export default withRouter(EditPost);
