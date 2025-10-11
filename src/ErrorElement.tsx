import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const ErrorElement = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#121121] text-white px-6 text-center">
            <AlertTriangle className="w-20 h-20 text-[#f4cb0d] mb-6 animate-bounce" />

            <h1 className="text-6xl font-extrabold mb-4 text-[#f4cb0d]">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
            <p className="text-gray-400 max-w-md mb-8">
                The page you’re looking for doesn’t exist or has been moved.
            </p>

            <button
                onClick={() => navigate("/")}
                className="bg-[#f4cb0d] text-[#121121] px-6 py-3 rounded-xl font-semibold hover:bg-[#e0b909] transition-all duration-300"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default ErrorElement;
