import { FaBookReader } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import SkillBar from "react-skillbars";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLaptopCode } from "react-icons/fa";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import { useEffect, useState } from "react";
AOS.init();
const AboutMe = () => {
  // const skill = [
  //   { type: "Html", level: 95 },
  //   { type: "Css", level: 87 },
  //   { type: "Javascript", level: 80 },
  //   { type: "React", level: 75 },
  //   { type: "Node js", level: 60 },
  //   { type: "Mongo db", level: 72 },
  // ];

  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState(null);
  useEffect(() => {
    axiosPublic.get("all/personalInfo").then((res) => setData(res.data?.data));
    axiosPublic.get("all/skills").then((res) => setSkills(res.data?.data));
    axiosPublic
      .get("all/experience")
      .then((res) => setExperience(res.data?.data));
  }, [axiosPublic]);

  const skill = skills?.map((item) => ({
    type: item.name,
    level: item.proficiency,
  }));

  console.log(experience);

  const formateDate = (dateString) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, "0"); // Add leading zero if needed
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getUTCFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  return (
    <div className="mb-8">
      <div className="overflow-y-hidden">
        <div
          data-aos="fade-up"
          data-aos-duration="3000"
          className="flex justify-center items-center flex-col "
        >
          <div className="bg-yellow-400 w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] mt-20 lg:mt-40 rounded-full overflow-hidden flex justify-center">
            <img
              className="w-full h-full object-contain"
              src={data?.profilePic}
              alt=""
            />
          </div>
          <h1 className="mt-3 text-3xl lg:text-[65px] lg:mt-7 font-bold">
            {data?.name}
          </h1>
          <h1 className=" text-md lg:text-lg mt-4 font-semibold text-yellow-400">
            {data?.title}
          </h1>
        </div>
      </div>
      {/* about me sectin */}
      <div data-aos="fade-zoom-in" data-aos-duration="2000" className="mt-8">
        <h1 className="text-2xl lg:text-2xl font-bold text-yellow-500">
          ABOUT ME
        </h1>
        <p className="text-base font-bold">{data?.bio}</p>
      </div>
      {/* education and skills. */}
      <div className="overflow-x-hidden">
        <div className="flex lg:flex-row flex-col lg:gap-8 gap-4 mt-9">
          <div
            data-aos="fade-right"
            data-aos-duration="2000"
            className="lg:w-1/2 bg-[#1C2229] rounded-3xl min-h-[300px] p-7"
          >
            <h1 className="text-3xl font-bold text-yellow-500">EDUCATION</h1>
            <div className="mt-7 flex flex-col gap-6">
              <div className="flex flex-col">
                <FaBookReader className="text-4xl text-yellow-500"></FaBookReader>
                <h1 className="text-base mt-2 font-bold text-gray-200">
                  2020 - current
                </h1>
                <h1 className="text-xl font-bold text-gray-200">
                  B. Sc. In Geography And Environment
                </h1>
              </div>
              <div className="flex flex-col">
                <FaBook className="text-4xl text-yellow-500"></FaBook>
                <h1 className="text-base mt-2 font-bold text-gray-200">
                  2018 - 2020
                </h1>
                <h1 className="text-xl font-bold text-gray-200">
                  H.S.C (science)
                </h1>
              </div>
              <div className="flex flex-col">
                <FaBook className="text-4xl text-yellow-500"></FaBook>
                <h1 className="text-base mt-2 font-bold text-gray-200">
                  2016 - 2018
                </h1>
                <h1 className="text-xl font-bold text-gray-200">
                  S.S.C (science)
                </h1>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            className="lg:w-1/2 bg-[#1C2229] rounded-3xl min-h-[300px] p-7"
          >
            <h1 className="text-3xl font-bold text-yellow-500">SKILLS</h1>
            <div>
              <div className="mt-7">
                <SkillBar animationDelay={0} skills={skill} height={"44px"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* experience section. */}
      <div>
        <div className="my-6 text-center mt-24">
          <h1 className="text-yellow-500 text-5xl font-bold">EXPERIENCE</h1>
          <h1 className="text-2xl text-white font-semibold">
            what i have done?
          </h1>
        </div>

        {/* map experience. */}

        <div className="flex flex-col gap-5">
          {experience?.map((item) => {
            return (
              <div key={item.id}>
                <div className="bg-[#1C2229] rounded-3xl p-7 flex gap-16 justify-start items-start">
                  <div className="">
                    <FaLaptopCode className="text-5xl text-yellow-500" />
                  </div>
                  <div className="w-[90%]">
                    <h1 className="text-base font-bold">
                      {formateDate(item.startDate)} To{" "}
                      {formateDate(item.endDate)}
                    </h1>
                    <h1 className="text-xl mt-3 font-bold">{item.role}</h1>
                    <a
                      target="blank"
                      href={item.companyWebsiteUrl}
                      className="text-lg hover:text-blue-500  hover:underline font-normal"
                    >
                      {item.companyName}
                    </a>
                    <p className="text-md mt-4 font-thin">{item.description}</p>

                    <div className="text-md flex items-center gap-2  mt-4 font-thin">
                      <h1 className="text-xl font-bold">Worked with:</h1>
                      <div className="flex items-center gap-2 flex-wrap">
                        {item?.technologies?.map((item) => (
                          <span
                            className="bg-gray-700 px-1 rounded-sm"
                            key={item}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={item.certificate}
                      target="blank"
                      className="text-xl text-[#eab308] font-bold"
                    >
                      Certificate
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
