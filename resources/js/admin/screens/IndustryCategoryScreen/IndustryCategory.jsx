import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import AddIndustryCategory from "./AddIndustryCategory";

const IndustryCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [industries, setIndustries] = useState({});

  const [limit, setLimit] = useState(10);

  const toggleModal = (industry = null) => {
    setSelectedIndustry(industry);
    setIsModalOpen(!isModalOpen);
  };

  const fetchIndustryCategory = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(
        `industry?page=${page}&limit=${limit}`
      );

      if (apiResponse.status) setIndustries(apiResponse.data);
    },
    [limit]
  );

  const deleteApplication = async (industrySlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this industry category?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`industry/${industrySlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal(
            "Deleted!",
            "Industry Category deleted successfully!",
            "success"
          );
          fetchIndustryCategory(); // Reload industries after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the industry category. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchIndustryCategory();
  }, [fetchIndustryCategory]);

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
          + Add Industry Category
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Applications</h2>
        <LaravelPagination
          items={industries}
          fetchData={fetchIndustryCategory}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="border-b px-4 py-3 text-left">Sr. No.</th>
                <th className="border-b px-4 py-3 text-left">Industry Name</th>
                <th className="border-b px-4 py-3 text-left">
                  Parent Industry Name
                </th>
                <th className="border-b px-4 py-3 text-left">Icon</th>
                <th className="border-b px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {industries?.data?.map((industry, index) => {
                const hasChildren = industries.data.some(
                  (cat) => cat.parent?.id === industry.id
                );
                return (
                  <tr key={index}>
                    <td className="border-b px-4 py-3">
                      {index + industries.from}.
                    </td>
                    <td className="border-b px-4 py-3">{industry.name}</td>
                    <td className="border-b px-4 py-3">
                      {industry?.parent?.name || "ROOT"}
                    </td>
                    <td className="border-b px-4 py-3">
                      <img
                        src={industry.image}
                        alt=""
                        className="size-10 rounded border border-3 border-black object-contain"
                      />
                    </td>
                    <td className="border-b px-4 py-3">
                      <Actions
                        preventDelete={hasChildren}
                        editCallback={() => toggleModal(industry)}
                        deleteCallback={() => deleteApplication(industry.slug)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </LaravelPagination>
      </div>

      {/* Modal for adding a new product industry */}
      <AddIndustryCategory
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchIndustryCategory();
        }}
        initialData={selectedIndustry}
      />
    </div>
  );
};

export default IndustryCategory;
