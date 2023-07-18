import { Button } from "reactstrap";

function Test(props) {
  // getUsers();

  return (
    <div>
      <Button color="primary">Click Me</Button>
    </div>
  );
}
export default Test;

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJmZXNpdWthbmRyZXkxNDdAZ21haWwuY29tIiwibmFtZSI6IkZlc2l1ayBBbmRyaWkiLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTE4VDEwOjU0OjI3LjQ2M1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTE4VDEwOjU0OjI3LjQ2M1oiLCJpYXQiOjE2ODk2Nzc2Njh9.XXojjwwlMmeUGDBqwNm5Iusw7qt-ZtctFn8urIIHWw4";

export async function getUsers() {
  let token = "";
  await fetch("http://localhost:8000/api/v1/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      email: "petro@gmail.com",
      password: "super-password",
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      token = data.token; // Assuming the token field exists in the response data
      console.log("Token:", token);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  await fetch("http://localhost:8000/api/v1/movies/1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `${token}`,
    },
    // body: JSON.stringify({
    //   title: "Casablanca",
    //   year: 1942,
    //   format: "DVD",
    //   actors: [
    //     "Humphrey Bogartt",
    //     "Ingrid Bergman",
    //     "Claude Rains",
    //     "Peter Lorre",
    //   ],
    // }),
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
