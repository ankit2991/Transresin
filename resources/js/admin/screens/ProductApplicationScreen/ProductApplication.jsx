import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import AddApplication from "./AddApplication";

const ProductApplication = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState({});

  const [limit, setLimit] = useState(10);

  const toggleModal = (application = null) => {
    setSelectedApplication(application);
    setIsModalOpen(!isModalOpen);
  };

  const fetchApplications = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(
        `application?page=${page}&limit=${limit}`
      );

      if (apiResponse.status) setApplications(apiResponse.data);
    },
    [limit]
  );

  const deleteApplication = async (applicationSlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this application?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`application/${applicationSlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "Category deleted successfully!", "success");
          fetchApplications(); // Reload applications after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the application. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

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
          + Add Application
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Applications</h2>
        <LaravelPagination
          items={applications}
          fetchData={fetchApplications}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="border-b px-4 py-3 text-left">Sr. No.</th>
                <th className="border-b px-4 py-3 text-left">Application Name</th>
                <th className="border-b px-4 py-3 text-left">
                  Parent Application Name
                </th>
                <th className="border-b px-4 py-3 text-left">Icon</th>
                <th className="border-b px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications?.data?.map((application, index) => {
                const hasChildren = applications.data.some(
                  (cat) => cat.parent?.id === application.id
                );
                return (
                  <tr key={index}>
                    <td className="border-b px-4 py-3">
                      {index + applications.from}.
                    </td>
                    <td className="border-b px-4 py-3">{application.name}</td>
                    <td className="border-b px-4 py-3">
                      {application?.parent?.name || "ROOT"}
                    </td>
                    <td className="border-b px-4 py-3">
                      <img
                        src={application.image}
                        alt=""
                        className="size-10 rounded border border-3 border-black object-contain"
                      />
                    </td>
                    <td className="border-b px-4 py-3">
                      <Actions
                        preventDelete={hasChildren}
                        editCallback={() => toggleModal(application)}
                        deleteCallback={() => deleteApplication(application.slug)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </LaravelPagination>
      </div>

      {/* Modal for adding a new product application */}
      <AddApplication
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchApplications();
        }}
        initialData={selectedApplication}
      />
    </div>
  );
};

export default ProductApplication;
