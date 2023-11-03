import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/index";
import Contact from "../pages/Contact";
import Details from "../pages/Details";
import Dashboard from "../pages/Dashboard";
import Add from "../pages/Add";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "details/:slug",
        element: <Details />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "add",
        element: <Add />,
      },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
]);
