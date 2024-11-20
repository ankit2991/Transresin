import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import AddHsnCode from "./AddHsnCode";
import Spinner from "../../components/Spinner";

const HsnCodeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHsnCodes, setSelectedHsnCode] = useState(null);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [hsnCodes, setHsnCodes] = useState({});

  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(10);

  const toggleModal = (brand = null) => {
    setSelectedHsnCode(brand);
    setIsModalOpen(!isModalOpen);
  };

  const fetchHsnCodes = useCallback(
    async (page = 1) => {
      setLoading(true);
      const apiResponse = await ApiExecute(
        `hsn-code?page=${page}&limit=${limit}`
      );
      setLoading(false);

      if (apiResponse.status) setHsnCodes(apiResponse.data);
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
          swal("Deleted!", "HsnCode deleted successfully!", "success");
          fetchHsnCodes(); // Reload hsnCodes after deletion
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
    fetchHsnCodes();
  }, [fetchHsnCodes]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
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
          + Add HSN / SAC
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All HSN / SAC</h2>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {hsnCodes?.total ? (
              <LaravelPagination
                items={hsnCodes}
                fetchData={fetchHsnCodes}
                limit={limit}
                setLimit={setLimit}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>HSN / SAC</th>
                      <th>GST %</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hsnCodes?.data?.map((hsn, index) => {
                      const hasChildren = hsnCodes.data.some(
                        (cat) => cat.parent?.id === hsn.id
                      );
                      return (
                        <tr key={index}>
                          <td>{index + hsnCodes.from}.</td>
                          <td>{hsn.code}</td>
                          <td>
                            <strong>IGST: </strong>
                            {hsn?.gst_rate}%<br />
                            <strong>CGST: </strong>
                            {hsn?.gst_rate / 2}%<br />
                            <strong>SGST: </strong>
                            {hsn?.gst_rate / 2}%
                          </td>
                          <td>
                            <Actions
                              preventDelete={hasChildren}
                              editCallback={() => toggleModal(hsn)}
                              deleteCallback={() => deleteCategory(hsn.id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </LaravelPagination>
            ) : (
              <div className="noRecords">No records found.</div>
            )}
          </>
        )}
      </div>

      {/* Modal for adding a new product brand */}
      <AddHsnCode
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchHsnCodes();
        }}
        initialData={selectedHsnCodes}
      />
    </div>
  );
};

export default HsnCodeScreen;
