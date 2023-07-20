export async function importMovie(url, token, filmData) {
  console.log(filmData);
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: filmData,
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }