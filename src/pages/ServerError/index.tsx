/** @format */
import React from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import {Button} from 'antd';

const ServerError: React.FC = () => {
  return (
    <div className="server-error-page">
      <h1 className="server-error-title">500</h1>
      <div className="server-error-desc">Oops! Something went wrong at our Server. Why don't you go back?</div>
      <Link to="/">
        <Button className="server-error-go-back-btn" type="primary" size="large">
          Go Back
        </Button>
      </Link>
    </div>
  );
};

export default ServerError;
