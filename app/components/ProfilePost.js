import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { AvatarSmall } from './common/index';
import Axios from 'axios';
import { LoadingIcon } from './common';

export const PostList = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    padding: 20px 0;
    border-top: 1px solid #dddddd;
    display: flex;
    h2 {
      font-size: 1.8rem;
      color: #333;
    }
    span {
      font-size: 1.4rem;
    }
  }
  li:last-child {
    border-bottom: 1px solid #dddddd;
  }
`;
const PostContent = styled.div`
  display: flex;
`;

const ProfilePosts = () => {
  const [isLoading, setLoading] = useState(true);
  const { username } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchPosts = async () => {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, {
          cancelToken: ourRequest.token,
        });
        setPosts(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log('not, post');
      }
    };
    fetchPosts();
    return () => ourRequest.cancel();
  }, [username]);

  if (isLoading) return <LoadingIcon />;
  return (
    <PostList>
      {posts.map((post) => {
        const date = new Date(post.createdDate);
        const dateFormatted = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
        return (
          <li key={post._id}>
            <Link to={`/post/${post._id}`}>
              <PostContent>
                <div>
                  <AvatarSmall src={post.author.avatar} alt='sss' />{' '}
                </div>
                <div>
                  <h2>{post.title}</h2> <span>on {dateFormatted} </span>
                </div>
              </PostContent>
            </Link>
          </li>
        );
      })}
    </PostList>
  );
};

export default ProfilePosts;
