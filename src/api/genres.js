import {API_HOST} from '../utils/constants';

export function getGenres(){
    const url = `${API_HOST}/genres`;
    return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    });
}