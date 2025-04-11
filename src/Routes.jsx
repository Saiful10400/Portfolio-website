import { createBrowserRouter } from "react-router-dom"
import Home from "./Components/User components/Home/Home"
import Projects from "./Components/User components/Projects/Projects"
import Blogs from "./Components/User components/Blog/Blogs"
import Contact from "./Components/User components/Contact/Contact"
import Root from "./Components/User components/Root"
import AboutMe from "./Components/User components/About me/AboutMe"
import Project from "./Components/User components/Projects/Project"
import Blog from "./Components/User components/Blog/Blog"
import Role from "./Components/Role"

export const router=createBrowserRouter([
    {
         path:"/",
         element:<Root></Root>,
         errorElement:<h1>something is wrong.</h1>,
         children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"Projects",
                element:<Projects></Projects>
            },
            {
                path:"Projects/:slug",
                element:<Project></Project>
            },
            {
                path:"blogs",
                element:<Blogs></Blogs>
            },
            {
                path:"blogs/:slug",
                element:<Blog/>
            },
            {
                path:"contact",
                element:<Contact></Contact>
            },
            {
                path:"aboutMe",
                element:<AboutMe></AboutMe>
            },
            {
                path:"role",
                element:<Role/>
            }
         ]
    },
    // {
    //     path:"/dashboard",
    //     element:<DashboardRoot></DashboardRoot>,
    //     children:[
    //         {
    //             path:"Add_project",
    //             element:<ProjectBackend></ProjectBackend>
    //         },
    //         {
    //             path:"Add_blog",
    //             element:<BlogBackend></BlogBackend>
    //         }
    //     ]
    // }
])