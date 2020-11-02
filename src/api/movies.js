import { API_HOST } from '../utils/constants';

//Comunicación para consumir los diferentes servicios de la API
//CRUD Películas
export function getMovies() {
  const url = `${API_HOST}/movies`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    });
}

export async function createMovie(form) {
  const url = `${API_HOST}/movies`;
  let created = false;
  try {
    let config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    };
    let res = await fetch(url, config);
    let json = await res.json();
    if (json === form) {
      created = true;
    }
  } catch (error) {}

  return created;
}

export async function editMovie(idMovie, form) {
  const url = `${API_HOST}/movies/${idMovie}`;
  let created = false;
  try {
    let config = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    };
    let res = await fetch(url, config);
    let json = await res.json();
    if (json === form) {
      created = true;
    }
  } catch (error) {}

  return created;
}
