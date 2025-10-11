"use client";
import { useEffect } from "react";

const Admin = () => {
  useEffect(() => {
    // Redirect to another website after 1.5 seconds for animation
    const timer = setTimeout(() => {
      window.location.href =
        "https://portfolio-dashboard-front-end.vercel.app";
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen lg:min-h-[70vh] rounded-md text-white">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-yellow-400 border-gray-300 rounded-full animate-spin mb-6"></div>

      {/* Text */}
      <p className="text-lg font-medium opacity-0 animate-fadeIn">
        Redirecting to dashboard...
      </p>

      {/* Tailwind custom animation */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Admin;
