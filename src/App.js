import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/UI/RootLayout";
import EditPage from "./components/Editing/EditPage";
import ImportPage from "./components/Import/ImportPage";
import CatalogPage from "./components/Catalog/CatalogPage";
import DeleteForm from "./components/Editing/DeleteForm";
import AddForm from "./components/Editing/AddForm";
import CatalogList from "./components/Catalog/CatalogList";
import { tokenLoaderActions } from "./components/storage/tokenSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SearchPage from "./components/Search/SeachPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
    fetch("http://localhost:8000/api/v1/sessions", {
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
        dispatch(tokenLoaderActions.setToken(token)); // Dispatch the action to update the token in the store
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
