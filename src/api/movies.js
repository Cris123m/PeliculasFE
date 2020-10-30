import {API_HOST} from '../utils/constants';

export function getMovies(){
    const url = `${API_HOST}/movies`;
    return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    });
}