import { useEffect, useState } from "react";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import { FaArrowRight } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import loading from "../../../../public/loading.gif";
import increasePageCount from "../../../utils/IncreasePageVisitCount";
AOS.init();

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosPublic.get("all/blog").then((res) => setData(res.data?.data));
  }, [axiosPublic]);

  useEffect(() => {
    if (localStorage.getItem("role")) return;
    const timerId = setTimeout(() => {
      increasePageCount("blogs");
    }, 5000);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div id="blogs" className="min-h-[100vh] overflow-x-hidden pb-8 pt-32 text-white bg-[#111122]">
      <div className="h-[20vh] flex items-center justify-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-center">Blogs</h1>
      </div>

      {!data ? (
        <div className="w-full h-full flex justify-center items-center">
          <img src={loading} alt="loading" className="w-16 h-16 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-0">
          {data?.map((item) => (
            <Link
              to={"blog/" + item.slug}
              key={item._id}
              data-aos="zoom-in"
              className="bg-[#1C222A] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image */}
              <div className="h-48 lg:h-56 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={item.featuredImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-yellow-500 min-h-[80px] mb-4">
                  {item.title.length > 60 ? item.title.slice(0, 60) + "..." : item.title}
                </h2>
                <div className="mt-auto">
                  <button className="flex items-center text-lg lg:text-xl font-bold text-white hover:text-yellow-500 gap-2 transition-colors duration-300">
                    Read Now <FaArrowRight className="text-yellow-400" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
