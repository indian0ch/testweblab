import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/UI/RootLayout";
import EditPage from "./components/Editing/EditPage";
import ImportPage from "./components/Import/ImportPage";
import SortListPage from "./components/List/SortListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
      },
      {
        path: "/editing",
        element: <EditPage />,
      },
      {
        path: "/import",
        element: <ImportPage />,
      },
      {
        path: "/sortedList",
        element: <SortListPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
