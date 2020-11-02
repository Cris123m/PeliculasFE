import { API_HOST } from '../utils/constants';

//Comunicación para consumir los diferentes servicios de la API
//CRUD Géneros
export function getGenres() {
  const url = `${API_HOST}/genres`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
}
