import { useEffect, useState } from "react";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import { FaArrowRight } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import loading from "../../../../public/loading.gif";
AOS.init();
const Projects = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(null);
  useEffect(() => {
    axiosPublic.get("all/project").then((res) => setData(res.data?.data));
  }, [axiosPublic]);

  return (
    <div className="min-h-[100vh] pt-32 text-white mb-8">
      {/* all rojects */}
      <div>
        <div className="h-[20vh]">
          <h1 className="text-4xl text-center font-bold">Projects</h1>
        </div>
        {!data ? (
          <div className="w-full h-full  flex justify-center items-center">
            <img src={loading} alt="" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data?.map((item) => (
              <div
                data-aos="zoom-in"
                key={item._id}
                className="bg-[#1C222A] rounded-3xl overflow-hidden h-[700px] "
              >
                <div className="h-[500px] overflow-hidden ">
                  <img src={item.coverImage} alt="" />
                </div>
                <div className="px-5">
                  <h1 className="text-4xl my-5">
                    <span className="text-yellow-500">{item.projectName}</span>{" "}
                    -{" "}
                    <span className="text-3xl font-semibold">
                      {item.projectSummary}
                    </span>
                  </h1>
                  <Link to={item.slug}>
                    <button className="flex items-center text-xl gap-3 font-bold hover:text-yellow-500 transition-all">
                      See Project{" "}
                      <span>
                        <FaArrowRight className="text-yellow-400" />
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
