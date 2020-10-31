import { API_HOST } from '../utils/constants';

export function getActors() {
  const url = `${API_HOST}/actors`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
}
