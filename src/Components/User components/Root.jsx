import Footer from "./Footer";
import logo from "../../../public/s.png";
import "./Root.css";
import Home from "./Home/Home";
import AboutMe from "./About me/AboutMe";
import Projects from "./Projects/Projects";
import Contact from "./Contact/Contact";
import Blog from "./Blog/Blogs";
import { useEffect, useState } from "react";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";
const Root = () => {
  const [route, setRoute] = useState("");
  const currentRoute = useLocation();

  const move = useNavigate();
  const returnHome = () => {
    move("/");
  };
  const li = (
    <>
      <li>
        <a
          onClick={() => {
            setRoute("home");
            returnHome();
          }}
          className={route === "home" && "active"}
          href={"#"}
        >
          Home
        </a>
      </li>
      <li>
        <a
          onClick={() => {
            setRoute("about-me");
            returnHome();
          }}
          className={route === "about-me" && "active"}
          href={"#about-me"}
        >
          About me
        </a>
      </li>
      <li>
        <a
          onClick={() => {
            setRoute("projects");
            returnHome();
          }}
          className={route === "projects" && "active"}
          href={"#projects"}
        >
          Projects
        </a>
      </li>
      <li>
        <a
          onClick={() => {
            setRoute("contact");
            returnHome();
          }}
          className={route === "contact" && "active"}
          href={"#contact"}
        >
          Contact
        </a>
      </li>
      <li>
        <a
          onClick={() => setRoute("blogs")}
          className={
            (route === "blogs" || currentRoute.pathname.includes("/blog/")) &&
            "active"
          }
          href={"#blogs"}
        >
          Blogs
        </a>
      </li>
    </>
  );

  console.log(route === "blogs" || currentRoute.pathname.includes("/blog/"));
  useEffect(() => {
    if (currentRoute.pathname === "/") {
      if (currentRoute.hash === "#about-me") {
        setRoute("about-me");
      } else if (currentRoute.hash === "#projects") {
        setRoute("projects");
      } else if (currentRoute.hash === "#contact") {
        setRoute("contact");
      } else if (currentRoute.hash === "#blogs") {
        setRoute("blogs");
      } else {
        setRoute("home");
      }
    }
  }, [currentRoute]);
  return (
    <>
      <div className="lg:w-[1400px] lg:mx-auto relative z-20">
        <div className="navbar bg-gradient-to-b from-[#111122] via-[#111122] to-transparent  sticky lg:flex lg:justify-between top-0 left-0">
          <div className="navbar-start ">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-bold "
              >
                {li}
              </ul>
            </div>
            <a
              onClick={() => {
                setRoute("home");
                returnHome();
              }}
              className={route === "home" && "active"}
              href={"#"}
            >
              <img className="w-[60px] h-[60px]" src={logo} alt="" />
            </a>
          </div>
          <div className="navbar-center  hidden lg:flex">
            <ul className="flex  px-1 font-bold gap-5 items-start">{li}</ul>
          </div>
        </div>
        <div className="mx-3 lg:min-h-[calc(100vh-78px)] lg:mx-0  relative -z-10">
          {currentRoute.pathname === "/" ? (
            <>
              <Home />
              <AboutMe />
              <Projects />
              <Contact />
              <Blog />
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Root;
