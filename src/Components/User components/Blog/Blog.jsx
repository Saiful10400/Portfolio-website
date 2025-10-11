import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import parse from "html-react-parser";
import loading from "../../../../public/loading.gif";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosPublic
      .get(`/all/blog?slug=${slug}`)
      .then((res) => setData(res.data?.data));
  }, [axiosPublic, slug]);

  // Format date
  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  if (!data) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center bg-[#111122]">
        <img src={loading} alt="loading" className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#111122] text-white pb-16 px-4 lg:px-0">
      {/* Cover Image */}
      <div className="relative w-full h-[250px] lg:h-[600px] overflow-hidden rounded-3xl shadow-lg">
        <img
          src={data?.featuredImage}
          alt="featured"
          className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto mt-10 lg:mt-16">
        <div data-aos="fade-up" data-aos-duration="1500">
          <h1 className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-3">
            {data?.title}
          </h1>
          <p className="text-gray-400 mb-8">{formatDateString(data?.createdAt)}</p>
          <div className="prose prose-invert lg:prose-lg text-gray-200 leading-relaxed">
            {parse(data?.content || "")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
