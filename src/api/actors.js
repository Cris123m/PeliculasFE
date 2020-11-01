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

export async function createActor(form) {
  const url = `${API_HOST}/actors`;
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
    console.log(json);
    created = true;
  } catch (error) {}

  return created;
}

export async function editActor(idActor, form) {
  const url = `${API_HOST}/actors/${idActor}`;
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
    console.log(json);
    created = true;
  } catch (error) {}

  return created;
}
