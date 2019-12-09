/** @format */

import * as React from 'react';
import {getCurrentUser} from '../../util/APIUtils';
import {ACCESS_TOKEN} from '../Constants';
import {BrowserRouter as Router, Route, RouteComponentProps, Switch} from 'react-router-dom';
import Header from '../Header';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ProfilePage from '../../pages/ProfilePage';
import NotFoundPage from '../../pages/NotFoundPage';
import LoadingIndicator from '../LoadingIndicator';
import {Layout, notification} from 'antd';
import './index.scss';

const {Content} = Layout;
type IProps = RouteComponentProps;

interface IState {
  currentUser: any;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class Routes extends React.Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props, context);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }

  public componentDidMount() {
    this.loadCurrentUser();
  }

  public render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    return (
      <Layout className={'page-container'}>
        <Header
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout}
        />
        <Content className={'page-content'}>
          <div className={'container'}>
            <Switch>
              <Route
                exact={true}
                path={`/`}
                render={props => (
                  <HomePage
                    isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    handleLogout={this.handleLogout}
                    {...props}
                  />
                )}
              />
              <Route path={`/login`} render={props => <LoginPage onLogin={this.handleLogin} {...props} />} />
              <Route path={`/register`} component={RegisterPage} />
              <Route
                path={`/users/:uid`}
                render={props => (
                  <ProfilePage
                    isAuthenticated={this.state.isAuthenticated}
                    currentUser={this.state.currentUser}
                    {...props}
                  />
                )}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }

  private readonly handleLogout = (
    redirectTo = '/login',
    notificationType = 'success',
    description = "You're successfully logged out.",
  ) => {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      currentUser: null,
      isAuthenticated: false,
    });
    this.props.history.push(redirectTo);
    notification[notificationType]({
      message: 'UAM',
      description,
    });
  };

  private readonly handleLogin = () => {
    notification.success({
      message: 'UAM',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push('/');
  };

  private readonly loadCurrentUser = () => {
    this.setState({
      isLoading: true,
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
      });
  };
}

const RoutesWrap: React.FC = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
};

export default RoutesWrap;
