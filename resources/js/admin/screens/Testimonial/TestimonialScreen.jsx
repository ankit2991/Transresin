import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import AddTestimonial from "./AddTestimonial";
import Spinner from "../../components/Spinner";

const TestimonialScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonials, setSelectedTestimonial] = useState(null);
  const [testimonials, setTestimonials] = useState({});

  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(10);

  const toggleModal = (testimonial = null) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(!isModalOpen);
  };

  const fetchTestimonials = useCallback(
    async (page = 1) => {
      setLoading(true);
      const apiResponse = await ApiExecute(
        `testimonial?page=${page}&limit=${limit}`
      );
      setLoading(false);

      if (apiResponse.status) setTestimonials(apiResponse.data);
    },
    [limit]
  );

  const deleteCategory = async (testimonialSlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this testimonial?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`testimonial/${testimonialSlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "Testimonial deleted successfully!", "success");
          fetchTestimonials(); // Reload testimonials after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the testimonial. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

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
          + Add Testimonial
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Testimonials</h2>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <LaravelPagination
              items={testimonials}
              fetchData={fetchTestimonials}
              limit={limit}
              setLimit={setLimit}
            >
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Testimonial Name</th>
                    <th>Place</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials?.data?.map((testimonial, index) => {
                    const hasChildren = testimonials.data.some(
                      (cat) => cat.parent?.id === testimonial.id
                    );
                    return (
                      <tr key={index}>
                        <td>{index + testimonials.from}.</td>
                        <td>
                          <img
                            src={testimonial.image}
                            alt=""
                            className="size-10 rounded border border-3 border-black object-contain inline-block me-2"
                          />
                          {testimonial.name}
                        </td>
                        <td>{testimonial.place}</td>
                        <td>{testimonial.rating}</td>
                        <td>{testimonial.comment}</td>
                        <td>
                          <Actions
                            preventDelete={hasChildren}
                            editCallback={() => toggleModal(testimonial)}
                            deleteCallback={() =>
                              deleteCategory(testimonial.slug)
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </LaravelPagination>
          </>
        )}
      </div>

      {/* Modal for adding a new product testimonial */}
      <AddTestimonial
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchTestimonials();
        }}
        initialData={selectedTestimonials}
      />
    </div>
  );
};

export default TestimonialScreen;
