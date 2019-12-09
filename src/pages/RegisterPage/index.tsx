/** @format */

import React, {FormEvent} from 'react';
import {checkEmailAvailability, checkUsernameAvailability, register} from '../../util/APIUtils';
import './index.scss';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../../components/Constants';

import {Button, Form, Input, notification} from 'antd';

const FormItem = Form.Item;

type IProps = RouteComponentProps;

interface IState {
  name: IConstraintViolation;
  username: IConstraintViolation;
  email: IConstraintViolation;
  password: IConstraintViolation;
}

class RegisterPage extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      name: {
        value: '',
      },
      username: {
        value: '',
      },
      email: {
        value: '',
      },
      password: {
        value: '',
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
    this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
    this.isFormInvalid = this.isFormInvalid.bind(this);
  }

  public render() {
    return (
      <div className="register-container">
        <h1 className="page-title">Register</h1>
        <div className="register-content">
          <Form onSubmit={this.handleSubmit} className="register-form">
            <FormItem label="Full Name" validateStatus={this.state.name.validateStatus} help={this.state.name.errorMsg}>
              <Input
                size="large"
                name="name"
                autoComplete="off"
                placeholder="Your full name"
                value={this.state.name.value}
                onChange={event => this.handleInputChange(event, this.validateName)}
              />
            </FormItem>
            <FormItem
              label="Username"
              hasFeedback={true}
              validateStatus={this.state.username.validateStatus}
              help={this.state.username.errorMsg}>
              <Input
                size="large"
                name="username"
                autoComplete="off"
                placeholder="A unique username"
                value={this.state.username.value}
                onBlur={this.validateUsernameAvailability}
                onChange={event => this.handleInputChange(event, this.validateUsername)}
              />
            </FormItem>
            <FormItem
              label="Email"
              hasFeedback={true}
              validateStatus={this.state.email.validateStatus}
              help={this.state.email.errorMsg}>
              <Input
                size="large"
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Your email"
                value={this.state.email.value}
                onBlur={this.validateEmailAvailability}
                onChange={event => this.handleInputChange(event, this.validateEmail)}
              />
            </FormItem>
            <FormItem
              label="Password"
              validateStatus={this.state.password.validateStatus}
              help={this.state.password.errorMsg}>
              <Input
                size="large"
                name="password"
                type="password"
                autoComplete="off"
                placeholder="A password between 6 to 20 characters"
                value={this.state.password.value}
                onChange={event => this.handleInputChange(event, this.validatePassword)}
              />
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="register-form-button"
                disabled={this.isFormInvalid()}>
                Register
              </Button>
              Already registered? <Link to="/login">Login now!</Link>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }

  private readonly handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    validationFun: (name: string) => any,
  ) => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState(state => ({
      ...state,
      [inputName]: {
        value: inputValue,
        ...validationFun(inputValue),
      },
    }));
  };

  private readonly handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registerRequest = {
      name: this.state.name.value,
      email: this.state.email.value,
      username: this.state.username.value,
      password: this.state.password.value,
    };
    register(registerRequest)
      .then(response => {
        notification.success({
          message: 'UAM',
          description: "Thank you! You're successfully registered. Please Login to continue!",
        });
        this.props.history.push('/login');
      })
      .catch(error => {
        notification.error({
          message: 'UAM',
          description: error.message || 'Sorry! Something went wrong. Please try again!',
        });
      });
  };

  private readonly isFormInvalid = () => {
    return !(
      this.state.name.validateStatus === 'success' &&
      this.state.username.validateStatus === 'success' &&
      this.state.email.validateStatus === 'success' &&
      this.state.password.validateStatus === 'success'
    );
  };

  private validateName = (name: string) => {
    if (name.length < NAME_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`,
      };
    } else if (name.length > NAME_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`,
      };
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  };

  private validateEmail = (email: string) => {
    if (!email) {
      return {
        validateStatus: 'error',
        errorMsg: 'Email may not be empty',
      };
    }

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    if (!EMAIL_REGEX.test(email)) {
      return {
        validateStatus: 'error',
        errorMsg: 'Email not valid',
      };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`,
      };
    }

    return {
      validateStatus: null,
      errorMsg: null,
    };
  };

  private validateUsername = (username: string) => {
    if (username.length < USERNAME_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`,
      };
    } else if (username.length > USERNAME_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`,
      };
    } else {
      return {
        validateStatus: null,
        errorMsg: null,
      };
    }
  };

  private validateUsernameAvailability() {
    // First check for client side errors in username
    const usernameValue = this.state.username.value;
    const usernameValidation = this.validateUsername(usernameValue);

    if (usernameValidation.validateStatus === 'error') {
      this.setState({
        username: {
          value: usernameValue,
          ...usernameValidation,
        },
      });
      return;
    }

    this.setState({
      username: {
        value: usernameValue,
        validateStatus: 'validating',
      },
    });

    checkUsernameAvailability(usernameValue)
      .then(response => {
        if (response.code === 200) {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: 'success',
            },
          });
        } else {
          this.setState({
            username: {
              value: usernameValue,
              validateStatus: 'error',
              errorMsg: 'This username is already taken',
            },
          });
        }
      })
      .catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
          username: {
            value: usernameValue,
            validateStatus: 'success',
          },
        });
      });
  }

  private validateEmailAvailability() {
    // First check for client side errors in email
    const emailValue = this.state.email.value;
    const emailValidation = this.validateEmail(emailValue);

    if (emailValidation.validateStatus === 'error') {
      this.setState({
        email: {
          value: emailValue,
          ...emailValidation,
        },
      });
      return;
    }

    this.setState({
      email: {
        value: emailValue,
        validateStatus: 'validating',
      },
    });

    checkEmailAvailability(emailValue)
      .then(response => {
        if (response.code === 200) {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: 'success',
            },
          });
        } else {
          this.setState({
            email: {
              value: emailValue,
              validateStatus: 'error',
              errorMsg: 'This Email is already registered',
            },
          });
        }
      })
      .catch(error => {
        // Marking validateStatus as success, Form will be recchecked at server
        this.setState({
          email: {
            value: emailValue,
            validateStatus: 'success',
          },
        });
      });
  }

  private validatePassword = (password: string) => {
    if (password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`,
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validationStatus: 'error',
        errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`,
      };
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
  };
}

export default withRouter(RegisterPage);
