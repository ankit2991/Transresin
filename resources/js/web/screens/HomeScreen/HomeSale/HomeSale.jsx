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

const HomeSale = () => {
    const sales = [
        {
            name: "Transbond MultiFill 1.8kg SET",
            reviews: 367,
            regularPrice: 2499,
            tradePrice: 1699,
            image: "/images/product2.png",
        },
        {
            name: "Transbond MultiFill 1.8kg SET",
            reviews: 367,
            regularPrice: 2499,
            tradePrice: 1699,
            image: "/images/product2.png",
        },
        {
            name: "Transbond MultiFill 1.8kg SET",
            reviews: 367,
            regularPrice: 2499,
            tradePrice: 1699,
            image: "/images/product2.png",
        },
        {
            name: "Transbond MultiFill 1.8kg SET",
            reviews: 367,
            regularPrice: 2499,
            tradePrice: 1699,
            image: "/images/product2.png",
        },
        {
            name: "Transbond MultiFill 1.8kg SET",
            reviews: 367,
            regularPrice: 2499,
            tradePrice: 1699,
            image: "/images/product2.png",
        },
    ];
    return (
        <section className="py-16">
            <div className="container mx-auto">
                <HomeHeading>Sale</HomeHeading>

                <div className="grid grid-cols-5 gap-5 mb-5">
                    {sales?.map((sale, index) => (
                        <div
                            key={index}
                            className="bg-yellow-100 p-3 rounded-lg"
                        >
                            <span className="bg-secondary px-3 py-1 rounded-lg">
                                SALE
                            </span>
                            <div className="py-3">
                                <img src={sale.image} alt={sale.name} />
                            </div>
                            <h3 className="font-bold ">{sale.name}</h3>
                            <div className="flex gap-2 items-center">
                                <div className="flex text-orange-400">
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarFill />
                                    <BsStarHalf />
                                </div>
                                <div>{sale.reviews} Reviews</div>
                            </div>
                            <div className="flex items-center gap-3 py-3">
                                <del className="text-gray-400">
                                    ₹{sale.regularPrice}
                                </del>
                                <big className="font-semibold text-primary-300 text-3xl">
                                    ₹{sale.tradePrice}
                                </big>
                            </div>
                            <div className="d-grid">
                                <button className="bg-secondary py-2 rounded-md font-bold w-full flex items-center justify-center gap-2 text-primary-300 hover:bg-primary-300 hover:text-white">
                                    <BsCartPlus /> Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/"
                        className="bg-secondary hover:bg-primary-300 hover:text-white px-4 py-2 rounded-md inline-flex items-center gap-1 font-bold"
                    >
                        More <BiChevronDown size={24} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeSale;
