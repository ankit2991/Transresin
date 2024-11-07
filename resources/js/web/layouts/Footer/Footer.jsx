import React from "react";
import { BiCalculator, BiCreditCard, BiRupee } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { CiBank, CiDeliveryTruck } from "react-icons/ci";
import { FaLocationDot, FaLocationPin } from "react-icons/fa6";
import { GiIndiaGate } from "react-icons/gi";
import HomeHeading from "../../components/HomeHeading";
import { FaLongArrowAltRight } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <section className="py-16">
                <div className="container mx-auto">
                    <HomeHeading>WHY CHOOSE TRANSRESIN?</HomeHeading>

                    <div className="grid lg:grid-cols-4 grid-cols-2 text-center text-primary-300">
                        <div>
                            <img
                                src="/images/why-1.png"
                                alt=""
                                loading="lazy"
                                className="size-24 object-contain inline-block"
                            />
                            <h4 className="mt-3 text-2xl">Safe</h4>
                        </div>
                        <div>
                            <img
                                src="/images/why-2.png"
                                alt=""
                                loading="lazy"
                                className="size-24 object-contain inline-block"
                            />
                            <h4 className="mt-3 text-2xl">Quality</h4>
                        </div>
                        <div>
                            <img
                                src="/images/why-3.png"
                                alt=""
                                loading="lazy"
                                className="size-24 object-contain inline-block"
                            />
                            <h4 className="mt-3 text-2xl">Easy</h4>
                        </div>
                        <div>
                            <img
                                src="/images/why-4.png"
                                alt=""
                                loading="lazy"
                                className="size-24 object-contain inline-block"
                            />
                            <h4 className="mt-3 text-2xl">Beautiful</h4>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto">
                    <img src="/images/trans1.png" alt="" className="w-full" />
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto">
                    <div className="bg-secondary p-10 rounded-lg">
                        <div className="text-center text-primary-300">
                            <h3 className="font-bold text-3xl">
                                SUBSCRIBE TO OUR EMAIL
                            </h3>
                            <p className="text-sm">
                                BE THE FIRST TO KNOW ABOUT NEW PRODUCTS AND
                                OFFERS
                            </p>
                        </div>

                        <div className="flex items-center border-primary-300 border-solid border-2 rounded-3xl max-w-md mx-auto my-5">
                            <input
                                type="email"
                                className="grow bg-transparent px-5 py-3 text-primary-300 outline-none placeholder:text-primary-300"
                                placeholder="Email"
                            />
                            <span className="px-3 text-3xl text-primary-300">
                                <FaLongArrowAltRight />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-16 text-center">
                <div className="flex gap-10 justify-center">
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
            </section>
            <footer className="bg-primary-300 text-white">
                <div className="py-3 px-3 border-white border-b-[1px]">
                    <span className="size-6 bg-white rounded-full text-primary-300 inline-flex justify-center items-center text-lg font-bold">
                        tr
                    </span>
                    &nbsp; &gt; Home
                </div>
                <div className="py-16 container mx-auto">
                    <div className="grid lg:grid-cols-4 gap-10">
                        <div>
                            <h4 className="font-bold mb-3 text-xl">
                                Products By Application
                            </h4>
                            <ul className="m-0 p-0">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Adhesives and Sealants
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Art Resin (Casting and Coating)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Coatings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Construction Chemicals
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Encapsulating Resins
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Flooring Solutions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Inks, Dyes, Colors and Fillers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Metal Coatings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Speciality Paints
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Stone Chemicals
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Waterproofing Solutions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Wood Coatings
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-3 text-xl">
                                Products Category
                            </h4>
                            <ul className="m-0 p-0">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Adhesives and Sealants
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Art Resin (Casting and Coating)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Coatings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Construction Chemicals
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Encapsulating Resins
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Flooring Solutions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Inks, Dyes, Colors and Fillers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Metal Coatings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Speciality Paints
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Stone Chemicals
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Waterproofing Solutions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Wood Coatings
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-3 text-xl">
                                Industry Category
                            </h4>
                            <ul className="m-0 p-0">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Adhesives and Sealants
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Art Resin (Casting and Coating)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Coatings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Construction Chemicals
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Encapsulating Resins
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Flooring Solutions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Inks, Dyes, Colors and Fillers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Metal Coatings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Speciality Paints
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Stone Chemicals
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Waterproofing Solutions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Wood Coatings
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-3 text-xl">Brands</h4>
                            <ul className="m-0 p-0">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Adhesives and Sealants
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Art Resin (Casting and Coating)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Coatings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Construction Chemicals
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Encapsulating Resins
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Flooring Solutions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Inks, Dyes, Colors and Fillers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Metal Coatings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Speciality Paints
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Stone Chemicals
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Waterproofing Solutions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Wood Coatings
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="py-5 mt-10 border-y-4 border-blue-500">
                        <div className="grid grid-cols-4 gap-10">
                            <div className="flex items-center gap-3">
                                <div className="size-12 bg-white rounded-full flex justify-center items-center text-primary-300 text-3xl">
                                    <FaLocationDot />
                                </div>
                                <div>27756 PIN Codes Covered</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-12 bg-white rounded-full flex justify-center items-center text-primary-300 text-3xl">
                                    <BsTruck />
                                </div>
                                <div>Fast Shipping</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-12 bg-white rounded-full flex justify-center items-center text-primary-300 text-3xl">
                                    <CiDeliveryTruck />
                                </div>
                                <div>On Time Deliveries</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-12 bg-white rounded-full flex justify-center items-center text-primary-300 text-3xl">
                                    <GiIndiaGate />
                                </div>
                                <div>PAN India Service</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-12 bg-white rounded-full flex justify-center items-center text-primary-300 text-3xl">
                                    <BiRupee />
                                </div>
                                <div>COD cash on delivery</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-12 bg-white rounded-full flex justify-center items-center text-primary-300 text-3xl">
                                    <BiCreditCard />
                                </div>
                                <div>Credit / Debit Card</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-12 bg-white rounded-full flex justify-center items-center text-primary-300 text-3xl">
                                    <CiBank />
                                </div>
                                <div>Net Banking</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-12 bg-white rounded-full flex justify-center items-center text-primary-300 text-3xl">
                                    <BiCalculator />
                                </div>
                                <div>EMI</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-blue-500 border-b-4 py-5">
                        <div className="grid lg:grid-cols-4 gap-3">
                            <div className="grid grid-cols-4 gap-3">
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/en/thumb/6/65/BHIM_SVG_Logo.svg/1024px-BHIM_SVG_Logo.svg.png"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://cdn.icon-icons.com/icons2/2699/PNG/512/upi_logo_icon_169316.png"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS82g8mkrlMMiQ17FGj5_VQAQ-P2gHUyXhYIQ&s"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/77/Razorpay_logo.png"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://download.logo.wine/logo/Paytm/Paytm-Logo.wine.png"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://i.pinimg.com/736x/1e/44/12/1e4412694927683d28fc28a6de2c5738.jpg"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6p205YdtduLTFU5Ls0hdeiAklk4BeA435Nw&s"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1024px-Visa_Inc._logo.svg.png"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLmCw9KwTMuJOlqCjSQ8StSY7qg0gMtohnqA&s"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_VemUxgztGV4ggToCRRDxGE334P-7wQ_Tqw&s"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://images.seeklogo.com/logo-png/52/1/airtel-money-tanzania-logo-png_seeklogo-527192.png"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/FreeCharge_Logo.png/799px-FreeCharge_Logo.png"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0586/5429/4206/files/MobiKwik-Logo-png_480x480.png?v=1665042477"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Zest_logo.png/1200px-Zest_logo.png"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYBSzuF0t4PuGV-wo0VRiX6drdfRqCOrkX-A&s"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                                <div className="bg-white p-3 rounded">
                                    <img
                                        src="https://d6xcmfyh68wv8.cloudfront.net/assets/affordibility/paylater/paylater.png"
                                        alt=""
                                        className="w-full h-[20px] object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-10 flex text-sm text-blue-300 justify-between">
                        <div>
                            Copyright &copy; 2024 Trans Oceanic Chemicals
                            Private Limited. All rights reserved.
                        </div>
                        <div>
                            <a href="">Privacy Policy</a> |{" "}
                            <a href="">Terms of Use</a> |{" "}
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
