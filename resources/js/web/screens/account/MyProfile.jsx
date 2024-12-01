import React from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state?.auth);
  return (
    <div className="p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-4 space-y-5">
        <p className="flex">
          <strong className="font-bold flex-1">Name:</strong>
          <div className="flex-[3]">
            {user?.first_name + " " + (user?.last_name || "")}
          </div>
        </p>
        <p className="flex">
          <strong className="font-bold flex-1">Email:</strong>
          <div className="flex-[3]">{user?.email || ""}</div>
        </p>
        <p className="flex">
          <strong className="font-bold flex-1">Contact No.:</strong>
          <div className="flex-[3]">{user?.mobile || "N/A"}</div>
        </p>
        {/* <button className="mt-4 bg-primary-300 text-white px-4 py-2 rounded hover:bg-primary-600">
          Edit Profile
        </button> */}
      </div>
    </div>
  );
};

export default MyProfile;
