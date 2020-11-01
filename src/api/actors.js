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
  } catch (error) {}
}
