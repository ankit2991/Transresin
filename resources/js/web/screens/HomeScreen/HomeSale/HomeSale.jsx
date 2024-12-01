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

const HomeSale = ({ products }) => {
  return (
    <section className="">
      <div className="container mx-auto">
        <HomeHeading>Sale</HomeHeading>

        <div className="grid lg:grid-cols-5 grid-cols-2 gap-3 mb-5">
          {products?.map((product) => (
            <ProductGrid product={product} />
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
