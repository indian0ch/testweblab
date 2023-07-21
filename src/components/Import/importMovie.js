export async function importMovie(token, file) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `${token}`);

  var formData = new FormData();
  formData.append("movies", file, file.name);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
  };

  return await fetch(
    "http://localhost:8000/api/v1/movies/import",
    requestOptions
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Помилка при виконанні запиту:", error);
    });
}
