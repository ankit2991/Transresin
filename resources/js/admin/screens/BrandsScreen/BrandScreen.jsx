import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import AddBrand from "./AddBrand";

const BrandScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrands, setSelectedBrand] = useState(null);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState({});

  const [limit, setLimit] = useState(10);

  const toggleModal = (brand = null) => {
    setSelectedBrand(brand);
    setIsModalOpen(!isModalOpen);
  };

  const fetchBrands = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(`brand?page=${page}&limit=${limit}`);

      if (apiResponse.status) setBrands(apiResponse.data);
    },
    [limit]
  );

  const deleteCategory = async (brandSlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this brand?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`brand/${brandSlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "Brand deleted successfully!", "success");
          fetchBrands(); // Reload brands after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the brand. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

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
          + Add Brand
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Brands</h2>
        <LaravelPagination
          items={brands}
          fetchData={fetchBrands}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="border-b px-4 py-3 text-left">Sr. No.</th>
                <th className="border-b px-4 py-3 text-left">Brand Name</th>
                <th className="border-b px-4 py-3 text-left">
                  Parent Brand Name
                </th>
                <th className="border-b px-4 py-3 text-left">Icon</th>
                <th className="border-b px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {brands?.data?.map((brand, index) => {
                const hasChildren = brands.data.some(
                  (cat) => cat.parent?.id === brand.id
                );
                return (
                  <tr key={index}>
                    <td className="border-b px-4 py-3">
                      {index + brands.from}.
                    </td>
                    <td className="border-b px-4 py-3">{brand.name}</td>
                    <td className="border-b px-4 py-3">
                      {brand?.parent?.name || "ROOT"}
                    </td>
                    <td className="border-b px-4 py-3">
                      <img
                        src={brand.image}
                        alt=""
                        className="size-10 rounded border border-3 border-black object-contain"
                      />
                    </td>
                    <td className="border-b px-4 py-3">
                      <Actions
                        preventDelete={hasChildren}
                        editCallback={() => toggleModal(brand)}
                        deleteCallback={() => deleteCategory(brand.slug)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </LaravelPagination>
      </div>

      {/* Modal for adding a new product brand */}
      <AddBrand
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchBrands();
        }}
        initialData={selectedBrands}
      />
    </div>
  );
};

export default BrandScreen;
