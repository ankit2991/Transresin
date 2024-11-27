import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import AddMaterial from "./AddMaterial";

const MaterialScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterial] = useState(null);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [materials, setMaterials] = useState({});

  const [limit, setLimit] = useState(10);

  const toggleModal = (material = null) => {
    setSelectedMaterial(material);
    setIsModalOpen(!isModalOpen);
  };

  const fetchMaterials = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(
        `material?page=${page}&limit=${limit}`
      );

      if (apiResponse.status) setMaterials(apiResponse.data);
    },
    [limit]
  );

  const deleteCategory = async (materialSlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this material?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`material/${materialSlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "Material deleted successfully!", "success");
          fetchMaterials(); // Reload materials after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the material. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

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
          + Add Material
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Materials</h2>
        <LaravelPagination
          items={materials}
          fetchData={fetchMaterials}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Material Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {materials?.data?.map((material, index) => {
                const hasChildren = materials.data.some(
                  (cat) => cat.parent?.id === material.id
                );
                return (
                  <tr key={index}>
                    <td>{index + materials.from}.</td>
                    <td>
                      <img
                        src={material.image}
                        alt=""
                        className="size-10 rounded border border-3 border-black object-contain inline-block me-2"
                      />
                      {material.name}
                    </td>
                    <td>
                      <Actions
                        preventDelete={hasChildren}
                        editCallback={() => toggleModal(material)}
                        deleteCallback={() => deleteCategory(material.slug)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </LaravelPagination>
      </div>

      {/* Modal for adding a new product material */}
      <AddMaterial
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchMaterials();
        }}
        initialData={selectedMaterials}
      />
    </div>
  );
};

export default MaterialScreen;
