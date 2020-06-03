import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams, NavLink, Switch, Route } from 'react-router-dom';
import { useImmer } from 'use-immer';

import Page from './Page';
import { Button, AvatarSmall } from './common';
import StateContext from '../Context/StateContext';
import Axios from 'axios';
import ProfilePosts from './ProfilePost';

const FollowButton = styled(Button)`
  display: inline-block;
  width: 20%;
  ${(p) => getButtonColor(p)}
`;

const getButtonColor = (props) => {
  if (props.disabled) {
    return `
      background: #aaa;
    `;
  } else if (props.danger) {
    return `
      background: #E84726;
    `;
  } else {
    return `
      background: #53A573;
    `;
  }
};

const ProfileWrap = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  .profile_data {
    display: flex;
    h2 {
      margin-right: 6px;
    }
  }
`;

const FollowWrap = styled.div`
  margin-top: 10px;
  a {
    margin-right: 3px;
  }
`;

const Profile = () => {
  const { user, login } = useContext(StateContext);
  const { username } = useParams();
  const [state, setState] = useImmer({
    followActionLoding: false,
    startFollowingRequestCount: 0,
    stopFollowingRequestCount: 0,
    profileData: {
      profileUsername: '...',
      profileAvatar: 'https://gravatar.com/avatar/placeholder?s=128',
      isFollowing: false,
      counts: { postCount: '', followerCount: '', followingCount: '' },
    },
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const response = await Axios.post(`/profile/${username}`, {
          token: user.token,
          cancelToken: ourRequest.token,
        });
        setState((draft) => {
          draft.profileData = response.data;
        });
        console.log(response.data);
      } catch (error) {
        console.log('error');
      }
    };
    fetchData();
    return () => ourRequest.cancel();
  }, [username]);

  useEffect(() => {
    if (state.startFollowingRequestCount) {
      setState((draft) => {
        draft.followActionLoding = true;
      });
      const ourRequest = Axios.CancelToken.source();
      const fetchData = async () => {
        try {
          const response = await Axios.post(
            `/addFollow/${state.profileData.profileUsername}`,
            {
              token: user.token,
              cancelToken: ourRequest.token,
            }
          );
          setState((draft) => {
            (draft.profileData.isFollowing = true),
              draft.profileData.counts.followerCount++;
            draft.followActionLoding = false;
          });
        } catch (error) {
          console.log('error');
        }
      };
      fetchData();
      return () => ourRequest.cancel();
    }
  }, [state.startFollowingRequestCount]);

  useEffect(() => {
    if (state.stopFollowingRequestCount) {
      setState((draft) => {
        draft.followActionLoding = true;
      });

      const ourRequest = Axios.CancelToken.source();
      const fetchData = async () => {
        try {
          const response = await Axios.post(
            `/removeFollow/${state.profileData.profileUsername}`,
            {
              token: user.token,
              cancelToken: ourRequest.token,
            }
          );
          setState((draft) => {
            (draft.profileData.isFollowing = false),
              draft.profileData.counts.followerCount--;
            draft.followActionLoding = false;
          });
        } catch (error) {
          console.log('error');
        }
      };
      fetchData();
      return () => ourRequest.cancel();
    }
  }, [state.stopFollowingRequestCount]);

  const startFollowing = () => {
    setState((draft) => {
      draft.startFollowingRequestCount++;
    });
  };

  const stopFollowing = () => {
    setState((draft) => {
      draft.stopFollowingRequestCount++;
    });
  };

  return (
    <Page title='Profile'>
      <ProfileWrap>
        <div className='profile_data'>
          <h2>
            <AvatarSmall src={state.profileData.profileAvatar} />
            {state.profileData.profileUsername}
          </h2>
          {login &&
            !state.profileData.isFollowing &&
            user.username !== state.profileData.profileUsername &&
            state.profileData.profileUsername !== '...' && (
              <FollowButton
                disabled={state.followActionLoding}
                onClick={startFollowing}
                small
              >
                Follow <i className='fas fa-user-plus'></i>
              </FollowButton>
            )}
          {login &&
            state.profileData.isFollowing &&
            user.username !== state.profileData.profileUsername &&
            state.profileData.profileUsername !== '...' && (
              <FollowButton
                disabled={state.followActionLoding}
                onClick={stopFollowing}
                small
                danger
              >
                フォロー解除 <i className='fas fa-user-times'></i>
              </FollowButton>
            )}
        </div>
        <FollowWrap>
          <NavLink exact to={`/profile/${state.profileData.profileUsername}`}>
            ポスト: <strong>{state.profileData.counts.postCount}</strong>
          </NavLink>
          <NavLink
            to={`/profile/${state.profileData.profileUsername}/following`}
          >
            フォロー中:{' '}
            <strong>{state.profileData.counts.followingCount}</strong>
          </NavLink>
          <NavLink
            to={`/profile/${state.profileData.profileUsername}/follower`}
          >
            フォロワー:{' '}
            <strong>{state.profileData.counts.followerCount}</strong>
          </NavLink>
        </FollowWrap>
        <ProfilePosts />
      </ProfileWrap>
    </Page>
  );
};

export default Profile;
