import React, { useState } from "react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BiSolidStar } from "react-icons/bi";

const ProductDetail = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [products, setProducts] = useState([
        {
            image: "/images/product2.png",
        },
        {
            image: "/images/product2.png",
        },
        {
            image: "/images/product2.png",
        },
        {
            image: "/images/product2.png",
        },
        {
            image: "/images/product2.png",
        },
        {
            image: "/images/product2.png",
        },
        {
            image: "/images/product2.png",
        },
        {
            image: "/images/product2.png",
        },
        {
            image: "/images/product2.png",
        },
        {
            image: "/images/product2.png",
        },
    ]);

    return (
        <section className="py-16">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex gap-5">
                        {/* Thumbs Swiper -> store swiper instance */}
                        {/* It is also required to set watchSlidesProgress prop */}
                        <Swiper
                            modules={[Thumbs, FreeMode, Navigation]}
                            watchSlidesProgress
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            direction="vertical"
                            autoHeight
                            freeMode
                            loop
                            navigation
                            style={{
                                minWidth: 100,
                            }}
                        >
                            {products?.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="border rounded-xl"
                                        style={{
                                            minWidth: 100,
                                            minHeight: 100,
                                            maxWidth: 100,
                                            maxHeight: 100,
                                        }}
                                    >
                                        <img
                                            src="/images/product2.png"
                                            alt=""
                                            loading="lazy"
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Main Image */}
                        <Swiper
                            modules={[Thumbs, Autoplay]}
                            thumbs={{ swiper: thumbsSwiper }}
                            autoplay
                        >
                            {products?.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <div className="border rounded-xl">
                                        <img
                                            src="/images/product2.png"
                                            alt=""
                                            loading="lazy"
                                            className="w-full"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div>
                        <h1 className="text-primary-300 text-3xl font-bold">
                            Transbond MultiFill
                        </h1>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="text-primary-300 text-3xl">
                                    1.8 Kg SET
                                </div>
                                <div className="uppercase">
                                    1 Kg Resin + 800 Grams Hardners
                                </div>
                            </div>
                            <div className="flex items-center p-2 bg-white border rounded-lg gap-3">
                                <div className="text-3xl">4.5</div>
                                <div>
                                    <div className="flex gap-3 text-yellow-500">
                                        <BiSolidStar />
                                        <BiSolidStar />
                                        <BiSolidStar />
                                        <BiSolidStar />
                                        <BiSolidStar />
                                    </div>
                                    <div>367 Reviews</div>
                                </div>
                            </div>
                        </div>

                        <p className="mb-3 text-lg">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Ut ipsum cumque tenetur hic iusto perspiciatis
                            magni velit nemo delectus vero obcaecati nulla,
                            similique nihil aperiam quam ducimus esse corrupti
                            fugit?
                        </p>
                        <p className="mb-3 text-lg">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Deleniti hic ullam labore eos odit facere,
                            quae officiis dolorem non iste. Voluptate officiis
                            voluptatem deleniti distinctio blanditiis, dolores
                            animi sequi laboriosam?
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
