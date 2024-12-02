import React, { useEffect, useState } from "react";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import {
  BiFilter,
  BiPlayCircle,
  BiShareAlt,
  BiSolidCheckCircle,
  BiSolidStar,
  BiSolidStarHalf,
} from "react-icons/bi";
import InputSpinner from "../../components/InputSpinner";
import {
  FaAngleDown,
  FaAngleUp,
  FaHeartCirclePlus,
  FaThumbsUp,
} from "react-icons/fa6";
import HomeHeading from "../../components/HomeHeading";
import Fancybox from "../../components/Fancybox";
import ProgressBar from "../../components/ProgressBar";
import Dropdown from "../../components/Dropdown";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import ApiExecute from "../../../api";
import ReviewModal from "./ReviewModal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import StarRating from "../../../admin/components/StarRating";

const ProductDetail = () => {
  const { slug } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [qty, setQty] = useState(1);
  const [activeSize, setActiveSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state?.auth);

  const handleReviewSubmit = async (reviewData) => {
    let response = await ApiExecute("review", {
      method: "POST",
      data: reviewData,
    });

    if (response.status) {
      toast.success(response.data?.message);
    } else {
      toast.warning("Oooops! Something went wrong, please try again.");
    }
    // try {
    //   const response = await fetch('/api/reviews', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(reviewData),
    //   });
    //   if (!response.ok) throw new Error('Failed to submit review');
    //   alert('Review submitted successfully!');
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  const handleWriteReview = () => {
    if (isLoggedIn && user?.role === "user") {
      setIsModalOpen(true);
    } else {
      toast.info("You need to log in to write a review!");
    }
  };

  useEffect(() => {
    if (!slug) return;

    async function fetchProductInfo() {
      setIsLoading(true);

      let apiResponse = await ApiExecute(`web/product/${slug}`);

      if (apiResponse.status) {
        setProduct(apiResponse.data);
      }
    }

    fetchProductInfo();
  }, [slug]);

  return (
    <section className="lg:py-16">
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
        product_id={product?.id}
      />
      <div className="container mx-auto">
        <div className="lg:grid lg:grid-cols-5 lg:gap-5">
          <div className="lg:flex lg:gap-5 lg:col-span-3">
            {/* Thumbs Swiper -> store swiper instance */}
            {/* It is also required to set watchSlidesProgress prop */}
            {!isMobile && (
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
                navigation={{
                  nextEl: ".custom-next-icon",
                  prevEl: ".custom-prev-icon",
                }}
                style={{
                  minWidth: 150,
                  position: "relative",
                  paddingTop: 30,
                }}
                className="hidden lg:block"
              >
                {product?.product_images
                  ?.filter((pImg) => pImg.image_type === "thumb")
                  ?.map((product, index) => (
                    <SwiperSlide key={index}>
                      <div className="border rounded-xl size-[150px]">
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          className="object-contain w-full h-[150px] bg-gray-100"
                        />
                      </div>
                    </SwiperSlide>
                  ))}

                {/* Vertical Navigation Buttons */}
                <div
                  className="custom-prev-icon text-primary-300"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                  }}
                >
                  <FaAngleUp size={40} />
                </div>
                <div
                  className="custom-next-icon text-primary-300"
                  style={{
                    position: "absolute",
                    bottom: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                  }}
                >
                  <FaAngleDown size={40} />
                </div>
              </Swiper>
            )}

            {/* Main Image */}
            <Swiper
              modules={[Thumbs, Autoplay, Pagination]}
              thumbs={{ swiper: thumbsSwiper }}
              autoplay
              pagination={
                isMobile
                  ? {
                      clickable: true, // Allows clicking on pagination bullets
                      el: ".custom-pagination", // Custom class for the pagination
                    }
                  : false
              }
              className="relative"
            >
              {product?.product_images
                ?.filter((pImg) => pImg.image_type === "main")
                ?.map((product, index) => (
                  <SwiperSlide key={index} className="h-full">
                    <div className="border rounded-xl h-full">
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="w-full h-full object-contain bg-gray-100"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              <div className="custom-pagination " />
            </Swiper>
          </div>
          <div className="lg:col-span-2 mt-5 lg:mt-0">
            <h1 className="text-primary-300 text-4xl lg:text-5xl font-semibold">
              {product?.name}
            </h1>
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-primary-300 text-2xl font-bold">
                  {product?.packages[activeSize].name}
                </div>
                <div className="uppercase text-primary-300 text-[10px] font-bold">
                  {product?.packages[activeSize].composition}
                </div>
              </div>
              <div className="flex items-center py-[1px] px-1 bg-white border border-primary-300 rounded-lg gap-1 text-primary-300 font-bold">
                <div className="text-2xl">{product?.average_rating}</div>
                <div>
                  <div className="flex gap-1 text-yellow-500">
                    <BiSolidStar size={10} />
                    <BiSolidStar size={10} />
                    <BiSolidStar size={10} />
                    <BiSolidStar size={10} />
                    <BiSolidStar size={10} />
                  </div>
                  <div className="text-[10px]">
                    {product?.reviews?.length} Reviews
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 lg:grid-cols-8 gap-5 [&>div>img]:size-10 [&>div>img]:inline my-10 text-center uppercase text-[8px] leading-[100%] text-primary-300 font-bold">
              {product?.features?.map((feature, index) => (
                <div key={index}>
                  <img src={feature.image} alt="" />
                  <div className="mt-1">{feature.name}</div>
                </div>
              ))}
            </div>

            <div
              className="text-sm text-primary-300 font-bold editor-content"
              dangerouslySetInnerHTML={{ __html: product?.description1 }}
            ></div>

            <div className="flex items-center gap-5 uppercase font-bold text-primary-300 text-center text-xs my-10">
              <div className="text-sm">Suitable For: </div>
              {product?.materials?.map((mat, index) => (
                <div key={index}>
                  <img src={mat.image} alt="" className="h-10 inline" />
                  <div>{mat.name}</div>
                </div>
              ))}
            </div>

            <div className="text-primary-300 font-bold uppercase">
              <div className="mb-2 text-sm">
                Packaging Size: {product?.packages[activeSize].name}
              </div>
              <div className="flex gap-2">
                {product?.packages?.map((size, index) => (
                  <button
                    key={index}
                    className={`border-2 border-${
                      index === activeSize ? "primary-300" : "transparent"
                    } px-3 py-1 rounded-full bg-gray-100 text-xl`}
                    onClick={() => setActiveSize(index)}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="my-10 flex uppercase gap-3 items-center">
              <div className=" text-primary-300 font-bold text-sm">
                <div className="mb-2">Quantity</div>
                <InputSpinner qty={qty} setQty={setQty} />
              </div>
              <div className="ms-auto">
                <div className="text-lg lg:text-2xl font-bold text-center text-gray-300">
                  ₹.{product?.packages[activeSize]?.regular_price}
                </div>
                <div className="flex bg-pink-300 gap-2 items-center text-white px-3 py-1 rounded">
                  <div className="flex flex-col text-[8px] leading-[8px] text-end">
                    <div>You</div>
                    <div>Save</div>
                  </div>
                  <div className="font-bold text-sm lg:text-xl">
                    <span className="text-sm">₹</span>
                    {product?.packages[activeSize]?.regular_price -
                      product?.packages[activeSize]?.trade_price}
                  </div>
                </div>
              </div>
              <div className="text-4xl lg:text-6xl text-red-600 font-bold">
                <span className="text-3xl">₹</span>
                {product?.packages[activeSize]?.trade_price}
              </div>
            </div>

            <div className="flex gap-2 uppercase">
              <button
                type="button"
                className="bg-pink-300 text-white text-center px-2 rounded-lg"
              >
                <FaHeartCirclePlus size={48} className="inline" />
                <div>Wishlist</div>
              </button>
              <button
                type="button"
                className="bg-secondary text-primary-300 hover:bg-primary-300 hover:text-white grow rounded-lg font-bold text-xl lg:text-3xl"
              >
                Add To Cart
              </button>
              <button className="bg-orange-400 px-5 rounded-lg text-white text-xl lg:text-3xl font-bold">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Product Instruction */}
        <div>
          <HomeHeading>Instruction & Technical Details</HomeHeading>
          <div className="text-center text-primary-300 mb-10 text-xl">
            Mix Well Seperately Before Combining Part-A & Part-B
          </div>

          <div className="grid lg:grid-cols-4 grid-cols-2 gap-10">
            <div>
              <img
                src="/images/product-instruction-1.png"
                alt=""
                className="w-full"
              />
              <div className="text-primary-300 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi accusantium autem odio voluptatibus blanditiis quisquam
                dignissimos, sapiente nisi vitae molestias
              </div>
            </div>
            <div>
              <img
                src="/images/product-instruction-2.png"
                alt=""
                className="w-full"
              />
              <div className="text-primary-300 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi accusantium autem odio voluptatibus blanditiis quisquam
                dignissimos, sapiente nisi vitae molestias
              </div>
            </div>
            <div>
              <img
                src="/images/product-instruction-3.png"
                alt=""
                className="w-full"
              />
              <div className="text-primary-300 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi accusantium autem odio voluptatibus blanditiis quisquam
                dignissimos, sapiente nisi vitae molestias
              </div>
            </div>
            <div>
              <img
                src="/images/product-instruction-4.png"
                alt=""
                className="w-full"
              />
              <div className="text-primary-300 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi accusantium autem odio voluptatibus blanditiis quisquam
                dignissimos, sapiente nisi vitae molestias
              </div>
            </div>
          </div>

          <div className="text-center my-10">
            <img
              src="/images/product-instruction.png"
              alt=""
              className="inline h-56"
            />
          </div>

          <div
            className="text-primary-300 mb-10 editor-content"
            dangerouslySetInnerHTML={{ __html: product?.description2 }}
          ></div>

          <div className="text-primary-300 mb-10">
            <h3 className="font-bold text-2xl">Available Packagings</h3>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
              {product?.packages?.map((pkg, index) => (
                <div key={index}>
                  <img
                    src="/images/small-size.png"
                    alt="Small Size"
                    className="w-full aspect-square object-contain object-bottom"
                  />
                  <div className="bg-gray-200 text-primary-300 font-bold text-center py-2 rounded-full my-3 text-2xl">
                    {pkg.name}
                  </div>
                  <div>
                    {pkg.composition}
                    {/* 300 Gram Resin
                    <br />
                    150 Grams Hardener */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="text-primary-300 mb-10 editor-content"
            dangerouslySetInnerHTML={{ __html: product?.description3 }}
          ></div>

          <div>
            <HomeHeading>Video Related To Products</HomeHeading>
            <Fancybox>
              <div className="grid lg:grid-cols-3 gap-5">
                <div>
                  <a
                    href="https://www.youtube.com/watch?v=MdPemLJ99YI"
                    className="rounded-lg overflow-hidden border relative gallery block"
                    data-fancybox="gallery"
                  >
                    <img
                      src="https://img.youtube.com/vi/MdPemLJ99YI/hqdefault.jpg"
                      alt=""
                      className="aspect-video w-full"
                    />
                    <div className="absolute start-0 end-0 top-0 bottom-0 bg-white bg-opacity-30 z-10  justify-center items-center flex">
                      <BiPlayCircle size={50} className="text-primary-300" />
                    </div>
                  </a>
                  <div className="text-primary-300 text-xs">
                    TransFloor Epoxy Flooring Solution - Complete Process Video
                  </div>
                </div>
                <div>
                  <a
                    href="https://www.youtube.com/watch?v=RrIFAfXr4nw"
                    className="rounded-lg overflow-hidden border relative gallery block"
                    data-fancybox="gallery"
                  >
                    <img
                      src="https://img.youtube.com/vi/RrIFAfXr4nw/hqdefault.jpg"
                      alt=""
                      className="aspect-video w-full"
                    />
                    <div className="absolute start-0 end-0 top-0 bottom-0 bg-white bg-opacity-30 z-10  justify-center items-center flex">
                      <BiPlayCircle size={50} className="text-primary-300" />
                    </div>
                  </a>
                  <div className="text-primary-300 text-xs">
                    TransFloor Epoxy Flooring Solution - Complete Process Video
                  </div>
                </div>

                <div>
                  <a
                    href="https://www.youtube.com/watch?v=QRqjn959mmc"
                    className="rounded-lg overflow-hidden border relative gallery block"
                    data-fancybox="gallery"
                  >
                    <img
                      src="https://img.youtube.com/vi/QRqjn959mmc/hqdefault.jpg"
                      alt=""
                      className="aspect-video w-full"
                    />
                    <div className="absolute start-0 end-0 top-0 bottom-0 bg-white bg-opacity-30 z-10  justify-center items-center flex">
                      <BiPlayCircle size={50} className="text-primary-300" />
                    </div>
                  </a>
                  <div className="text-primary-300 text-xs">
                    TransFloor Epoxy Flooring Solution - Complete Process Video
                  </div>
                </div>
              </div>
            </Fancybox>
          </div>

          <div>
            <HomeHeading>Reviews</HomeHeading>

            <div className="grid lg:grid-cols-12 gap-5">
              <div className="lg:col-span-3 text-primary-300 px-10 lg:px-0">
                <div className="flex gap-3">
                  <div className="font-bold grow">
                    <div className="text-xl">Customer Reviews</div>
                    <div className="flex gap-2 ">
                      <div className="flex text-orange-400 text-xl">
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStarHalf />
                      </div>
                      <div>4.2 out of 5</div>
                    </div>
                  </div>
                  <div className="text-6xl font-bold">4.2</div>
                </div>
                <div className="text-gray-400">367 Global Ratings</div>

                <div className="space-y-3 mt-5 font-bold">
                  <div className="flex items-center gap-3">
                    <div>5 Star</div>
                    <div className="grow">
                      <ProgressBar progress={51} />
                    </div>
                    <div>51%</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>4 Star</div>
                    <div className="grow">
                      <ProgressBar progress={22} />
                    </div>
                    <div>22%</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>3 Star</div>
                    <div className="grow">
                      <ProgressBar progress={11} />
                    </div>
                    <div>11%</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>2 Star</div>
                    <div className="grow">
                      <ProgressBar progress={5} />
                    </div>
                    <div>05%</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>1 Star</div>
                    <div className="grow">
                      <ProgressBar progress={12} />
                    </div>
                    <div>12%</div>
                  </div>
                </div>

                <div className="py-5 my-5 border-t border-b font-bold">
                  <h3 className="text-3xl">Review This Product</h3>
                  <p>Share your thoughts with other customers</p>

                  <div className="mt-3 grid">
                    <button
                      type="button"
                      className="text-2xl bg-primary-300 text-white py-5 rounded-lg hover:bg-primary-600"
                      onClick={handleWriteReview}
                    >
                      Write a Product Review
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-9 lg:border-s-2 lg:ps-5">
                <div className="border-b text-primary-300">
                  <div className="grid grid-cols-12">
                    <div className="flex col-span-8 gap-5">
                      <div className="lg:text-2xl font-bold pb-2 border-b-4 border-primary-300">
                        Reviews ({product?.reviews?.length || 0})
                      </div>
                      <div className="lg:text-2xl  pb-2">
                        Questions ({product?.faqs?.length || 0})
                      </div>
                    </div>
                    <div className="col-span-4">
                      <h3 className="lg:text-2xl font-bold pb-2">Sort</h3>
                    </div>
                  </div>
                </div>
                <div className=" text-primary-300">
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-8">
                      <div className="flex items-center gap-1 py-5">
                        <button
                          type="button"
                          className="bg-primary-300 text-white flex items-center gap-1 lg:gap-2 px-3 py-2 rounded-lg text-xs lg:text-lg font-bold hover:bg-primary-600 me-3"
                        >
                          <BiFilter size={isMobile ? 20 : 30} /> Filters
                        </button>

                        <div className="flex flex-wrap gap-1">
                          <button
                            type="button"
                            className="bg-gray-200 py-2 px-2 lg:px-5 lg:rounded-full rounded-lg text-orange-400"
                          >
                            <BiSolidStar size={isMobile ? 12 : 15} />
                          </button>

                          <button
                            type="button"
                            className="bg-gray-200 py-2 px-2 lg:px-5 lg:rounded-full rounded-lg text-orange-400 flex items-center"
                          >
                            <BiSolidStar size={isMobile ? 12 : 15} />
                            <BiSolidStar size={isMobile ? 12 : 15} />
                          </button>

                          <button
                            type="button"
                            className="bg-gray-200 py-2 px-2 lg:px-5 lg:rounded-full rounded-lg text-orange-400 flex items-center"
                          >
                            <BiSolidStar size={isMobile ? 12 : 15} />
                            <BiSolidStar size={isMobile ? 12 : 15} />
                            <BiSolidStar size={isMobile ? 12 : 15} />
                          </button>

                          <button
                            type="button"
                            className="bg-gray-200 py-2 px-2 lg:px-5 lg:rounded-full rounded-lg text-orange-400 flex items-center"
                          >
                            <BiSolidStar size={isMobile ? 12 : 15} />
                            <BiSolidStar size={isMobile ? 12 : 15} />
                            <BiSolidStar size={isMobile ? 12 : 15} />
                            <BiSolidStar size={isMobile ? 12 : 15} />
                          </button>

                          <button
                            type="button"
                            className="bg-gray-200 py-2 px-2 lg:px-5 lg:rounded-full rounded-lg text-orange-400 flex items-center"
                          >
                            <BiSolidStar size={isMobile ? 12 : 15} />
                            <BiSolidStar size={isMobile ? 12 : 15} />
                            <BiSolidStar size={isMobile ? 12 : 15} />
                            <BiSolidStar size={isMobile ? 12 : 15} />
                            <BiSolidStar size={isMobile ? 12 : 15} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <Dropdown
                        items={[
                          "Most Recent",
                          "Oldest",
                          "Most Helpful",
                          "Photos & Videos",
                          "Highest Rating",
                          "Lowest Rating",
                          "Least Helpful",
                        ]}
                      />
                    </div>
                  </div>
                </div>

                {product?.reviews?.map((review) => (
                  <div
                    className="grid lg:grid-cols-12 lg:gap-5 border-t pt-10 mb-10"
                    key={review.id}
                  >
                    <div className="lg:col-span-3 lg:text-center flex gap-3 lg:block items-center">
                      <img
                        src="/images/user.png"
                        alt=""
                        className="size-20 lg:size-36 inline"
                      />
                      <div className="grow font-semibold">
                        <div className="text-primary-300">
                          {review?.user?.name}
                        </div>
                        <div className="text-pink-600 flex items-center lg:justify-center gap-1">
                          Verified Buyer <BiSolidCheckCircle size={20} />
                        </div>
                        <div className="flex lg:justify-center text-xl">
                          <StarRating rating={review.rating} />
                        </div>
                        <div className="text-xs lg:text-base text-gray-400">
                          {moment(review.created_at).fromNow()}
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-9 text-primary-300 mt-2 lg:mt-0">
                      {/* <h5 className="text-base lg:text-lg font-bold">
                        Best Quality with No Fumes
                      </h5> */}
                      <div className="text-xs lg:text-base lg:text-justify mb-3 font-semibold">
                        {review.review}
                      </div>

                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {/* {JSON.stringify(review.images)} */}
                        {review?.images?.map((img) => (
                          <div>
                            <img
                              src={`/storage/${img.src}`}
                              alt=""
                              className="aspect-square bg-gray-200 rounded object-contain"
                            />
                          </div>
                        ))}
                        {/* <div>
                          <img
                            src="/images/product2.png"
                            alt=""
                            className="aspect-square bg-gray-200 rounded object-contain"
                          />
                        </div>
                        <div>
                          <img
                            src="/images/product2.png"
                            alt=""
                            className="aspect-square bg-gray-200 rounded object-contain"
                          />
                        </div>
                        <div>
                          <img
                            src="/images/product2.png"
                            alt=""
                            className="aspect-square bg-gray-200 rounded object-contain"
                          />
                        </div> */}
                        {/* {!isMobile && (
                          <div>
                            <img
                              src="/images/product2.png"
                              alt=""
                              className="aspect-square bg-gray-200 rounded object-contain"
                            />
                          </div>
                        )} */}
                      </div>

                      <div className="flex items-center gap-3 font-bold">
                        <button className="flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-300 text-white lg:py-2 py-1 lg:px-5 px-2 text-xs lg:text-2xl">
                          Helpful <FaThumbsUp />
                        </button>
                        <div className="grow text-pink-600 text-xs lg:text-base">
                          56 peoples found this helpful
                        </div>
                        <button className="bg-primary-300 text-white hover:bg-primary-600 lg:px-5 px-2 lg:py-2 py-1 flex items-center text-xs lg:text-2xl rounded-lg gap-2">
                          Share <BiShareAlt />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* <div className="grid lg:grid-cols-12 lg:gap-5 border-t pt-10 mb-10">
                  <div className="lg:col-span-3 lg:text-center flex gap-3 lg:block items-center">
                    <img
                      src="/images/user.png"
                      alt=""
                      className="size-20 lg:size-36 inline"
                    />
                    <div className="grow font-semibold">
                      <div className="text-primary-300">Sudanshu</div>
                      <div className="text-pink-600 flex items-center lg:justify-center gap-1">
                        Verified Buyer <BiSolidCheckCircle size={20} />
                      </div>
                      <div className="flex text-orange-400 lg:justify-center text-xl">
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                      </div>
                      <div className="text-xs lg:text-base text-gray-400">
                        1 week ago
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-9 text-primary-300 mt-2 lg:mt-0">
                    <h5 className="text-base lg:text-lg font-bold">
                      Best Quality with No Fumes
                    </h5>
                    <p className="text-xs lg:text-base lg:text-justify mb-3 font-semibold">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime, eos numquam quis sunt saepe voluptas? Similique
                      voluptate ad blanditiis rem ipsam. Debitis, nam quo.
                      Commodi quas dolore voluptatibus nobis eos!
                    </p>

                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      {!isMobile && (
                        <div>
                          <img
                            src="/images/product2.png"
                            alt=""
                            className="aspect-square bg-gray-200 rounded object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 font-bold">
                      <button className="flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-300 text-white lg:py-2 py-1 lg:px-5 px-2 text-xs lg:text-2xl">
                        Helpful <FaThumbsUp />
                      </button>
                      <div className="grow text-pink-600 text-xs lg:text-base">
                        56 peoples found this helpful
                      </div>
                      <button className="bg-primary-300 text-white hover:bg-primary-600 lg:px-5 px-2 lg:py-2 py-1 flex items-center text-xs lg:text-2xl rounded-lg gap-2">
                        Share <BiShareAlt />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 lg:gap-5 border-t pt-10 mb-10">
                  <div className="lg:col-span-3 lg:text-center flex gap-3 lg:block items-center">
                    <img
                      src="/images/user.png"
                      alt=""
                      className="size-20 lg:size-36 inline"
                    />
                    <div className="grow font-semibold">
                      <div className="text-primary-300">Sudanshu</div>
                      <div className="text-pink-600 flex items-center lg:justify-center gap-1">
                        Verified Buyer <BiSolidCheckCircle size={20} />
                      </div>
                      <div className="flex text-orange-400 lg:justify-center text-xl">
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                      </div>
                      <div className="text-xs lg:text-base text-gray-400">
                        1 week ago
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-9 text-primary-300 mt-2 lg:mt-0">
                    <h5 className="text-base lg:text-lg font-bold">
                      Best Quality with No Fumes
                    </h5>
                    <p className="text-xs lg:text-base lg:text-justify mb-3 font-semibold">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime, eos numquam quis sunt saepe voluptas? Similique
                      voluptate ad blanditiis rem ipsam. Debitis, nam quo.
                      Commodi quas dolore voluptatibus nobis eos!
                    </p>

                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      {!isMobile && (
                        <div>
                          <img
                            src="/images/product2.png"
                            alt=""
                            className="aspect-square bg-gray-200 rounded object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 font-bold">
                      <button className="flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-300 text-white lg:py-2 py-1 lg:px-5 px-2 text-xs lg:text-2xl">
                        Helpful <FaThumbsUp />
                      </button>
                      <div className="grow text-pink-600 text-xs lg:text-base">
                        56 peoples found this helpful
                      </div>
                      <button className="bg-primary-300 text-white hover:bg-primary-600 lg:px-5 px-2 lg:py-2 py-1 flex items-center text-xs lg:text-2xl rounded-lg gap-2">
                        Share <BiShareAlt />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 lg:gap-5 border-t pt-10 mb-10">
                  <div className="lg:col-span-3 lg:text-center flex gap-3 lg:block items-center">
                    <img
                      src="/images/user.png"
                      alt=""
                      className="size-20 lg:size-36 inline"
                    />
                    <div className="grow font-semibold">
                      <div className="text-primary-300">Sudanshu</div>
                      <div className="text-pink-600 flex items-center lg:justify-center gap-1">
                        Verified Buyer <BiSolidCheckCircle size={20} />
                      </div>
                      <div className="flex text-orange-400 lg:justify-center text-xl">
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                      </div>
                      <div className="text-xs lg:text-base text-gray-400">
                        1 week ago
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-9 text-primary-300 mt-2 lg:mt-0">
                    <h5 className="text-base lg:text-lg font-bold">
                      Best Quality with No Fumes
                    </h5>
                    <p className="text-xs lg:text-base lg:text-justify mb-3 font-semibold">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime, eos numquam quis sunt saepe voluptas? Similique
                      voluptate ad blanditiis rem ipsam. Debitis, nam quo.
                      Commodi quas dolore voluptatibus nobis eos!
                    </p>

                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      {!isMobile && (
                        <div>
                          <img
                            src="/images/product2.png"
                            alt=""
                            className="aspect-square bg-gray-200 rounded object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 font-bold">
                      <button className="flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-300 text-white lg:py-2 py-1 lg:px-5 px-2 text-xs lg:text-2xl">
                        Helpful <FaThumbsUp />
                      </button>
                      <div className="grow text-pink-600 text-xs lg:text-base">
                        56 peoples found this helpful
                      </div>
                      <button className="bg-primary-300 text-white hover:bg-primary-600 lg:px-5 px-2 lg:py-2 py-1 flex items-center text-xs lg:text-2xl rounded-lg gap-2">
                        Share <BiShareAlt />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 lg:gap-5 border-t pt-10 mb-10">
                  <div className="lg:col-span-3 lg:text-center flex gap-3 lg:block items-center">
                    <img
                      src="/images/user.png"
                      alt=""
                      className="size-20 lg:size-36 inline"
                    />
                    <div className="grow font-semibold">
                      <div className="text-primary-300">Sudanshu</div>
                      <div className="text-pink-600 flex items-center lg:justify-center gap-1">
                        Verified Buyer <BiSolidCheckCircle size={20} />
                      </div>
                      <div className="flex text-orange-400 lg:justify-center text-xl">
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                        <BiSolidStar />
                      </div>
                      <div className="text-xs lg:text-base text-gray-400">
                        1 week ago
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-9 text-primary-300 mt-2 lg:mt-0">
                    <h5 className="text-base lg:text-lg font-bold">
                      Best Quality with No Fumes
                    </h5>
                    <p className="text-xs lg:text-base lg:text-justify mb-3 font-semibold">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime, eos numquam quis sunt saepe voluptas? Similique
                      voluptate ad blanditiis rem ipsam. Debitis, nam quo.
                      Commodi quas dolore voluptatibus nobis eos!
                    </p>

                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="aspect-square bg-gray-200 rounded object-contain"
                        />
                      </div>
                      {!isMobile && (
                        <div>
                          <img
                            src="/images/product2.png"
                            alt=""
                            className="aspect-square bg-gray-200 rounded object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 font-bold">
                      <button className="flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-300 text-white lg:py-2 py-1 lg:px-5 px-2 text-xs lg:text-2xl">
                        Helpful <FaThumbsUp />
                      </button>
                      <div className="grow text-pink-600 text-xs lg:text-base">
                        56 peoples found this helpful
                      </div>
                      <button className="bg-primary-300 text-white hover:bg-primary-600 lg:px-5 px-2 lg:py-2 py-1 flex items-center text-xs lg:text-2xl rounded-lg gap-2">
                        Share <BiShareAlt />
                      </button>
                    </div>
                  </div>
                </div> */}

                {/* <div className="grid grid-cols-12 gap-5 border-t pt-10 mb-10">
                  <div className="col-span-3 text-center">
                    <img
                      src="/images/user.png"
                      alt=""
                      className="size-36 inline"
                    />
                    <div className="text-primary-300">Sudanshu</div>
                    <div className="text-pink-600 flex items-center justify-center gap-1">
                      Verified Buyer <BiSolidCheckCircle size={20} />
                    </div>
                    <div className="flex text-orange-400 justify-center text-xl">
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                    </div>
                    <div className="text-center text-gray-400">1 week ago</div>
                  </div>
                  <div className="col-span-9 text-primary-300">
                    <h5 className="text-lg font-bold">
                      Best Quality with No Fumes
                    </h5>
                    <p className="text-justify mb-3">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime, eos numquam quis sunt saepe voluptas? Similique
                      voluptate ad blanditiis rem ipsam. Debitis, nam quo.
                      Commodi quas dolore voluptatibus nobis eos!
                    </p>

                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-300 text-white py-2 px-5 text-2xl">
                        Helpful <FaThumbsUp />
                      </button>
                      <div className="grow text-pink-600">
                        56 peoples found this helpful
                      </div>
                      <button className="bg-primary-300 text-white hover:bg-primary-600 px-5 py-2 flex items-center text-2xl rounded-lg gap-2">
                        Share <BiShareAlt />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-5 border-t pt-10 mb-10">
                  <div className="col-span-3 text-center">
                    <img
                      src="/images/user.png"
                      alt=""
                      className="size-36 inline"
                    />
                    <div className="text-primary-300">Sudanshu</div>
                    <div className="text-pink-600 flex items-center justify-center gap-1">
                      Verified Buyer <BiSolidCheckCircle size={20} />
                    </div>
                    <div className="flex text-orange-400 justify-center text-xl">
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                    </div>
                    <div className="text-center text-gray-400">1 week ago</div>
                  </div>
                  <div className="col-span-9 text-primary-300">
                    <h5 className="text-lg font-bold">
                      Best Quality with No Fumes
                    </h5>
                    <p className="text-justify mb-3">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime, eos numquam quis sunt saepe voluptas? Similique
                      voluptate ad blanditiis rem ipsam. Debitis, nam quo.
                      Commodi quas dolore voluptatibus nobis eos!
                    </p>

                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-300 text-white py-2 px-5 text-2xl">
                        Helpful <FaThumbsUp />
                      </button>
                      <div className="grow text-pink-600">
                        56 peoples found this helpful
                      </div>
                      <button className="bg-primary-300 text-white hover:bg-primary-600 px-5 py-2 flex items-center text-2xl rounded-lg gap-2">
                        Share <BiShareAlt />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-5 border-t pt-10 mb-10">
                  <div className="col-span-3 text-center">
                    <img
                      src="/images/user.png"
                      alt=""
                      className="size-36 inline"
                    />
                    <div className="text-primary-300">Sudanshu</div>
                    <div className="text-pink-600 flex items-center justify-center gap-1">
                      Verified Buyer <BiSolidCheckCircle size={20} />
                    </div>
                    <div className="flex text-orange-400 justify-center text-xl">
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                    </div>
                    <div className="text-center text-gray-400">1 week ago</div>
                  </div>
                  <div className="col-span-9 text-primary-300">
                    <h5 className="text-lg font-bold">
                      Best Quality with No Fumes
                    </h5>
                    <p className="text-justify mb-3">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime, eos numquam quis sunt saepe voluptas? Similique
                      voluptate ad blanditiis rem ipsam. Debitis, nam quo.
                      Commodi quas dolore voluptatibus nobis eos!
                    </p>

                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-300 text-white py-2 px-5 text-2xl">
                        Helpful <FaThumbsUp />
                      </button>
                      <div className="grow text-pink-600">
                        56 peoples found this helpful
                      </div>
                      <button className="bg-primary-300 text-white hover:bg-primary-600 px-5 py-2 flex items-center text-2xl rounded-lg gap-2">
                        Share <BiShareAlt />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-5 border-t pt-10 mb-10">
                  <div className="col-span-3 text-center">
                    <img
                      src="/images/user.png"
                      alt=""
                      className="size-36 inline"
                    />
                    <div className="text-primary-300">Sudanshu</div>
                    <div className="text-pink-600 flex items-center justify-center gap-1">
                      Verified Buyer <BiSolidCheckCircle size={20} />
                    </div>
                    <div className="flex text-orange-400 justify-center text-xl">
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                      <BiSolidStar />
                    </div>
                    <div className="text-center text-gray-400">1 week ago</div>
                  </div>
                  <div className="col-span-9 text-primary-300">
                    <h5 className="text-lg font-bold">
                      Best Quality with No Fumes
                    </h5>
                    <p className="text-justify mb-3">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Maxime, eos numquam quis sunt saepe voluptas? Similique
                      voluptate ad blanditiis rem ipsam. Debitis, nam quo.
                      Commodi quas dolore voluptatibus nobis eos!
                    </p>

                    <div className="grid grid-cols-5 gap-2 mb-3">
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                      <div>
                        <img
                          src="/images/product2.png"
                          alt=""
                          className="size-40 bg-gray-200 rounded object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 rounded-lg bg-pink-600 hover:bg-pink-300 text-white py-2 px-5 text-2xl">
                        Helpful <FaThumbsUp />
                      </button>
                      <div className="grow text-pink-600">
                        56 peoples found this helpful
                      </div>
                      <button className="bg-primary-300 text-white hover:bg-primary-600 px-5 py-2 flex items-center text-2xl rounded-lg gap-2">
                        Share <BiShareAlt />
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
