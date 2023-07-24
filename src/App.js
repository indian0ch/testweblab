import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import RootLayout from "./components/UI/RootLayout";
import EditPage from "./pages/EditPage";
import ImportPage from "./pages/ImportPage";
import CatalogPage from "./pages/CatalogPage";
import DeleteForm from "./components/Editing/DeleteForm";
import AddForm from "./components/Editing/AddForm";
import CatalogList from "./components/Catalog/CatalogList";
import SearchPage from "./pages/SeachPage";
import ErrorPage from "./pages/ErrorPage";
import { tokenLoaderActions } from "./components/storage/tokenSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ErrorResponse } from "@remix-run/router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: "/catalog",
        element: <CatalogPage />,
        children: [
          {
            path: ":pageNumber",
            element: <CatalogList />,
          },
        ],
      },
      {
        path: "/editing",
        element: <EditPage />,
        children: [
          {
            path: "add",
            element: <AddForm />,
          },
          {
            path: "delete",
            element: <DeleteForm />,
          },
        ],
      },
      {
        path: "/import",
        element: <ImportPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/*",
        element: <EditPage />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("API_URL:", process.env.REACT_APP_API_URL);
    console.log("API_URL:", process.env.API_URL);

    fetch(`${process.env.REACT_APP_API_URL}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: "fesiukandrey146@gmail.com",
        password: "95219521",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        dispatch(tokenLoaderActions.setToken(token));
      })
      .catch(() => {
        console.log(
          "Помилка під час загрузки токену для доступу до бекенд частини програми"
        );
      });
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
