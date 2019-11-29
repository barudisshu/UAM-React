/** @format */
import React from 'react';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import './index.scss';
import {ACCESS_TOKEN} from '../../components/Constants';

import {Form, Input, Button, Icon, notification} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import {login} from '../../util/APIUtils';
const FormItem = Form.Item;
interface IProps extends RouteComponentProps {
  onLogin: () => void;
}

interface ILoginProps extends FormComponentProps {
  onLogin: () => void;
}

class LoginForm extends React.Component<ILoginProps> {
  constructor(props: Readonly<ILoginProps>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private readonly handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
        login(loginRequest)
          .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.onLogin();
          })
          .catch(error => {
            if (error.status === 401) {
              notification.error({
                message: 'UAM App',
                description: 'Your Username or Password is incorrect. Please try again!',
              });
            } else {
              notification.error({
                message: 'UAM App',
                description: error.message || 'Sorry! Something went wrong. Please try again!',
              });
            }
          });
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('usernameOrEmail', {
            rules: [{required: true, message: 'Please input your username or email!'}],
          })(
            <Input prefix={<Icon type="user" />} size="large" name="usernameOrEmail" placeholder="Username or Email" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input prefix={<Icon type="lock" />} size="large" name="password" type="password" placeholder="Password" />,
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" size="large" className="login-form-button">
            Login
          </Button>
          Or <Link to="/register">register now!</Link>
        </FormItem>
      </Form>
    );
  }
}

class LoginPage extends React.Component<IProps> {
  public render() {
    const AntWrappedLoginForm = Form.create<ILoginProps>()(LoginForm);
    return (
      <div className={'login-container'}>
        <h1 className={'page-title'}>Login</h1>
        <div className={'login-content'}>
          <AntWrappedLoginForm onLogin={this.props.onLogin} />
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
