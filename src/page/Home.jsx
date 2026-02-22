import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReports } from "../utils/storage";

const Home = () => {
  const navigate = useNavigate();
  const [latestReports, setLatestReports] = useState([]);

  useEffect(() => {
    const reports = getReports();
    setLatestReports(reports.slice(0, 4));
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-20 relative"
      style={{
        backgroundImage: "url('/bg.jpg')", // 👈 apni image ka naam yaha daalo
      }}
    >
      {/* Dark Overlay for better readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl w-full text-white">

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          LOST AND FOUND MANAGEMENT SYSTEM
        </h1>

        <p className="text-lg md:text-xl italic mb-12 max-w-2xl mx-auto text-gray-200">
          "Every lost thing holds a story — let's bring those stories home again"
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
          
          <button
            onClick={() => navigate("/found-item")}
            className="px-10 py-3 rounded-xl bg-blue-600 text-white text-3xl font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Found Item
          </button>

          

        </div>

        {/* Reports Summary */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Reports Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <p className="text-lg font-semibold">
  All Lost Reports 
</p>

            <p className="text-4xl font-extrabold mt-4">
              --
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <p className="text-lg font-semibold">
  All  Found Reports 
</p>

            <p className="text-4xl font-extrabold mt-4">
              --
            </p>
          </div>

        </div>

 {/* Procedure Section */}
        <div className="mt-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-left max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-300 mb-6 text-center flex items-center justify-center gap-2">
            📜 Procedure You Have to Follow If You Found Something
          </h3>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed text-center">
            If you find any item or belonging within the campus, you must
            immediately take it to the <span className="font-semibold text-blue-400">Chief, proctorial boards members </span> 
             or submit it at the <span className="font-semibold text-blue-400">Chief’s office</span>. 
            Once the rightful owner claims the item, it will be returned to them. 
            As a token of appreciation, you will also be 
            <span className="font-semibold text-green-400"> rewarded </span> 
            for your honesty and responsible action.
          </p>

          {/* Icons Row */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl">🔍</span>
              <p className="mt-2 text-sm text-gray-300">Find the Item</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl">🏢</span>
              <p className="mt-2 text-sm text-gray-300">Submit to Chief’s Office</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl">🎁</span>
              <p className="mt-2 text-sm text-gray-300">Receive Your Reward</p>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default Home;
