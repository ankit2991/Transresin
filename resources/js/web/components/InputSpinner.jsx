import React from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaMinus, FaPlus } from "react-icons/fa6";

const InputSpinner = ({ qty, setQty }) => {
  const increment = () => setQty((prev) => Math.min(prev + 1, 99));
  const decrement = () => setQty((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQty(Math.max(1, Math.min(value, 99)));
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-200 rounded-full font-bold py-3 text-primary-300">
      <button
        onClick={decrement}
        className="px-3 py-1 text-gray-800 font-semibold disabled:text-gray-400"
        disabled={qty === 1}
      >
        <FaMinus />
      </button>
      <input
        type="text"
        value={qty}
        onChange={handleChange}
        className="w-12 text-center border-0 bg-transparent  outline-none"
        min="1"
        max="99"
        readOnly
      />
      <button
        onClick={increment}
        className="px-3 py-1 text-gray-800 font-semibold "
        disabled={qty === 99}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default InputSpinner;
