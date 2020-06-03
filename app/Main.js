import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyle';
import { CSSTransition } from 'react-transition-group';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:8080/';

import StateContext from './Context/StateContext';
import DispachContext from './Context/DispatchContext';

// <=========================> My Components <=========================>
import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import ViewSinglePost from './components/ViewSinglePost';
import FlashMessages from './components/FlashMessages';
import Profile from './components/Profile';
import EditPost from './components/EditPost';
import NotFound from './components/NotFound';
import Search from './components/Search';

const Main = () => {
  const initialState = {
    login: Boolean(localStorage.getItem('vixoaToken')),
    flashMessages: [],
    user: {
      token: localStorage.getItem('vixoaToken'),
      username: localStorage.getItem('vixoaUsername'),
      avatar: localStorage.getItem('vixoaAvatar'),
    },
    isSearchOpen: false,
  };

  const reducer = (draft, action) => {
    switch (action.type) {
      case 'login':
        draft.login = true;
        draft.user = action.payload;
        return;
      case 'logout':
        draft.login = false;
        return;
      case 'flashMessage':
        draft.flashMessages.push(action.payload);
        return;
      case 'openSearch':
        draft.isSearchOpen = true;
        return;
      case 'closeSearch':
        draft.isSearchOpen = false;
        return;
    }
  };

  const [state, dispach] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    if (state.login) {
      localStorage.setItem('vixoaToken', state.user.token);
      localStorage.setItem('vixoaUsername', state.user.username);
      localStorage.setItem('vixoaAvatar', state.user.avatar);
    } else {
      localStorage.removeItem('vixoaToken');
      localStorage.removeItem('vixoaUsername');
      localStorage.removeItem('vixoaAvatar');
    }
  }, [state.login]);

  return (
    <StateContext.Provider value={state}>
      <DispachContext.Provider value={dispach}>
        <BrowserRouter>
          <GlobalStyle />
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path='/' exact>
              {state.login ? <Home /> : <HomeGuest />}
            </Route>
            <Route path='/post/:id' exact>
              <ViewSinglePost />
            </Route>
            <Route path='/post/:id/edit' exact>
              <EditPost />
            </Route>
            <Route path='/profile/:username'>
              <Profile />
            </Route>
            <Route path='/create-post'>
              <CreatePost />
            </Route>
            <Route path='/about-us'>
              <About />
            </Route>
            <Route path='/terms'>
              <Terms />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <CSSTransition timeout={330} in={state.isSearchOpen} unmountOnExit>
            {(state) => <Search cssState={state} />}
          </CSSTransition>
          <Footer />
        </BrowserRouter>
      </DispachContext.Provider>
    </StateContext.Provider>
  );
};

ReactDOM.render(<Main />, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept();
}
