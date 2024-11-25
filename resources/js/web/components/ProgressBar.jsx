import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-100 border border-gray-300 rounded h-7">
      <div
        className="bg-orange-300 border-2 border-orange-500 h-7 rounded transition-all duration-300 -translate-y-[1px]"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
