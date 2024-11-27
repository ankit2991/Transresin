import React, { useCallback, useEffect, useState } from "react";
import AddCategory from "./AddCategory";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import _debounce from "lodash/debounce";
import Spinner from "../../components/Spinner";

const ProductCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState({});
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const toggleModal = (category = null) => {
    setSelectedCategory(category);
    setIsModalOpen(!isModalOpen);
  };

  const fetchCategories = useCallback(
    _debounce(async (page = 1) => {
      setLoading(true);
      const apiResponse = await ApiExecute(
        `category?page=${page}&limit=${limit}&search=${search}`
      );
      setLoading(false);

      if (apiResponse.status) setCategories(apiResponse.data);
    }, 1000),
    [limit, search]
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
          <input
            type="search"
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
        {loading ? (
          <Spinner />
        ) : (
          <LaravelPagination
            items={categories}
            fetchData={fetchCategories}
            limit={limit}
            setLimit={setLimit}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Category Name</th>
                  <th>Parent Category Name</th>
                  <th>Icon</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.data?.map((category, index) => {
                  const hasChildren = categories.data.some(
                    (cat) => cat.parent?.id === category.id
                  );
                  return (
                    <tr key={index}>
                      <td>{index + categories.from}.</td>
                      <td>{category.name}</td>
                      <td>{category?.parent?.name || "ROOT"}</td>
                      <td>
                        <img
                          src={category.image}
                          alt=""
                          className="size-10 rounded border border-3 border-black object-contain"
                        />
                      </td>
                      <td>
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
        )}
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
