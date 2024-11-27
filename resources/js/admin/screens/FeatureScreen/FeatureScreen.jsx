import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import AddFeature from "./AddFeature";

const FeatureScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeature] = useState(null);
  const [features, setFeatures] = useState({});

  const [limit, setLimit] = useState(10);

  const toggleModal = (feature = null) => {
    setSelectedFeature(feature);
    setIsModalOpen(!isModalOpen);
  };

  const fetchFeatures = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(
        `feature?page=${page}&limit=${limit}`
      );

      if (apiResponse.status) setFeatures(apiResponse.data);
    },
    [limit]
  );

  const deleteCategory = async (featureSlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this feature?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`feature/${featureSlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "Feature deleted successfully!", "success");
          fetchFeatures(); // Reload features after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the feature. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          {/* <select
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
          /> */}
        </div>
        <button
          onClick={() => toggleModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Feature
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Features</h2>
        <LaravelPagination
          items={features}
          fetchData={fetchFeatures}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Feature Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {features?.data?.map((feature, index) => {
                const hasChildren = features.data.some(
                  (cat) => cat.parent?.id === feature.id
                );
                return (
                  <tr key={index}>
                    <td>{index + features.from}.</td>
                    <td>
                      <img
                        src={feature.image}
                        alt=""
                        className="size-10 rounded border border-3 border-black object-contain inline-block me-2"
                      />
                      {feature.name}
                    </td>
                    <td>
                      <Actions
                        preventDelete={hasChildren}
                        editCallback={() => toggleModal(feature)}
                        deleteCallback={() => deleteCategory(feature.slug)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </LaravelPagination>
      </div>

      {/* Modal for adding a new product feature */}
      <AddFeature
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchFeatures();
        }}
        initialData={selectedFeatures}
      />
    </div>
  );
};

export default FeatureScreen;
