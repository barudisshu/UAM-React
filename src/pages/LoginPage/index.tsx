/** @format */
import React from 'react';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import './index.scss';
import {ACCESS_TOKEN} from '../../components/Constants';

import {Form, Input, Button, Icon, notification} from 'antd';
import {FormComponentProps} from 'antd/es/form';
import {login, scratch} from '../../util/APIUtils';
const FormItem = Form.Item;

interface IProps extends RouteComponentProps {
  onLogin: () => void;
}

interface ILoginProps extends FormComponentProps {
  clientId?: string;
  clientSecret?: string;
  responseType?: string;
  redirectUri?: string;
  onLogin: () => void;
}

class LoginForm extends React.Component<ILoginProps> {
  constructor(props: ILoginProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{required: true, message: 'Please input your username or email!'}],
          })(<Input prefix={<Icon type="user" />} size="large" name="username" placeholder="Username or Email" />)}
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

  private readonly handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = {
          ...Object.assign({}, values),
          clientId: this.props.clientId,
          clientSecret: this.props.clientSecret,
          responseType: this.props.responseType,
          redirectUri: this.props.redirectUri,
        };
        login(loginRequest)
          .then(response => {
            const accessRequest = {
              clientId: this.props.clientId,
              clientSecret: this.props.clientSecret,
              responseType: this.props.responseType,
              redirectUri: this.props.redirectUri,
              grantType: 'authorization_code',
              code: response.data,
            };
            scratch(accessRequest)
              .then(res => {
                localStorage.setItem(ACCESS_TOKEN, res.access_token);
                this.props.onLogin();
              })
              .catch(error => {
                if (error.code === 401) {
                  notification.error({
                    message: 'UAM App',
                    description: 'Authentication failure. Please try again!',
                  });
                } else if (error.code === 400) {
                  notification.error({
                    message: error.desc,
                    description: error.data || 'Sorry! Something went wrong.',
                  });
                }
              });
          })
          .catch(error => {
            if (error.code === 401) {
              notification.error({
                message: 'UAM App',
                description: 'Your Username or Password is incorrect. Please try again!',
              });
            } else {
              notification.error({
                message: 'UAM App',
                description: error.desc || 'Sorry! Something went wrong. Please try again!',
              });
            }
          });
      }
    });
  };
}

class LoginPage extends React.Component<IProps> {
  public render() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const urlParams = {
      clientId: searchParams.get('client_id') || '302d111b-666f-4e49-ad1e-22ac605d6efe',
      clientSecret: searchParams.get('client_secret') || 'a34b9e7a-4508-45d0-871c-ed4d7c3dcf9c',
      responseType: searchParams.get('response_type') || 'code',
      redirectUri: searchParams.get('redirect_uri') || 'http://localhost:3000',
    };
    const AntWrappedLoginForm = Form.create<ILoginProps>()(LoginForm);
    return (
      <div className={'login-container'}>
        <h1 className={'page-title'}>Login</h1>
        <div className={'login-content'}>
          <AntWrappedLoginForm
            onLogin={this.props.onLogin}
            clientId={urlParams.clientId}
            clientSecret={urlParams.clientSecret}
            responseType={urlParams.responseType}
            redirectUri={urlParams.redirectUri}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
