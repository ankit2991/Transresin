import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import HomeHeading from "../../../web/components/HomeHeading";

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const items = [
    {
      title: "Product by Application",
      content: ["Content 1.1", "Content 1.2", "Content 1.3"],
    },
    {
      title: "Product Category",
      content: ["Content 2.1", "Content 2.2"],
    },
    {
      title: "Industry Category",
      content: ["Content 3.1", "Content 3.2", "Content 3.3", "Content 3.4"],
    },
    {
      title: "Brands",
      content: ["Content 1.1", "Content 1.2", "Content 1.3"],
    },
    {
      title: "Others",
      content: ["Content 2.1", "Content 2.2"],
    },
    {
      title: "Contact Us",
      content: ["Content 3.1", "Content 3.2", "Content 3.3", "Content 3.4"],
    },
    {
      title: "Business",
      content: ["Content 3.1", "Content 3.2", "Content 3.3", "Content 3.4"],
    },
    {
      title: "Dealership / Distributorship Indquiry",
      content: ["Content 3.1", "Content 3.2", "Content 3.3", "Content 3.4"],
    },
  ];
  return (
    <>
      <section className="py-5">
        <div className="container mx-auto">
          <HomeHeading>WHY CHOOSE TRANSRESIN?</HomeHeading>

          <div className="grid grid-cols-4  text-center text-primary-300">
            <div>
              <img
                src="/images/why-1.png"
                alt=""
                loading="lazy"
                className="size-12 lg:size-16 object-contain inline-block"
              />
              <h4 className="mt-3 text-lg lg:text-2xl">Safe</h4>
            </div>
            <div>
              <img
                src="/images/why-2.png"
                alt=""
                loading="lazy"
                className="size-12 lg:size-16 object-contain inline-block"
              />
              <h4 className="mt-3 text-lg lg:text-2xl">Quality</h4>
            </div>
            <div>
              <img
                src="/images/why-3.png"
                alt=""
                loading="lazy"
                className="size-12 lg:size-16 object-contain inline-block"
              />
              <h4 className="mt-3 text-lg lg:text-2xl">Easy</h4>
            </div>
            <div>
              <img
                src="/images/why-4.png"
                alt=""
                loading="lazy"
                className="size-12 lg:size-16 object-contain inline-block"
              />
              <h4 className="mt-3 text-lg lg:text-2xl">Beautiful</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container mx-auto">
          {/* <img src="/images/trans1.png" alt="" className="w-full" /> */}
          <div className="bg-secondary py-5 px-2 rounded-lg">
            <div className="grid grid-cols-3 gap-5 items-center [&>div>img]:inline text-center">
              <div>
                <img
                  src="/images/five-star.png"
                  alt=""
                  className="max-w-full h-16 object-contain"
                />
              </div>
              <div>
                <img
                  src="/images/make-in-india.png"
                  alt=""
                  className="max-w-full h-16 object-contain"
                />
              </div>
              <div>
                <img
                  src="/images/secure-payment.png"
                  alt=""
                  className="max-w-full h-16 object-contain"
                />
              </div>
              <div>
                <img
                  src="/images/34year.png"
                  alt=""
                  className="max-w-full h-16 object-contain"
                />
              </div>
              <div>
                <img
                  src="/images/google-verified.png"
                  alt=""
                  className="max-w-full h-16 object-contain"
                />
              </div>
              <div>
                <img
                  src="/images/global-shipping.png"
                  alt=""
                  className="max-w-full h-16 object-contain"
                />
              </div>
              <div>
                <img
                  src="/images/ssl-secure.png"
                  alt=""
                  className="max-w-full h-16 object-contain"
                />
              </div>
              <div>
                <img
                  src="/images/total_quality.png"
                  alt=""
                  className="max-w-full h-16 object-contain"
                />
              </div>
              <div>
                <img
                  src="/images/fast-order.png"
                  alt=""
                  className="max-w-full h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container mx-auto">
          <div className="bg-secondary py-5 px-10 rounded-lg">
            <div className="text-center text-primary-300">
              <h3 className="font-bold text-base">SUBSCRIBE TO OUR EMAIL</h3>
              <p className="text-[10px] md:text-sm font-semibold">
                BE THE FIRST TO KNOW ABOUT NEW PRODUCTS AND OFFERS
              </p>
            </div>

            <div className="flex items-center border-primary-300 border-solid border-2 rounded-3xl max-w-md mx-auto mt-5">
              <input
                type="email"
                className="grow bg-transparent px-5 py-1 text-primary-300 outline-none placeholder:text-primary-300"
                placeholder="Email"
              />
              <span className="px-3 text-3xl text-primary-300">
                <FaLongArrowAltRight />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className=" text-center">
        <div className="flex gap-5 justify-center [&>a>img]:size-8 [&>a>img]:object-contain">
          <a href="#" target="_blank">
            <img src="/images/fb.png" alt="" />
          </a>
          <a href="#" target="_blank">
            <img src="/images/insta.png" alt="" />
          </a>
          <a href="#" target="_blank">
            <img src="/images/yt.png" alt="" />
          </a>
          <a href="#" target="_blank">
            <img src="/images/pin.png" alt="" />
          </a>
        </div>
        <div className="text-center mt-2 text-lg text-primary-600">
          like follow and subscribe
        </div>
      </section>

      <footer>
        <div className="py-5 container mx-auto">
          <ul className="mobile-footer-links text-sm">
            {items.map((item, index) => (
              <li key={index}>
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-1 text-left focus:outline-none flex justify-between items-center"
                >
                  <span>{item.title}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-3 h-3 transform ${
                      openIndex === index ? "rotate-180" : ""
                    } transition-transform`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {/* Accordion Content */}
                {openIndex === index && (
                  <ul className="px-4 py-2 bg-white text-gray-700 list-disc pl-5">
                    {item.content.map((subItem, subIndex) => (
                      <li key={subIndex}>{subItem}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="pt-5 pb-2 text-xs text-center flex flex-col gap-2 text-primary-300 font-semibold">
            <div>
              Copyright &copy; 2024 Trans Oceanic Chemicals Private Limited.{" "}
              <br />
              All rights reserved.
            </div>
            <div>
              <a href="">Privacy Policy</a> | <a href="">Terms of Use</a> |{" "}
              <a href="">Sales Policy</a> | <a href="">Legal</a> |{" "}
              <a href="">Site Map</a>
            </div>
            <div>INDIA</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
