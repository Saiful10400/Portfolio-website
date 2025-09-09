import { useEffect, useState } from "react";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import { FaArrowRight } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import loading from "../../../../public/loading.gif";
AOS.init();
const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(null);
  useEffect(() => {
    axiosPublic.get("all/blog").then((res) => setData(res.data?.data));
  }, [axiosPublic]);

  console.log(data);

  return (
    <div id="blogs" className="min-h-[100vh] pb-8 pt-32 text-white mb-8">
      {/* all rojects */}
      <div>
        <div className="h-[20vh]">
          <h1 className="text-4xl text-center font-bold">Blogs</h1>
        </div>
        {!data ? (
          <div className="w-full h-full  flex justify-center items-center">
            <img src={loading} alt="" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data?.map((item) => (
              <Link to={"blog/"+item.slug}
                data-aos="zoom-in"
                key={item._id}
                className="bg-[#1C222A] rounded-3xl overflow-hidden h-[400px] "
              >
                <div className="h-[200px] overflow-hidden ">
                  <img src={item.featuredImage} alt="" />
                </div>
                <div className="px-5">
                  <h1 className="text-4xl min-h-[100px] my-5">
                    <span className="text-yellow-500">{item.title.slice(0,60)} {item.title.length>60?"...":""}</span>
                  </h1>
                  <Link to={"blog/"+item.slug}>
                    <button className="flex items-center text-xl gap-3 font-bold hover:text-yellow-500 transition-all">
                      Read Now{" "}
                      <span>
                        <FaArrowRight className="text-yellow-400" />
                      </span>
                    </button>
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
