export async function postFilm(url, token, filmData) {
  console.log(filmData);

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `${token}`,
    },
    body: JSON.stringify(filmData),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
