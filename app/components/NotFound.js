import React from 'react';
import Page from './Page';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Page title='Not Found'>
      <div>
        <h2>ページが見つかりません。</h2>
        <p>
          &laquo; <Link to='/'>ホームページ</Link>に戻ります。
        </p>
      </div>
    </Page>
  );
};

export default NotFound;
