export async function getMovies(url, token) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((dataResponse) => {
      return dataResponse.data;
    })
    .catch((error) => {
      alert("Error:", error);
    });
}