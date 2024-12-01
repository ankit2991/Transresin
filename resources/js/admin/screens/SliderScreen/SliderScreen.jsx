import React, { useCallback, useEffect, useState } from "react";
import AddSlider from "./AddSlider";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import _debounce from "lodash/debounce";
import Spinner from "../../components/Spinner";

const SliderScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [search, setSearch] = useState("");
  const [sliders, setSliders] = useState({});
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  const toggleModal = (slider = null) => {
    setSelectedSlider(slider);
    setIsModalOpen(!isModalOpen);
  };

  const fetchSliders = useCallback(
    _debounce(async (page = 1) => {
      setLoading(true);
      const apiResponse = await ApiExecute(
        `slider?page=${page}&limit=${limit}&search=${search}`
      );
      setLoading(false);

      if (apiResponse.status) setSliders(apiResponse.data);
    }, 1000),
    [limit, search]
  );

  const deleteSlider = async (sliderSlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this slider?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`slider/${sliderSlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "Slider deleted successfully!", "success");
          fetchSliders(); // Reload sliders after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the slider. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchSliders();
  }, [fetchSliders]);

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
          + Add Slider
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Sliders</h2>
        {loading ? (
          <Spinner />
        ) : (
          <LaravelPagination
            items={sliders}
            fetchData={fetchSliders}
            limit={limit}
            setLimit={setLimit}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Title / Alt</th>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sliders?.data?.map((slider, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + sliders.from}.</td>
                      <td>{slider.title}</td>
                      <td>
                        <img
                          src={slider.image}
                          alt=""
                          className="h-10 rounded border border-3 border-black object-contain"
                        />
                      </td>
                      <td>{slider?.product?.name}</td>
                      <td>
                        <Actions
                          editCallback={() => toggleModal(slider)}
                          deleteCallback={() => deleteSlider(slider.id)}
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

      {/* Modal for adding a new product slider */}
      <AddSlider
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchSliders();
        }}
        initialData={selectedSlider}
      />
    </div>
  );
};

export default SliderScreen;
