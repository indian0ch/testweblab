export const fetchUser = (url, dataObject) => {

  return fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(dataObject),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(() => {
      return "ServerError";
    });
};
