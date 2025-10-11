import { FaBookReader, FaBook, FaLaptopCode } from "react-icons/fa";
import SkillBar from "react-skillbars";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import { useEffect, useState } from "react";
import increasePageCount from "../../../utils/IncreasePageVisitCount";

AOS.init();

const AboutMe = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      const timerId = setTimeout(() => increasePageCount("aboutMe"), 5000);
      return () => clearTimeout(timerId);
    }
  }, []);

  useEffect(() => {
    axiosPublic.get("all/personalInfo").then((res) => setData(res.data?.data));
    axiosPublic.get("all/skills").then((res) => setSkills(res.data?.data));
    axiosPublic.get("all/experience").then((res) => setExperience(res.data?.data));
  }, [axiosPublic]);

  const skill = skills?.map((item) => ({
    type: item.name,
    level: item.proficiency,
  }));

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div id="about-me" className="mb-16 px-4 overflow-x-hidden lg:px-16 text-white">
      {/* Profile */}
      <div className="flex flex-col items-center mt-20 lg:mt-32 text-center" data-aos="fade-up" data-aos-duration="3000">
        <div className="bg-yellow-400 w-52 h-52 lg:w-72 lg:h-72 rounded-full overflow-hidden flex justify-center items-center">
          <img src={data?.profilePic} alt={data?.name} className="w-full h-full object-contain" />
        </div>
        <h1 className="mt-5 lg:mt-8 text-4xl lg:text-6xl font-bold">{data?.name}</h1>
        <h2 className="mt-2 text-yellow-400 text-lg lg:text-xl font-semibold">{data?.title}</h2>
      </div>

      {/* About Me */}
      <div className="mt-12" data-aos="fade-zoom-in" data-aos-duration="2000">
        <h2 className="text-3xl lg:text-4xl font-bold text-yellow-500 mb-4">ABOUT ME</h2>
        <p className="text-gray-300 text-base lg:text-lg">{data?.bio}</p>
      </div>

      {/* Education & Skills */}
      <div className="flex flex-col lg:flex-row gap-8 mt-12">
        {/* Education */}
        <div data-aos="fade-right" data-aos-duration="2000" className="lg:w-1/2 bg-[#1C2229] rounded-3xl p-7 space-y-6">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">EDUCATION</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <FaBookReader className="text-4xl text-yellow-500 mt-1" />
              <div>
                <h3 className="text-gray-200 font-bold">2020 - Current</h3>
                <p className="text-gray-200 font-semibold">B. Sc. In Geography And Environment</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaBook className="text-4xl text-yellow-500 mt-1" />
              <div>
                <h3 className="text-gray-200 font-bold">2018 - 2020</h3>
                <p className="text-gray-200 font-semibold">H.S.C (Science)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaBook className="text-4xl text-yellow-500 mt-1" />
              <div>
                <h3 className="text-gray-200 font-bold">2016 - 2018</h3>
                <p className="text-gray-200 font-semibold">S.S.C (Science)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div data-aos="fade-left" data-aos-duration="2000" className="lg:w-1/2 bg-[#1C2229] rounded-3xl p-7">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">SKILLS</h2>
          <SkillBar skills={skill} height="40px" animationDelay={0} />
        </div>
      </div>

      {/* Experience */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-yellow-500 text-5xl font-bold mb-2">EXPERIENCE</h2>
          <p className="text-white text-xl font-semibold">What I have done?</p>
        </div>
        <div className="flex flex-col gap-8">
          {experience?.map((item) => (
            <div key={item.id} className="bg-[#1C2229] rounded-3xl p-6 flex flex-col lg:flex-row gap-6 lg:gap-10 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0">
                <FaLaptopCode className="text-5xl text-yellow-500" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-gray-300 font-bold">{formatDate(item.startDate)} To {formatDate(item.endDate)}</h3>
                <h2 className="text-yellow-500 text-xl font-bold">{item.role}</h2>
                <a href={item.companyWebsiteUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500 hover:underline">{item.companyName}</a>
                <p className="text-gray-300 mt-2">{item.description}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-bold mr-2">Technologies:</span>
                  {item.technologies?.map((tech) => (
                    <span key={tech} className="bg-gray-700 px-2 py-1 rounded-full text-sm">{tech}</span>
                  ))}
                </div>
                {item.certificate && (
                  <a href={item.certificate} target="_blank" rel="noreferrer" className="inline-block mt-3 text-yellow-400 font-bold hover:underline">
                    Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
