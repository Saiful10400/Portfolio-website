"use client";
import Footer from "./Footer";
import logo from "../../../public/logo.png";
import "./Root.css";
import Home from "./Home/Home";
import AboutMe from "./About me/AboutMe";
import Projects from "./Projects/Projects";
import Contact from "./Contact/Contact";
import Blog from "./Blog/Blogs";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Root = () => {
  const [route, setRoute] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentRoute = useLocation();
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/");
    setMobileMenuOpen(false);
  };

  const routes = [
    { name: "home", hash: "#" },
    { name: "about-me", hash: "#about-me" },
    { name: "projects", hash: "#projects" },
    { name: "contact", hash: "#contact" },
    { name: "blogs", hash: "#blogs" },
  ];

  const li = routes.map((item) => (
    <li key={item.name}>
      <a
        href={item.hash}
        className={`block px-4 py-2 rounded-md font-semibold transition-colors duration-300 
          ${route === item.name || (item.name === "blogs" && currentRoute.pathname.includes("/blog/"))
            ? "bg-yellow-400 text-black"
            : "text-white hover:bg-yellow-400 hover:text-black"
          }
          text-sm sm:text-base lg:text-lg
        `}
        onClick={() => {
          setRoute(item.name);
          returnHome();
        }}
      >
        {item.name.replace("-", " ").toUpperCase()}
      </a>
    </li>
  ));

  useEffect(() => {
    if (currentRoute.pathname === "/") {
      switch (currentRoute.hash) {
        case "#about-me":
          setRoute("about-me");
          break;
        case "#projects":
          setRoute("projects");
          break;
        case "#contact":
          setRoute("contact");
          break;
        case "#blogs":
          setRoute("blogs");
          break;
        default:
          setRoute("home");
      }
    }
  }, [currentRoute]);

  return (
    <>
      <div className="lg:w-[1400px] lg:mx-auto relative z-20">
        {/* Navbar */}
        <div className="navbar bg-gradient-to-b from-[#111122] via-[#111122] to-transparent sticky top-0 left-0 z-30 shadow-md px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <a
            onClick={() => {
              setRoute("home");
              returnHome();
            }}
            className="cursor-pointer"
          >
            <img
              className="w-[90px] h-[60px] object-contain hover:scale-105 transition-transform duration-300"
              src={logo}
              alt="Logo"
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex gap-6 font-bold items-center">
            {li}
          </ul>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-end">
            <div className="bg-gray-900 w-64 h-full p-6 flex flex-col gap-4 animate-slideIn">
              <button
                className="text-white mb-8 self-end text-2xl font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>
              <ul className="flex flex-col gap-4">{li}</ul>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="mx-3 lg:mx-0 lg:min-h-[calc(100vh-78px)] relative z-10 transition-all duration-500">
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

      <Footer />

      {/* Animations */}
      <style>{`
        .animate-slideIn {
          animation: slideIn 0.3s ease forwards;
        }
        @keyframes slideIn {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Root;
