/** @format */

import React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import './index.scss';

interface IProps extends RouteComponentProps {
  isAuthenticated: boolean;
  currentUser: ICurrentUser;
  handleLogout: (redirectTo: string, notificationType: string, description: string) => void;
}

const HomePage: React.FC<IProps> = props => {
  return (
    <div className={'home-container'}>
      <div className={'home-content'}>
        <p>Welcome to the home page!</p>
      </div>
    </div>
  );
};

export default withRouter(HomePage);
