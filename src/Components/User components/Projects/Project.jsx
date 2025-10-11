"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import { FaGithub } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
import Slider from "react-slick";
import loading from "../../../../public/loading.gif";
import increasePageCount from "../../../utils/IncreasePageVisitCount";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Project = () => {
  const axiosPublic = useAxiosPublic();
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosPublic
      .get(`/all/project?slug=${slug}`)
      .then((res) => setData(res.data?.data));
  }, [axiosPublic, slug]);

  // increase visit count
  useEffect(() => {
    if (!localStorage.getItem("role")) {
      const timerId = setTimeout(() => {
        increasePageCount("project");
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, []);

  // format date
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  if (!data)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#111122]">
        <img src={loading} alt="Loading..." className="w-20 h-20 animate-spin" />
      </div>
    );

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
  };

  return (
    <div className="mb-16 bg-[#111122] text-white">
      {/* Buttons */}
      <div className="pt-32 flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 lg:px-0 mb-8 gap-4">
        <a target="_blank" rel="noopener noreferrer" href={data?.repoLink}>
          <button className="btn bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-5 py-2 rounded-lg flex items-center gap-2 transition-all">
            <FaGithub /> GitHub
          </button>
        </a>
        <a target="_blank" rel="noopener noreferrer" href={data?.projectLink}>
          <button className="btn bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-5 py-2 rounded-lg flex items-center gap-2 transition-all">
            <BsFillEyeFill /> Live Preview
          </button>
        </a>
      </div>

      {/* Image Carousel */}
      <div className="w-full h-[300px] lg:h-[600px] overflow-hidden rounded-3xl relative group">
        <Slider {...sliderSettings}>
          {data?.images?.map((img, index) => (
            <div key={index} className="relative w-full h-[300px] lg:h-[600px]">
              <img
                src={img}
                alt={`${data.projectName}-${index}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mt-10 px-4 lg:px-0">
        {/* Main Info */}
        <div className="lg:w-4/5 space-y-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-yellow-500">
            {data?.projectSummary}
          </h1>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
            {data?.description}
          </p>

          {/* Tech stack */}
          <div>
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {data?.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-800 px-4 py-2 rounded-full text-sm lg:text-base font-medium hover:bg-yellow-500 hover:text-black transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/5 bg-[#1C222A] p-6 rounded-3xl shadow-lg space-y-6 lg:sticky lg:top-32">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Project Info</h2>
          <div className="space-y-4">
            <div className="bg-[#111122] p-4 rounded-xl shadow hover:shadow-yellow-500 transition-shadow">
              <h3 className="font-semibold text-lg">Project Name</h3>
              <p className="text-gray-300 mt-2">{data?.projectName}</p>
            </div>
            <div className="bg-[#111122] p-4 rounded-xl shadow hover:shadow-yellow-500 transition-shadow">
              <h3 className="font-semibold text-lg">Duration</h3>
              <p className="text-gray-300 mt-2">{data?.projectCreationDuration}</p>
            </div>
            <div className="bg-[#111122] p-4 rounded-xl shadow hover:shadow-yellow-500 transition-shadow">
              <h3 className="font-semibold text-lg">Date</h3>
              <p className="text-gray-300 mt-2">{formatDateString(data?.projectCreationDate)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
