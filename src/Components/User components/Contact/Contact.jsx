"use client";
import { Map, Marker } from "pigeon-maps";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { HiPhone } from "react-icons/hi2";
import swal from "sweetalert";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../customHoocks/useAxiosPublic";
import increasePageCount from "../../../utils/IncreasePageVisitCount";

AOS.init();

const Contact = () => {
  const [captcha, setCaptcha] = useState(null);
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState(null);

  useEffect(() => {
    const num1 = Math.ceil(Math.random() * 10);
    const num2 = Math.ceil(Math.random() * 10);
    const icon = num1 % 2 === 0 ? "×" : "+";
    const result = icon === "+" ? num1 + num2 : num1 * num2;
    setCaptcha({ num1, num2, result, icon });
  }, []);

  // Increase page visit count
  useEffect(() => {
    if (!localStorage.getItem("role")) {
      const timerId = setTimeout(() => {
        increasePageCount("contact");
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, []);

  useEffect(() => {
    axiosPublic.get("all/personalInfo").then((res) => setData(res.data?.data));
  }, [axiosPublic]);

  const formHandle = (e) => {
    e.preventDefault();
    swal("Good job!", "Your message was sent successfully.", "success");
  };

  return (
    <div id="contact" className="pt-32 min-h-screen bg-[#111122] text-white px-4 lg:px-0 overflow-x-hidden">
      <h1 className="text-5xl lg:text-6xl font-bold text-center mb-16" data-aos="fade-down">
        Contact
      </h1>

      {/* Map Section */}
      <div className="overflow-hidden rounded-xl shadow-xl mb-16" data-aos="fade-up" data-aos-duration="2000">
        <Map height={350} defaultCenter={[23.23101256092309, 90.94636215063503]} defaultZoom={11}>
          <Marker width={50} anchor={[23.23101256092309, 90.94636215063503]} />
        </Map>
      </div>

      {/* Info + Form */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Personal Info */}
        <div className="lg:w-1/3 space-y-10" data-aos="fade-right" data-aos-duration="2000">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold">{data?.name}</h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-yellow-400 mt-2">{data?.title}</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-3xl text-yellow-500 mt-1" />
              <div>
                <h3 className="text-2xl font-bold">Address</h3>
                <p className="text-lg font-medium">{data?.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <AiOutlineMail className="text-3xl text-yellow-500 mt-1" />
              <div>
                <h3 className="text-2xl font-bold">Email</h3>
                <p className="text-lg font-medium">{data?.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <HiPhone className="text-3xl text-yellow-500 mt-1" />
              <div>
                <h3 className="text-2xl font-bold">Phone</h3>
                <p className="text-lg font-medium">+880 {data?.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-2/3" data-aos="fade-left" data-aos-duration="2000">
          <form onSubmit={formHandle} className="flex flex-col gap-6">
            {["name", "email", "subject"].map((field) => (
              <label key={field} htmlFor={field} className="flex flex-col gap-2">
                <span className="ml-2 text-lg capitalize">{field.replace("-", " ")}</span>
                <input
                  required
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  className="bg-[#1C222A] w-full text-white text-lg py-4 px-5 rounded-full border border-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                />
              </label>
            ))}

            <label htmlFor="message" className="flex flex-col gap-2">
              <span className="ml-2 text-lg">Your message</span>
              <textarea
                required
                id="message"
                rows={6}
                className="bg-[#1C222A] w-full text-white text-lg py-4 px-5 rounded-3xl border border-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              ></textarea>
            </label>

            {captcha && (
              <label htmlFor="sum" className="flex flex-col gap-2">
                <span className="ml-2 text-lg">
                  {captcha.num1} {captcha.icon} {captcha.num2} = ?
                </span>
                <input
                  required
                  id="sum"
                  type="number"
                  className="bg-[#1C222A] w-full text-white text-lg py-4 px-5 rounded-full border border-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                />
              </label>
            )}

            <button
              type="submit"
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg py-4 px-10 rounded-full transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
