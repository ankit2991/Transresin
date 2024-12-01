import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeHeading from "../../components/HomeHeading";
const ApplicationProducts = React.lazy(() => import("./ApplicationProducts"));
const HomeSale = React.lazy(() => import("./HomeSale"));

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "../../components/Fancybox";
import { BiPlayCircle } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import ApiExecute from "../../../api";
import Spinner from "../../components/Spinner";
import { createYT_Thumb } from "../../../utils/youtube";
import { FaYoutube } from "react-icons/fa";
// import { useSelector } from "react-redux";

const HomeScreen = () => {
  // const { menus } = useSelector((state) => state?.home);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let apiResponse = await ApiExecute("home");
      setLoading(false);
      if (apiResponse.status) setData(apiResponse.data);
    }
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="bg-white">
      <section className="py-5 bg-gray-200 text-primary-300 border-2 border-primary-300">
        <div className="container mx-auto">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="hidden md:block">
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
            </div>
            <div className="flex-[2] md:flex-1">
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
        <ApplicationProducts applications={data?.applications || []} />
        <HomeSale products={data?.products || []} />
      </Suspense>

      <section className=" bg-white">
        <div className="container mx-auto">
          <HomeHeading>Videos</HomeHeading>
          <Fancybox>
            <div className="grid lg:grid-cols-3 gap-5">
              {data?.videos?.map((video) => (
                <div key={video.id}>
                  <a
                    href={video.youtube_video_url}
                    className="rounded-lg overflow-hidden border relative gallery block"
                    data-fancybox="gallery"
                  >
                    <img
                      src={createYT_Thumb(video.youtube_video_url)}
                      alt=""
                      className="aspect-video w-full object-cover"
                    />
                    <div className="absolute start-0 end-0 top-0 bottom-0 bg-white bg-opacity-30 z-10  justify-center items-center flex">
                      <FaYoutube size={50} className="text-red-600" />
                    </div>
                  </a>
                  <div className="text-primary-300 text-xs">{video.title}</div>
                </div>
              ))}
            </div>
          </Fancybox>
        </div>
      </section>

      <section>
        <div className="container mx-auto">
          <HomeHeading>REVIEWS</HomeHeading>

          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-10 gap-3">
            {data?.reviews?.map((review) => (
              <div
                className="bg-gray-100 rounded-lg px-3 py-6 text-center"
                key={review.id}
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="size-20 object-cover rounded-full inline-block"
                />
                <h4 className="text-primary-300 font-bold my-5">
                  "{review.comment}"
                </h4>
                <div className="flex justify-center gap-1 text-yellow-500 mb-5">
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                  <BsFillStarFill />
                </div>
                <div className="text-primary-300 font-semibold">
                  <div>{review.name}</div>
                  <div>{review.place}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto">
          <HomeHeading>ABOUT US</HomeHeading>

          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <img
                src="/images/tans.png"
                alt=""
                className="w-full"
                loading="lazy"
              />
              <p className="m-0 mt-10 text-justify text-2xl font-bold">
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
              <div className="grid grid-cols-3 lg:gap-10 gap-3 text-sm lg:text-lg text-center">
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
                    RESEARCH LABORATORIES
                  </h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    30+
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    COUNTRIES EXPORT
                  </h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    34+
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    YEARS OF EXPERIENCE
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
                    950+
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">PRODUCTS</h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    3K+
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">CLIENTS</h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    5K+
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    UNITS SHIPPED EVERYDAY
                  </h4>
                </div>
                <div>
                  <div className="size-24 bg-primary-300 rounded-full inline-flex justify-center items-center text-3xl font-bold text-white ">
                    1M+
                  </div>
                  <h4 className="mt-3 text-primary-300 font-bold">
                    LAB EXPERIMENTS
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
