/** @format */

import React from 'react';
import {Avatar} from 'antd';
import LoadingIndicator from '../../components/LoadingIndicator';
import './index.scss';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {getUserProfile} from '../../util/APIUtils';
import NotFoundPage from '../NotFoundPage';
import ServerError from '../ServerError';
import {formatDate} from '../../util/Helpers';

interface IProfileParams {
  uid: string;
}

interface IProps extends RouteComponentProps<IProfileParams> {
  isAuthenticated: boolean;
  currentUser: ICurrentUser;
}

interface IState {
  user?: any;
  isLoading: boolean;
  notFound?: boolean;
  serverError?: boolean;
}

class ProfilePage extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      user: null,
      isLoading: false,
    };
    this.loadUserProfile = this.loadUserProfile.bind(this);
  }

  public componentDidMount() {
    const uid = this.props.match.params.uid;
    this.loadUserProfile(uid);
  }

  public componentDidUpdate(nextProps: IProps) {
    if (this.props.match.params.uid !== nextProps.match.params.uid) {
      this.loadUserProfile(nextProps.match.params.uid);
    }
  }

  public render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    if (this.state.notFound) {
      return <NotFoundPage />;
    }

    if (this.state.serverError) {
      return <ServerError />;
    }

    return (
      <div className={'profile-container'}>
        <div className={'profile-content'}>
          <div className={'profile'}>
            {this.state.user ? (
              <div className="user-profile">
                <div className="user-details">
                  <div className="user-avatar">
                    <Avatar className="user-avatar-square" shape={'square'} size={256} src={this.state.user.avatar} />
                  </div>
                  <div className="user-summary">
                    <div className="full-name">{this.state.user.name}</div>
                    <div className="username">@{this.state.user.username}</div>
                    <div className="desc">{this.state.user.desc}</div>
                    <div className="status">Status: {this.state.user.status === 0 ? 'busy' : 'hide'}</div>
                    <div className="company">Company: {this.state.user.company}</div>
                    <div className="location">Location: {this.state.user.location}</div>
                    <div className="website">
                      Website: <a href={this.state.user.website}>{this.state.user.website}</a>
                    </div>
                    <div className="user-joined">Joined: {formatDate(this.state.user.joinedAt)}</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  private readonly loadUserProfile = (uid: string) => {
    this.setState({
      isLoading: true,
    });

    getUserProfile(uid)
      .then(response => {
        this.setState({user: response.data, isLoading: false});
      })
      .catch(error => {
        if (error.code === 404) {
          this.setState({
            notFound: true,
            isLoading: false,
          });
        } else {
          this.setState({
            serverError: true,
            isLoading: false,
          });
        }
      });
  };
}

export default withRouter(ProfilePage);
