import React from "react";
import HomeHeading from "../../../components/HomeHeading";
import {
  BsArrowDown,
  BsCartPlus,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import ProductGrid from "../../../components/ProductGrid";

const HomeSale = () => {
  const sales = [
    {
      name: "Transbond MultiFill 1.8kg SET",
      reviews: 367,
      regular_price: 2499,
      trade_price: 1699,
      image: "/images/product2.png",
    },
    {
      name: "Transbond MultiFill 1.8kg SET",
      reviews: 367,
      regular_price: 2499,
      trade_price: 1699,
      image: "/images/product2.png",
    },
    {
      name: "Transbond MultiFill 1.8kg SET",
      reviews: 367,
      regular_price: 2499,
      trade_price: 1699,
      image: "/images/product2.png",
    },
    {
      name: "Transbond MultiFill 1.8kg SET",
      reviews: 367,
      regular_price: 2499,
      trade_price: 1699,
      image: "/images/product2.png",
    },
    {
      name: "Transbond MultiFill 1.8kg SET",
      reviews: 367,
      regular_price: 2499,
      trade_price: 1699,
      image: "/images/product2.png",
    },
  ];
  return (
    <section className="">
      <div className="container mx-auto">
        <HomeHeading>Sale</HomeHeading>

        <div className="grid lg:grid-cols-5 grid-cols-2 gap-3 mb-5">
          {sales?.map((sale, index) => (
            <ProductGrid product={sale} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="bg-secondary hover:bg-primary-300 hover:text-white px-10 py-2 rounded-md text-center uppercase items-center font-bold inline-flex text-primary-300"
          >
            More <BiChevronDown size={24} className="mx-auto" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSale;
