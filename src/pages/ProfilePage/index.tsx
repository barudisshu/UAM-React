/** @format */

import React from 'react';
import './index.scss';
import {withRouter, RouteComponentProps} from 'react-router-dom';

interface IProps extends RouteComponentProps {
  isAuthenticated: boolean;
  currentUser: CurrentUser;
}

class ProfilePage extends React.Component<IProps> {
  render() {
    return (
      <div className={'profile-container'}>
        <div className={'profile-content'}>
          <p>用户简介信息</p>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfilePage);
