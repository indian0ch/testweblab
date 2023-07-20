export async function getMovies(url, token, offset = 0, id = "") {
  let offsetString = "";
  offset !== 0 && (offsetString += `&offset=${offset}`);

  return fetch(url + id + offsetString, {
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
      console.log("Error:", error);
    });
}
