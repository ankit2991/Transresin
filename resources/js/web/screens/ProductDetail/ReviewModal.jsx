import { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProductImagePicker from "../../../admin/components/ProductImagePicker";

const ReviewModal = ({ isOpen, onClose, onSubmit, product_id }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const [images, setImages] = useState([]);

  const { user } = useSelector((state) => state?.auth);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // const formData = new FormData();
    // formData.append("product_id", product_id);
    // formData.append("review", review);
    // formData.append("rating", rating);
    // images.forEach((image, i) => {
    //   formData.append(`images[${i}]`, image);
    // });

    onSubmit({
      product_id,
      review,
      rating,
      images,
    });

    // Reset the form
    setReview("");
    setRating(null);
    setImages([]);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 ${
        !isOpen ? "hidden" : ""
      }`}
    >
      <div className="relative bg-white rounded-lg shadow-lg w-[800px] p-6">
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
        <div className="bg-blue-50 p-2 border-s-4 border-primary-300 mb-5 rounded-e">
          You're logged in as{" "}
          <strong className="font-bold">{user?.name}</strong>
        </div>
        <div className="mb-4">
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                className={`cursor-pointer ${
                  star <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
        </div>
        <textarea
          className="w-full border rounded-md p-2 mb-4"
          rows="5"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        {/* Image Upload */}
        <div className="mb-4">
          <ProductImagePicker
            images={images}
            setImages={setImages}
            preview_cols={5}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-primary-300 hover:bg-primary-600 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
