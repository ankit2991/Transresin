import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const Actions = ({ preventDelete = false, editCallback, deleteCallback }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={editCallback}
        className="text-blue-500 hover:text-green-700"
      >
        <MdEdit className="h-5 w-5" />
      </button>
      {!preventDelete && (
        <button
          onClick={deleteCallback}
          className="text-gray-600 hover:text-red-700"
        >
          <MdDelete className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Actions;
