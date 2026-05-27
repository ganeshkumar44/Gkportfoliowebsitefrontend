import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Cookies } from "./pages/Cookies";
import { Privacy } from "./pages/Privacy";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "cookies",
        Component: Cookies,
      },
      {
        path: "privacy",
        Component: Privacy,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
