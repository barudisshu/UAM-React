/** @format */
import {ACCESS_TOKEN, API_BASE_URL, POLL_LIST_SIZE} from '../components/Constants';

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
    url: API_BASE_URL + '/auth/signin',
    method: 'POST',
    body: JSON.stringify(loginRequest),
  });
}

export function register(registerRequest: any) {
  return request({
    url: API_BASE_URL + '/auth/signup',
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
    url: API_BASE_URL + '/user/me',
    method: 'GET',
  });
}

export function getUserProfile(username: string) {
  return request({
    url: API_BASE_URL + '/users/' + username,
    method: 'GET',
  });
}

export function getAllPolls(page: number, size: number) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;

  return request({
    url: API_BASE_URL + '/polls?page=' + page + '&size=' + size,
    method: 'GET',
  });
}

export function createPoll(pollData: any) {
  return request({
    url: API_BASE_URL + '/polls',
    method: 'POST',
    body: JSON.stringify(pollData),
  });
}

export function castVote(voteData: any) {
  return request({
    url: API_BASE_URL + '/polls/' + voteData.pollId + '/votes',
    method: 'POST',
    body: JSON.stringify(voteData),
  });
}

export function getUserCreatedPolls(username: string, page: number, size: number) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;

  return request({
    url: API_BASE_URL + '/users/' + username + '/polls?page=' + page + '&size=' + size,
    method: 'GET',
  });
}

export function getUserVotedPolls(username: string, page: number, size: number) {
  page = page || 0;
  size = size || POLL_LIST_SIZE;

  return request({
    url: API_BASE_URL + '/users/' + username + '/votes?page=' + page + '&size=' + size,
    method: 'GET',
  });
}
