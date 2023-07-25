export const fetchUser = (url, type, email, password) => {

    return fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === 0) {
          // setResponseOk(false);
        } else {
          const token = data.token;
          // dispatch(tokenLoaderActions.setToken(token));
        }
      })
      .catch(() => {
        //   setResponseOk(false);
      });
  };