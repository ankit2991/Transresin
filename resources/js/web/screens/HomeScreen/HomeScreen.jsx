import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import HomeHeading from "../../components/HomeHeading";
const ApplicationProducts = React.lazy(() => import("./ApplicationProducts"));
const HomeSale = React.lazy(() => import("./HomeSale"));

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "../../components/Fancybox";
import { BiPlayCircle } from "react-icons/bi";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { FaLongArrowAltRight } from "react-icons/fa";
import { PiFacebookLogoFill } from "react-icons/pi";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { menus } = useSelector((state) => state?.home);

  return (
    <div className="bg-gray-200">
      <section className="py-5 bg-gray-200 text-primary-300">
        <div className="container mx-auto">
          <div className="lg:flex items-center">
            <div className="flex-1">
              <div className="text-9xl">M12</div>
              <div className="text-xs">
                Small to Medium Size Casting Epoxy System
              </div>
              <div className="my-3">
                Starts from ₹<big className="text-2xl font-semibold">699</big>
              </div>
              <Link className="bg-secondary px-4 py-2 rounded-3xl shadow">
                Buy Now
              </Link>
            </div>
            <div className="flex-1">
              <img
                src="/images/product.png"
                alt=""
                className="max-h-96"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <ApplicationProducts />
        <HomeSale />
      </Suspense>

      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <HomeHeading>Videos</HomeHeading>
          <Fancybox>
            <div className="grid grid-cols-3 gap-5">
              <a
                href="https://www.youtube.com/watch?v=MdPemLJ99YI"
                className="rounded-lg overflow-hidden border relative gallery"
                data-fancybox="gallery"
              >
                <img
                  src="https://img.youtube.com/vi/MdPemLJ99YI/hqdefault.jpg"
                  alt=""
                />
                <div className="absolute start-0 end-0 top-0 bottom-0 bg-white bg-opacity-30 z-10  justify-center items-center flex">
                  <BiPlayCircle size={50} className="text-primary-300" />
                </div>
              </a>
              <a
                href="https://www.youtube.com/watch?v=RrIFAfXr4nw"
                className="rounded-lg overflow-hidden border relative gallery"
                data-fancybox="gallery"
              >
                <img
                  src="https://img.youtube.com/vi/RrIFAfXr4nw/hqdefault.jpg"
                  alt=""
                />
                <div className="absolute start-0 end-0 top-0 bottom-0 bg-white bg-opacity-30 z-10  justify-center items-center flex">
                  <BiPlayCircle size={50} className="text-primary-300" />
                </div>
              </a>
              <a
                href="https://www.youtube.com/watch?v=QRqjn959mmc"
                className="rounded-lg overflow-hidden border relative gallery"
                data-fancybox="gallery"
              >
                <img
                  src="https://img.youtube.com/vi/QRqjn959mmc/hqdefault.jpg"
                  alt=""
                />
                <div className="absolute start-0 end-0 top-0 bottom-0 bg-white bg-opacity-30 z-10  justify-center items-center flex">
                  <BiPlayCircle size={50} className="text-primary-300" />
                </div>
              </a>
            </div>
          </Fancybox>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <HomeHeading>REVIEWS</HomeHeading>

          <div className="grid lg:grid-cols-4 gap-10">
            <div className="bg-white rounded p-3 text-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
                className="w-40 h-40 object-cover rounded-full inline-block"
              />
              <h4 className="text-primary-300 font-bold my-5">
                "Best Non
                <br />
                Yellowing Resin"
              </h4>
              <div className="flex justify-center gap-1 text-yellow-500 mb-5">
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
              </div>
              <div className="text-primary-300 font-semibold">
                <div>Sudanshu</div>
                <div>Benguluru</div>
              </div>
            </div>

            <div className="bg-white rounded p-3 text-center">
              <img
                src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
                alt=""
                className="w-40 h-40 object-cover rounded-full inline-block"
              />
              <h4 className="text-primary-300 font-bold my-5">
                "Best Non
                <br />
                Yellowing Resin"
              </h4>
              <div className="flex justify-center gap-1 text-yellow-500 mb-5">
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
              </div>
              <div className="text-primary-300 font-semibold">
                <div>Sudanshu</div>
                <div>Benguluru</div>
              </div>
            </div>

            <div className="bg-white rounded p-3 text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s"
                alt=""
                className="w-40 h-40 object-cover rounded-full inline-block"
              />
              <h4 className="text-primary-300 font-bold my-5">
                "Best Non
                <br />
                Yellowing Resin"
              </h4>
              <div className="flex justify-center gap-1 text-yellow-500 mb-5">
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
              </div>
              <div className="text-primary-300 font-semibold">
                <div>Sudanshu</div>
                <div>Benguluru</div>
              </div>
            </div>

            <div className="bg-white rounded p-3 text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQao4gtNUPfkO2enJ9OjcbrpQR4qeF4DOzQ-g&s"
                alt=""
                className="w-40 h-40 object-cover rounded-full inline-block"
              />
              <h4 className="text-primary-300 font-bold my-5">
                "Best Non
                <br />
                Yellowing Resin"
              </h4>
              <div className="flex justify-center gap-1 text-yellow-500 mb-5">
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
              </div>
              <div className="text-primary-300 font-semibold">
                <div>Sudanshu</div>
                <div>Benguluru</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <HomeHeading>ABOUT US</HomeHeading>

          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <img
                src="/images/tans.png"
                alt=""
                className="w-full"
                loading="lazy"
              />
              <p className="m-0 mt-10 text-justify text-2xl">
                Trans Oceanic Chemicals Private Limited is Indian manufacturer
                of differentiated and specialty chemicals since 1989. Our
                chemical products number in the thousands and are sold worldwide
                to manufacturers serving a broad and diverse range of consumer
                and industrial end markets. We operate from a state of the art
                manufacturing, R&D and Operations facilities and are having
                export sales to approximately 30 countries through hundreds of
                our authorised channel partners.
              </p>
            </div>
            <div>
              <div className="grid lg:grid-cols-3 gap-10 text-center">
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    2
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    MANUFACTURING UNITS
                  </h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    2+
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    MANUFACTURING UNITS
                  </h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    30+
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    MANUFACTURING UNITS
                  </h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    2
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    MANUFACTURING UNITS
                  </h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    500+
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    CUSTOM DEVELOPMENT
                  </h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    2
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">PRODUCTS</h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    2
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    MANUFACTURING UNITS
                  </h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    2
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    MANUFACTURING UNITS
                  </h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    1M+
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    MANUFACTURING UNITS
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
