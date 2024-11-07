import React, { useCallback, useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";

const ProductCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState({});

  const [limit, setLimit] = useState(10);

  const toggleModal = (category = null) => {
    setSelectedCategory(category);
    setIsModalOpen(!isModalOpen);
  };

  const fetchCategories = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(
        `category?page=${page}&limit=${limit}`
      );

      if (apiResponse.status) setCategories(apiResponse.data);
    },
    [limit]
  );

  const deleteCategory = async (categorySlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this category?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`category/${categorySlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "Category deleted successfully!", "success");
          fetchCategories(); // Reload categories after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the category. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <select
            value={entries}
            onChange={(e) => setEntries(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          onClick={() => toggleModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Category
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Categories</h2>
        <LaravelPagination
          items={categories}
          fetchData={fetchCategories}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="border-b px-4 py-3 text-left">Sr. No.</th>
                <th className="border-b px-4 py-3 text-left">Category Name</th>
                <th className="border-b px-4 py-3 text-left">
                  Parent Category Name
                </th>
                <th className="border-b px-4 py-3 text-left">Icon</th>
                <th className="border-b px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.data?.map((category, index) => {
                const hasChildren = categories.data.some(
                  (cat) => cat.parent?.id === category.id
                );
                return (
                  <tr key={index}>
                    <td className="border-b px-4 py-3">
                      {index + categories.from}.
                    </td>
                    <td className="border-b px-4 py-3">{category.name}</td>
                    <td className="border-b px-4 py-3">
                      {category?.parent?.name || "ROOT"}
                    </td>
                    <td className="border-b px-4 py-3">
                      <img
                        src={category.image}
                        alt=""
                        className="size-10 rounded border border-3 border-black object-contain"
                      />
                    </td>
                    <td className="border-b px-4 py-3">
                      <Actions
                        preventDelete={hasChildren}
                        editCallback={() => toggleModal(category)}
                        deleteCallback={() => deleteCategory(category.slug)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </LaravelPagination>
      </div>

      {/* Modal for adding a new product category */}
      <AddCategory
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchCategories();
        }}
        initialData={selectedCategory}
      />
    </div>
  );
};

export default ProductCategory;
