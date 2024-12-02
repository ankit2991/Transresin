import React from "react";
import { BiCheck } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const StepNav = ({ step, setStep, isEnd = false }) => {
  return (
    <div className="flex justify-between mt-4">
      <div>
        {step > 1 && (
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setStep(step - 1)}
          >
            <FaAngleLeft />
            Previous
          </button>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="bg-primary-300 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center"
        >
          {!isEnd ? (
            <>
              Next
              <FaAngleRight />
            </>
          ) : (
            <>
              <BiCheck />
              Submit
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepNav;
