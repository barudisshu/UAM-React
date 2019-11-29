/** @format */
import * as React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import 'url-search-params-polyfill';
import './index.scss';

import logo from '../../logo.svg';
import {Dropdown, Icon, Layout, Menu} from 'antd';
import {ClickParam} from 'antd/es/menu';

const AntHeader = Layout.Header;

interface IProps extends RouteComponentProps {
  isAuthenticated: boolean;
  currentUser: any;
  onLogout: any;
}

export class Header extends React.Component<IProps> {
  constructor(props: Readonly<IProps>) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  public handleMenuClick({key}: ClickParam) {
    if (key === 'logout') {
      this.props.onLogout();
    }
  }

  public render() {
    let menuItems;
    if (this.props.currentUser) {
      menuItems = [
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="home" className="nav-icon" />
          </Link>
        </Menu.Item>,
        <Menu.Item key="/poll/new">
          <Link to="/poll/new">
            <img src={logo} alt="poll" className="poll-icon" />
          </Link>
        </Menu.Item>,
        <Menu.Item key="/profile" className="profile-menu">
          <ProfileDropdownMenu currentUser={this.props.currentUser} handleMenuClick={this.handleMenuClick} />
        </Menu.Item>,
      ];
    } else {
      menuItems = [
        <Menu.Item key="/login">
          <Link to="/login">Login</Link>
        </Menu.Item>,
        <Menu.Item key="/register">
          <Link to="/register">Register</Link>
        </Menu.Item>,
      ];
    }

    return (
      <AntHeader className="header-header">
        <div className="container">
          <div className="header-title">
            <Link to="/">UAM</Link>
          </div>
          <Menu
            className="header-menu"
            mode="horizontal"
            selectedKeys={[this.props.location.pathname]}
            style={{lineHeight: '64px'}}>
            {menuItems}
          </Menu>
        </div>
      </AntHeader>
    );
  }
}

interface IDropdownProps {
  currentUser: any;
  handleMenuClick?: (param: ClickParam) => void;
  popupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

function ProfileDropdownMenu(props: IDropdownProps) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled={true}>
        <div className="user-full-name-info">{props.currentUser.name}</div>
        <div className="username-info">@{props.currentUser.username}</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  const getPopupContainer = (triggerNode: HTMLElement) => {
    return document.getElementsByClassName('profile-menu')[0] as HTMLElement;
  };

  return (
    <Dropdown overlay={dropdownMenu} trigger={['click']} getPopupContainer={getPopupContainer}>
      <div className="ant-dropdown-link">
        <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
      </div>
    </Dropdown>
  );
}

export default withRouter(Header);
