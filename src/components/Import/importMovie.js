// import axios from 'axios';

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
      console.error("Помилка при виконанні запиту:", error);
    });

    // axios.post(url, formData, {
    //   headers: {
    //     'Authorization': `${token}`,
    //     'Content-Type': 'multipart/form-data', // Don't forget to set the content type to multipart/form-data
    //   }
    // })
    // .then(response => {
    //   // Handle success response
    //   console.log('File upload successful!', response.data);
    // })
    // .catch(error => {
    //   // Handle error
    //   console.error('Error uploading file:', error);
    // });
}
