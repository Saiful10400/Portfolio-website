import { Typewriter } from "react-simple-typewriter";
import saiful from "../../../../public/bgRemovedSaifulv2.png";
import download from "../../../../public/download.gif";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { useEffect } from "react";
import increasePageCount from "../../../utils/IncreasePageVisitCount";

AOS.init();

const Home = () => {
  const words = ["Typescript", "Redux", "Next.js", "Prisma ORM", "Node.js", "Postgres"];

  // increase visit count
  useEffect(() => {
    if (localStorage.getItem("role")) return;
    const timerId = setTimeout(() => increasePageCount("home"), 5000);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col-reverse lg:flex-row items-center lg:justify-end lg:min-h-[calc(90vh-78px)] px-4 lg:px-16 overflow-x-hidden"
    >
      {/* Text Section */}
      <div data-aos="fade-right" data-aos-duration="2000" className="lg:w-1/2 flex flex-col justify-center items-start mt-12 lg:mt-0">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
          Hi, I&apos;m <span className="text-yellow-500">Saiful!</span>
        </h1>
        <h2 className="mt-4 text-2xl lg:text-4xl font-bold text-gray-300">
          Proficient in{" "}
          <span className="text-yellow-400">
            <Typewriter words={words} loop={0} cursor="|" deleteSpeed={100} />
          </span>
        </h2>
        <p className="mt-6 text-gray-300 text-base lg:text-lg leading-relaxed">
          I am from <span className="font-bold text-yellow-600">Bangladesh</span>. My digital playground includes Next.js, Node.js, and Prisma. I craft seamless user experiences with Redux and MongoDB, while my code dances to the rhythm of JavaScript. Explore my portfolio on{" "}
          <a href="https://github.com/Saiful10400" target="_blank" rel="noreferrer" className="text-yellow-500 underline font-bold">
            GitHub
          </a>
        </p>
        <a href="https://drive.google.com/file/d/1Xox2zFyJTpf4ur1sq4OAkFJn1fYD_zcf/view?usp=drive_link" target="_blank" rel="noreferrer" className="mt-8 inline-block">
          <button className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg text-lg transition-all shadow-lg">
            Download Resume
            <img src={download} alt="Download" className="w-6 h-6 lg:w-8 lg:h-8" />
          </button>
        </a>
      </div>

      {/* Image Section */}
      <div data-aos="fade-left" data-aos-duration="2000" className="lg:w-1/2 flex justify-end items-end mt-16 lg:mt-0">
        <div className="relative w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-yellow-400 flex justify-center items-center shadow-2xl overflow-hidden">
          <img src={saiful} alt="Saiful" className="w-full h-full object-contain" />
          <div className="absolute inset-0 rounded-full border-4 border-yellow-500 animate-pulse opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default Home;
