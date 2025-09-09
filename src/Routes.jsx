import { createBrowserRouter } from "react-router-dom";

import Root from "./Components/User components/Root";

import Blog from "./Components/User components/Blog/Blog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <h1>something is wrong.</h1>,
    children: [
      // {
      //     path:"/",
      //     element:<Home></Home>
      // },
      // {
      //     path:"Projects",
      //     element:<Projects></Projects>
      // },
      // {
      //     path:"Projects/:slug",
      //     element:<Project></Project>
      // },
      // {
      //     path:"blogs",
      //     element:<Blogs></Blogs>
      // },
      {
        path: "blog/:slug",
        element: <Blog />,
      },
      // {
      //     path:"contact",
      //     element:<Contact></Contact>
      // },
      // {
      //     path:"aboutMe",
      //     element:<AboutMe></AboutMe>
      // }
    ],
  },
]);
