import React from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";


export default function HomePage({ pendingCount = 0, closedCount = 0 }) {
    const navigate = useNavigate();
  
    return (
        <div>
        <NavBar />
      <div className=" grid grid-cols-3 gap-90 max-w-3xl mx-50 mt-10  py-30 items-center ">
        {/* Column 1 - Create New Claim */}
        <div className="border border-blue-950 flex flex-col items-center justify-center h-100 space-y-4 w-90">
          <button
            onClick={() => navigate("/create-claim")}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-950 text-white text-3xl shadow hover:bg-blue-900"
          >
            +
          </button>
          <div className="mt-2 font-medium ">Create New Claim</div>
        </div>
  
        {/* Column 2 - Pending Claims */}
        <div className="border border-blue-950 flex flex-col items-center justify-center h-100 space-y-4 w-90">
          <button
            onClick={() => navigate("/pending-claims")}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-yellow-500 text-white text-xl shadow hover:bg-yellow-600"
          >
            {pendingCount}
          </button>
          <div className="mt-2 font-medium">Pending Claims</div>
        </div>
  
        {/* Column 3 - Closed Claims */}
        <div className="border border-blue-950 flex flex-col items-center justify-center h-100 space-y-4 w-90">
          <button
            onClick={() => navigate("/closed-claims")}
            className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500 text-white text-xl shadow hover:bg-green-600"
          >
            {closedCount}
          </button>
          <div className="mt-2 font-medium">Closed Claims</div>
        </div>
      </div>
      </div>
    );
  }