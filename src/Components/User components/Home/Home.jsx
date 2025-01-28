import { Typewriter } from "react-simple-typewriter";
import saiful from "../../../../public/bgRemovedSaiful.png";
import download from "../../../../public/download.gif";
import cv from "../../../../public/Cv of Saiful islam .pdf";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();
const Home = () => {
  const words = [
    "Typescript",
    "Redux",
    "Next js",
    "Prisma",
    "Node js",
    "Postgres",
  ];
  return (
    <div className="flex lg:flex-row justify-start gap-8 lg:min-h-[calc(100vh-78px)] flex-col-reverse overflow-x-hidden">
      <div
        data-aos="fade-right"
        data-aos-duration="2000"
        className=" w-full lg:w-1/2  flex flex-col justify-center items-start  "
      >
        <h1 className="lg:text-6xl text-3xl font-bold">{"HI, I'M SAIFUL!"}</h1>
        {/* <h1 className="text-3xl font-bold">ENTHUSIAST IN WEB-APP DEVELOPMENT</h1> */}
        <div className="lg:text-5xl text-2xl mt-3 text-white font-bold">
          I Explored{" "}
          <span className="text-yellow-500">
            <Typewriter
              words={words}
              loop={0}
              cursor="show"
              deleteSpeed={100}
            ></Typewriter>
          </span>
        </div>
        <div className="mt-8">
          <h1 className="lg:text-2xl text-lg font-bold text-yellow-500">
            {"I'm Enthusiast in Web App."}
          </h1>
          <p className="lg:text-lg text-base my-5">
            I am from{" "}
            <span className="font-bold text-yellow-700">Bangladesh</span>. My
            digital playground includes Next.js, Node.js, and Prisma. I
            craft seamless user experiences with Redux and MongoDB, while my
            code dances to the rhythm of JavaScript. Explore my portfolio on{" "}
            <a
              className="text-yellow-600 underline font-bold"
              href="https://github.com/Saiful10400"
            >
              GitHub
            </a>{" "}
            to witness the fusion of passion and innovation.
          </p>
        </div>
        <div>
          <a href={cv}>
            <button className="btn btn-primary  bg-yellow-500 text-black border-none text-md lg:text-xl hover:bg-yellow-700">
              Download CV{" "}
              <img
                className="lg:w-[30px] w-[20px] lg:h-[30px] h-[20px]"
                src={download}
              />
            </button>
          </a>
        </div>
      </div>

      <div
        data-aos="fade-left"
        data-aos-duration="2000"
        className=" w-full lg:w-1/2 lg:mt-0 mt-32   flex justify-center items-center  "
      >
        <div className="lg:w-[500px] w-[300px]  lg:h-[500px] h-[300px] bg-yellow-400 flex justify-center overflow-hidden items-center rounded-full">
          <img className="w-full h-full object-contain" src={saiful} />
        </div>
      </div>
    </div>
  );
};

export default Home;
