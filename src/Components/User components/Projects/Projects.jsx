"use client";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import { FaArrowRight } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import loading from "../../../../public/loading.gif";
import increasePageCount from "../../../utils/IncreasePageVisitCount";

AOS.init();

const Projects = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosPublic.get("all/project").then((res) => setData(res.data?.data));
  }, [axiosPublic]);

  // Increase visit count
  useEffect(() => {
    if (!localStorage.getItem("role")) {
      const timerId = setTimeout(() => {
        increasePageCount("projects");
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, []);

  return (
    <div id="projects" className="min-h-screen overflow-x-hidden pt-32 px-4 lg:px-0 text-white bg-[#111122]">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold">Projects</h1>
        <p className="text-gray-400 mt-3 lg:text-lg">
          Some of the projects I’ve worked on recently
        </p>
      </div>

      {/* Loading */}
      {!data ? (
        <div className="w-full h-64 flex justify-center items-center">
          <img src={loading} alt="Loading..." className="w-20 h-20 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((item) => (
            <div
              data-aos="zoom-in"
              key={item._id}
              className="bg-[#1C222A] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              {/* Project Image */}
              <div className="max-h-56 overflow-hidden rounded-t-3xl">
                <img
                  src={item.coverImage}
                  alt={item.projectName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Project Info */}
              <div className="px-5 py-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-yellow-500">
                  {item.projectName}
                </h2>
                <p className="text-gray-300 mt-2 text-lg">
                  {item.projectSummary.slice(0, 60)}
                  {item.projectSummary.length > 60 ? "..." : ""}
                </p>

                {/* View Project Button */}
                <Link to={`project/${item.slug}`}>
                  <button className="mt-5 flex items-center gap-3 font-semibold text-lg text-white hover:text-yellow-500 transition-colors">
                    See Project
                    <FaArrowRight className="text-yellow-400" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
