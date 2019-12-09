/** @format */

import React from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import './index.scss';
import {notification} from 'antd';

interface IProps extends RouteComponentProps {
  isAuthenticated: boolean;
  currentUser: ICurrentUser;
  handleLogout: (redirectTo: string, notificationType: string, description: string) => void;
}

class HomePage extends React.Component<IProps> {
  constructor(props: Readonly<IProps>) {
    super(props);

    this.loadNotification = this.loadNotification.bind(this);
  }

  public componentDidMount() {
    this.loadNotification();
  }

  public componentDidUpdate(nextProps: IProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      this.loadNotification();
    }
  }

  public render() {
    return (
      <div className={'home-container'}>
        <div className={'home-content'}>
          <p>Welcome to the home page!</p>
        </div>
      </div>
    );
  }

  private readonly loadNotification = () => {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
      notification.info({
        message: 'UAM App',
        description: 'You need to login first!',
      });
    }
  };
}

export default withRouter(HomePage);
