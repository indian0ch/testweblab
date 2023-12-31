import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/UI/RootLayout";
import EditPage from "./pages/EditPage";
import ImportPage from "./pages/ImportPage";
import CatalogPage from "./pages/CatalogPage";
import AddForm from "./components/Editing/Adding/AddForm";
import CatalogList from "./components/Catalog/CatalogList";
import SearchPage from "./pages/SeachPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: "catalog",
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
          }
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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
