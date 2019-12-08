/** @format */
import {ACCESS_TOKEN, API_BASE_URL} from '../components/Constants';

const request = (options: any) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = {headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    }),
  );
};

export function login(loginRequest: any) {
  return request({
    url: API_BASE_URL + '/authorize',
    method: 'POST',
    body: JSON.stringify(loginRequest),
  });
}

export function scratch(accessRequest: any) {
  return request({
    url: API_BASE_URL + "/access",
    method: 'POST',
    body: JSON.stringify(accessRequest)
  })
}

export function register(registerRequest: any) {
  return request({
    url: API_BASE_URL + '/register',
    method: 'POST',
    body: JSON.stringify(registerRequest),
  });
}

export function checkUsernameAvailability(username: string) {
  return request({
    url: API_BASE_URL + '/user/checkUsernameAvailability?username=' + username,
    method: 'GET',
  });
}

export function checkEmailAvailability(email: string) {
  return request({
    url: API_BASE_URL + '/user/checkEmailAvailability?email=' + email,
    method: 'GET',
  });
}

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  return request({
    url: API_BASE_URL + '/user',
    method: 'GET',
  });
}

export function getUserProfile(uid: string) {
  return request({
    url: API_BASE_URL + '/user/' + uid,
    method: 'GET',
  });
}
