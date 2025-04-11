import { Map, Marker } from "pigeon-maps";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { HiPhone } from "react-icons/hi2";
import swal from "sweetalert";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import increasePageCount from "../../../utils/IncreasePageVisitCount";

// ..
AOS.init();
const Contact = () => {
  const [number, setnumber] = useState(null);

  useEffect(() => {
    const num1 = Math.ceil(Math.random() * 10);
    const num2 = Math.ceil(Math.random() * 10);
    const whichicon = num1 % 2;
    if (whichicon === 0) {
      const icon = "x";
      const result = num1 * num2;
      setnumber({ num1, num2, result, icon });
    } else {
      const icon = "+";
      const result = num1 + num2;
      setnumber({ num1, num2, result, icon });
    }
  }, []);


    // increase visit count
    useEffect(()=>{
      if(localStorage.getItem("role")) return
      const timerId=setTimeout(() => {
        increasePageCount("contact")
      }, 5000);
      return ()=>clearTimeout(timerId)
    })

  const formHandle = (e) => {
    e.preventDefault();
    swal("Good job!", "Your message sended successfully.", "success");
  };



  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(null);
  useEffect(() => {
    axiosPublic.get("all/personalInfo").then((res) => setData(res.data?.data));
  }, [axiosPublic]);


 


  return (
    <div className="pt-32 min-h-screen text-white mb-8 overflow-x-hidden">
      <div className="h-[10vh]">
        <h1 className="text-5xl font-bold text-center">Contact</h1>
      </div>
      <div>
        <div className="overflow-hidden">
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="rounded-xl overflow-hidden"
          >
            <Map
              height={300}
              defaultCenter={[23.23101256092309, 90.94636215063503]}
              defaultZoom={11}
            >
              <Marker
                width={50}
                anchor={[23.23101256092309, 90.94636215063503]}
              />
            </Map>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mt-6 gap-52">
          <div
            data-aos="fade-right"
            data-aos-duration="2000"
            className="lg:w-[30%]"
          >
            <div>
              <h1 className="text-4xl font-bold">{data?.name}</h1>
              <h1 className="text-2xl font-bold my-3">
              {data?.title}
              </h1>
            </div>
            <div className="flex flex-col gap-8 mt-10 pr-10">
              <div className="flex  items-start gap-2 ">
                <FaMapMarkerAlt className="text-3xl text-yellow-500"></FaMapMarkerAlt>
                <div>
                  <h1 className="text-2xl font-bold">Address</h1>
                  <h1 className="text-lg font-medium">
                  {data?.address}
                  </h1>
                </div>
              </div>
              <div className="flex  items-start gap-2 ">
                <AiOutlineMail className="text-3xl text-yellow-500"></AiOutlineMail>
                <div>
                  <h1 className="text-2xl font-bold">E-mail</h1>
                  <h1 className="text-lg font-medium">
                  {data?.email}
                  </h1>
                </div>
              </div>
              <div className="flex  items-start gap-2 ">
                <HiPhone className="text-3xl text-yellow-500"></HiPhone>
                <div>
                  <h1 className="text-2xl font-bold">Phone</h1>
                  <h1 className="text-lg font-medium">+880 {data?.phone}</h1>
                </div>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            className="lg:w-[70%]"
          >
            <form onSubmit={formHandle} className="flex flex-col gap-6">
              <label htmlFor="name">
                <h1 className="mb-5 ml-2 font-normal">Your name</h1>
                <input
                  required
                  id="name"
                  type="text"
                  className="bg-[#1C222A] w-full focus:outline-none text-xl py-4 px-5 border-white border rounded-full"
                />
              </label>
              <label htmlFor="email">
                <h1 className="mb-5 ml-2 font-normal">Your Email</h1>
                <input
                  required
                  id="email"
                  type="email"
                  className="bg-[#1C222A] w-full focus:outline-none text-xl py-4 px-5 border-white border rounded-full"
                />
              </label>
              <label htmlFor="subject">
                <h1 className="mb-5 ml-2 font-normal">Subject</h1>
                <input
                  required
                  id="subject"
                  type="text"
                  className="bg-[#1C222A] w-full focus:outline-none text-xl py-4 px-5 border-white border rounded-full"
                />
              </label>
              <label htmlFor="message">
                <h1 className="mb-5 ml-2 font-normal">
                  Your message (optional)
                </h1>
                <textarea
                  id="message"
                  className=" rounded-3xl bg-[#1C222A] w-full focus:outline-none text-xl py-4 px-5 border-white border"
                  required
                  name="message"
                
                  cols="30"
                  rows="10"
                ></textarea>
              </label>
              <label htmlFor="sum">
                <h1 className="mb-5 ml-2 font-normal">
                  {number?.num1} {number?.icon} {number?.num2}
                </h1>
                <input
                  required
                  id="sum"
                  type="number"
                  className="bg-[#1C222A] w-full focus:outline-none text-xl py-4 px-5 border-white border rounded-full"
                />
              </label>
              <div>
                <button className="btn btn-primary bg-yellow-600 rounded-full text-white border-none">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
