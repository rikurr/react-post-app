import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useParams, Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import ReactMarkdown from 'react-markdown';
import ReactTooltip from 'react-tooltip';

import Page from './Page';
import { LoadingIcon } from './common/index';
import NotFound from './NotFound';
import StateContext from '../Context/StateContext';
import DispatchContext from '../Context/DispatchContext';

const PostTop = styled.div`
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 4.5rem;
  }
  .fa-edit {
    color: #53a573;
  }
  .fa-trash {
    color: #f71e1e;
  }
`;

const PostInfo = styled.div`
  margin-top: 20px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .name-link {
    color: #e84726;
  }
`;
const PostLayout = styled.div`
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const PostContent = styled.div`
  margin-top: 60px;
  p {
    font-size: 2.2rem;
  }
`;
const ViewSinglePost = ({ history }) => {
  const [isLoading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPost = async () => {
      try {
        const response = await Axios.get(`/post/${id}`, {
          cancelToken: ourRequest.token,
        });
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.log('リクエストキャンセル');
      }
    };
    fetchPost();
    return () => ourRequest.cancel();
  }, [id]);

  if (!isLoading && !post) {
    return <NotFound />;
  }

  if (isLoading)
    return (
      <Page title='...'>
        <LoadingIcon />
      </Page>
    );

  const date = new Date(post.createdDate);
  const dateFormatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  const isOwner = () => {
    if (appState.login) {
      return appState.user.username == post.author.username;
    }
    return false;
  };

  const deleteHandler = async () => {
    const confirm = window.confirm('ポストを削除しますか？');
    if (confirm) {
      try {
        const response = await Axios.delete(`/post/${id}`, {
          data: { token: appState.user.token },
        });
        if (response.data == 'Success') {
          appDispatch({ type: 'flashMessage', payload: '投稿を削除しました' });
          history.push(`/profile/${appState.user.username}`);
        }
      } catch (error) {
        console.log('error');
      }
    }
  };

  return (
    <Page title={post.title}>
      <PostLayout>
        <PostTop>
          <h1>{post.title}</h1>
          {isOwner() && (
            <span>
              <Link to={`/post/${id}/edit`} data-tip='Edit' data-for='edit'>
                <i className='fas fa-edit'></i>
              </Link>
              <ReactTooltip id='edit' className='custom-tooltip' />{' '}
              <a onClick={deleteHandler} data-tip='Delete' data-for='delete'>
                <i className='fas fa-trash'></i>
              </a>
              <ReactTooltip id='delete' className='custom-tooltip' />
            </span>
          )}
        </PostTop>
        <PostInfo>
          <p>
            <Link to={`/profile/${post.author.username}`}>
              <img className='avatar-tiny' src={post.author.avatar} />{' '}
            </Link>
            作成者{' '}
            <Link
              href='#'
              to={`/profile/${post.author.username}`}
              className='name-link'
            >
              {post.author.username}
            </Link>{' '}
            {dateFormatted}
          </p>
        </PostInfo>
        <PostContent>
          <ReactMarkdown
            source={post.body}
            allowedTypes={[
              'paragraph',
              'strong',
              'emphasis',
              'text',
              'heading',
              'list',
              'listItem',
            ]}
          />
        </PostContent>
      </PostLayout>
    </Page>
  );
};

export default withRouter(ViewSinglePost);
