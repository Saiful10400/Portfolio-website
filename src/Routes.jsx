import { createBrowserRouter } from "react-router-dom";

import Root from "./Components/User components/Root";

import Blog from "./Components/User components/Blog/Blog";
import Project from "./Components/User components/Projects/Project";
import ErrorElement from "./ErrorElement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    
    children: [
      {
          path:"*",
          element:<ErrorElement/>
      },
      // {
      //     path:"Projects",
      //     element:<Projects></Projects>
      // },
      {
        path: "project/:slug",
        element: <Project />,
      },
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
