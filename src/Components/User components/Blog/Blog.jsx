import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import parse from "html-react-parser";
import loading from "../../../../public/loading.gif";
const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const { slug } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    axiosPublic
      .get(`/all/blog?slug=${slug}`)
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

  if (!data) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center text-white">
        {" "}
        <div className="w-full h-full  flex justify-center items-center">
          <img src={loading} alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 lg:mb-9">
      <div className="w-full h-[250px] lg:h-[600px]">
        <img
          className="w-full h-full object-cover"
          src={data?.featuredImage}
          alt="featcherd image."
        />
      </div>
      <div className="flex lg:flex-row flex-col-reverse mt-6 lg:mt-0">
        <div className="min-h-[50vh] mt-[100px] ">
          <h1 className="lg:text-5xl text-4xl font-bold text-yellow-500 ">
            {data?.title}
          </h1>
          <h1 className="font-bold text-gray-500 text-base mt-1 mb-8">
            {formateDateString(data?.createdAt)}
          </h1>
          <p className="lg:text-lg text-gray-200 text-base font-normal">
            {parse(data?.content || "")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
