import React, { useState } from "react";
import HomeHeading from "../../../components/HomeHeading";
import { useSelector } from "react-redux";

const ApplicationProducts = () => {
  const { menus } = useSelector((state) => state?.home);
  // const [applications, setApplications] = useState([
  //     {
  //         icon: "/images/applications/1.png",
  //         name: "Adhesives & Sealants",
  //     },
  //     {
  //         icon: "/images/applications/2.png",
  //         name: "Stone Chemicals",
  //     },
  //     {
  //         icon: "/images/applications/3.png",
  //         name: "Casting Resin",
  //     },
  //     {
  //         icon: "/images/applications/4.png",
  //         name: "Wood Coating",
  //     },
  //     {
  //         icon: "/images/applications/5.png",
  //         name: "Adhesives & Sealants",
  //     },
  //     {
  //         icon: "/images/applications/6.png",
  //         name: "Adhesives & Sealants",
  //     },
  //     {
  //         icon: "/images/applications/7.png",
  //         name: "Adhesives & Sealants",
  //     },
  //     {
  //         icon: "/images/applications/8.png",
  //         name: "Adhesives & Sealants",
  //     },
  //     {
  //         icon: "/images/applications/9.png",
  //         name: "Adhesives & Sealants",
  //     },
  //     {
  //         icon: "/images/applications/10.png",
  //         name: "Adhesives & Sealants",
  //     },
  //     {
  //         icon: "/images/applications/11.png",
  //         name: "Adhesives & Sealants",
  //     },
  //     {
  //         icon: "/images/applications/12.png",
  //         name: "Adhesives & Sealants",
  //     },
  // ]);
  const applications =
    menus?.filter((menu) => menu.slug === "product-application")[0]?.data || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <HomeHeading>Product By Application</HomeHeading>

        <div className="grid lg:grid-cols-6 grid-cols-3 lg:gap-16 gap-3 text-center">
          {applications.map((app, index) => (
            <div key={index}>
              <img
                src={app.image}
                alt=""
                className="size-20 inline-block rounded-full"
              />
              <h5 className="mt-1">{app.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationProducts;
