export async function importMovie( token, filmData) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `${token}`);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: filmData,
  };

  fetch('http://localhost:8000/api/v1/movies/import', requestOptions)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Помилка при виконанні запиту:", error);
    });
}
