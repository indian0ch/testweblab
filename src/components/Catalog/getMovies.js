export async function getMovies(params) {
  let id = "";
  if (params.id) {
    id = params.id;
  }

  let offsetString = "";
  if (params.offset) {
    params.offset !== 0 && (offsetString += `&offset=${params.offset}`);
  }

  let titleString = "";
  if (params.title) {
    titleString += `&title=${params.title}`;
  }

  let actorString = "";
  if (params.actor) {
    actorString += `&actor=${params.actor}`;
  }

  return fetch(params.url + id + offsetString + titleString, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `${params.token}`,
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
