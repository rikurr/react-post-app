import React, { useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import DispachContext from '../Context/DispatchContext';
import { useImmer } from 'use-immer';
import { Input, Spinner, AvatarSmall } from './common';
import Axios from 'axios';
import { PostList } from './ProfilePost';

const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(215, 215, 215, 0.911);
  ${({ state }) =>
    state === 'exited' || state === 'exiting'
      ? css`
          opacity: 0;
          transform: scale(1.3);
        `
      : css`
          opacity: 1;
          transform: scale(1);
          transition: 0.33s visibility ease-in-out, 0.33s opacity ease-in-out,
            0.33s transform ease-in-out;
        `}
  ${({ state }) =>
    state === 'entering' || state === 'entered'
      ? css`
          opacity: 1;
          transform: scale(1);
        `
      : css`
          opacity: 0;
          transform: scale(1.3);
          transition: 0.33s visibility ease-in-out, 0.33s opacity ease-in-out,
            0.33s transform ease-in-out;
        `}
`;

const SearchOverlay = styled.div`
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  min-height: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  justify-content: center;
  width: 100%;
  .search-overlay-icon {
    color: #53a573;
    font-size: 2.2rem;
    margin: 0;
    margin-right: 10px;
    cursor: pointer;
  }
  .close-live-search {
    font-size: 2.2rem;
    margin: 0;
    cursor: pointer;
  }

  .live-search-field {
    padding: 8px 16px;
    outline: none;
    font-size: 1.7rem;
    margin-right: 10px;
    width: 30%;
  }
`;

const SearchOverlayBottom = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  margin-top: 20px;
  overflow-y: scroll;
  .search-result {
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    strong {
      font-size: 1.9rem;
    }
  }
`;

const LiveSearchResult = styled.div`
  opacity: ${(p) => (p.show === 'results' ? 1 : 0)};
  transition: all 0.3s ease-out;
  transform: ${(p) => (p.show === 'results' ? 'scale(1)' : 'scale(0.7)')};
  background: #fff;
  padding: 40px;
`;

const Search = ({ cssState }) => {
  const appDispatch = useContext(DispachContext);

  const [state, setState] = useImmer({
    searchTerm: '',
    results: [],
    show: 'neither',
    requestCount: 0,
  });

  useEffect(() => {
    document.addEventListener('keyup', searchKeyPressHandler);
    return () => document.removeEventListener('keyup', searchKeyPressHandler);
  }, []);

  useEffect(() => {
    if (state.searchTerm.trim()) {
      setState((draft) => {
        draft.show = 'loading';
      });
      const delay = setTimeout(() => {
        setState((draft) => {
          draft.requestCount++;
        });
      }, 750);
      return () => clearTimeout(delay);
    } else {
      setState((draft) => {
        draft.show = 'neither';
      });
    }
  }, [state.searchTerm]);

  useEffect(() => {
    if (state.requestCount) {
      const ourRequest = Axios.CancelToken.source();
      const fetchResults = async () => {
        try {
          const response = await Axios.post(
            '/search',
            { searchTerm: state.searchTerm },
            { cancelToken: ourRequest.token }
          );
          setState((draft) => {
            draft.results = response.data;
            draft.show = 'results';
          });
          console.log('成功');
        } catch (error) {
          console.log('リクエストがキャンセルされました');
        }
      };
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, [state.requestCount]);

  const searchKeyPressHandler = (e) => {
    if (e.keyCode == 27) {
      appDispatch({ type: 'closeSearch' });
    }
  };

  const handleCloseIcon = () => {
    appDispatch({
      type: 'closeSearch',
    });
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setState((draft) => {
      draft.searchTerm = value;
    });
  };
  return (
    <SearchWrap state={cssState}>
      <SearchOverlay>
        <label htmlFor='live-search-field' className='search-overlay-icon'>
          <i className='fas fa-search'></i>
        </label>
        <Input
          onChange={handleInput}
          autoFocus
          type='text'
          autoComplete='off'
          id='live-search-field'
          className='live-search-field'
          placeholder='キーワードを検索'
        />
        <span onClick={handleCloseIcon} className='close-live-search'>
          <i className='fas fa-times-circle'></i>
        </span>
      </SearchOverlay>

      <SearchOverlayBottom>
        <Spinner show={state.show} />
        <LiveSearchResult show={state.show}>
          {Boolean(state.results.length) && (
            <>
              <div className='search-result'>
                <strong>検索結果</strong>({state.results.length}
                件見つかりました)
              </div>
              <PostList>
                {state.results.map((post) => {
                  const date = new Date(post.createdDate);
                  const dateFormatted = `${
                    date.getMonth() + 1
                  }/${date.getDate()}/${date.getFullYear()}`;
                  return (
                    <li key={post._id}>
                      <Link
                        onClick={() => appDispatch({ type: 'closeSearch' })}
                        to={`/post/${post._id}`}
                      >
                        <div>
                          <AvatarSmall
                            src={post.author.avatar}
                            alt='user-icon'
                          />{' '}
                        </div>
                        <div>
                          <h2>{post.title}</h2>{' '}
                          <span>
                            by {post.author.username} on {dateFormatted}{' '}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </PostList>
            </>
          )}
          {!Boolean(state.results.length) && (
            <p>検索結果が見つかりませんでした。</p>
          )}
        </LiveSearchResult>
      </SearchOverlayBottom>
    </SearchWrap>
  );
};

export default Search;
