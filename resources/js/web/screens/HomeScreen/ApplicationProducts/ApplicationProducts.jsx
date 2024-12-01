import React, { useState } from "react";
import HomeHeading from "../../../components/HomeHeading";

const ApplicationProducts = ({ applications }) => {
  return (
    <section className=" bg-white">
      <div className="container mx-auto">
        <HomeHeading>Product By Application</HomeHeading>

        <div className="grid lg:grid-cols-6 grid-cols-3 lg:gap-16 gap-3 text-center">
          {applications?.map((app, index) => (
            <div key={index}>
              <img
                src={app.image}
                alt=""
                className="size-20 inline-block rounded-full"
              />
              <h5 className="mt-1 text-sm  text-primary-300 font-bold max-w-[100px] mx-auto">
                {app.name}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationProducts;
