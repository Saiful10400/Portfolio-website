import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import { FaGithub } from "react-icons/fa";
import { BsFillEyeFill } from "react-icons/bs";
const Project = () => {
  const axiosPublic = useAxiosPublic();
  const { slug } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    axiosPublic
      .get(`/all/project?slug=${slug}`)
      .then((res) => setData(res.data?.data));
  }, [axiosPublic, slug]);

  // formate date.
  const formateDateString = (dateString) => {
    const date = new Date(dateString);

    const day = date.getUTCDate(); // Get the day of the month
    const month = date.toLocaleString("en-US", { month: "long" }); // Get the month name
    const year = date.getUTCFullYear(); // Get the year

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  };

  return (
    <div className="mb-8">
      <div className="pt-32">
        <div className="flex justify-between items-center mb-6">
          <a target="blank" href={data?.repoLink}>
            <button className="btn btn-sm text-black lg:btn-secondary bg-yellow-400 border-none hover:bg-yellow-300">
              Github link{" "}
              <span>
                <FaGithub />
              </span>
            </button>
          </a>
          <a target="blank" href={data?.projectLink}>
            <button className="btn btn-sm text-black lg:btn-secondary bg-yellow-400 border-none hover:bg-yellow-300">
              Live preview{" "}
              <span>
                <BsFillEyeFill></BsFillEyeFill>
              </span>
            </button>
          </a>
        </div>
      </div>
      <div className="w-full h-[250px] lg:h-[600px]">
        <img
          className="w-full h-full object-cover"
          src={data?.images[0]}
          alt=""
        />
      </div>
      <div className="flex lg:flex-row flex-col-reverse mt-6 lg:mt-0">
        <div className="lg:w-4/5 min-h-[50vh] mt-[100px] ">
          <h1 className="lg:text-5xl text-4xl font-bold text-yellow-500 mb-5">
            {data?.projectSummary}
          </h1>
          <p className="lg:text-lg text-base font-normal">
            {data?.description}
          </p>
          <div className="my-14">
            <h1 className="text-3xl lg:text-4xl font-bold text-yellow-500 mb-5">
              Tech that i used
            </h1>
            <p className="lg:text-lg text-base font-normal">
              {data?.technologies?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </p>
          </div>
          {/* <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-yellow-500 mb-5">
              Summery
            </h1>
            <p className="lg:text-lg text-base font-normal">{data?.summery}</p>
          </div> */}
        </div>
        <div className="lg:w-1/5 lg:h-max py-6 rounded-xl lg:relative lg:-top-14 bg-[#1C222A] px-[40px]">
          <h1 className="text-3xl  font-semibold">Information</h1>
          <div className="mt-[60px] flex flex-col gap-[20px] hover:shadow-2xl shadow-black transition-all">
            <div className="bg-[#111122] p-[25px]">
              <h1 className="font-bold text-lg">Project name:</h1>
              <h1 className="font-thin text-base mt-4">{data?.projectName}</h1>
            </div>
            <div className="bg-[#111122] p-[25px]">
              <h1 className="font-bold text-lg">Duration:</h1>
              <h1 className="font-thin text-base mt-4">
                {data?.projectCreationDuration}
              </h1>
            </div>
            <div className="bg-[#111122] p-[25px]">
              <h1 className="font-bold text-lg">Date:</h1>
              <h1 className="font-thin text-base mt-4">
                {formateDateString(data?.projectCreationDate)}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
