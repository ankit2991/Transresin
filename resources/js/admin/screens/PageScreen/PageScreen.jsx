import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import AddPage from "./AddPage";
import Spinner from "../../components/Spinner";

const PageScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPages, setSelectedPage] = useState(null);
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const toggleModal = (page = null) => {
    setSelectedPage(page);
    setIsModalOpen(!isModalOpen);
  };

  const fetchPages = useCallback(
    async (page = 1) => {
      setLoading(true);
      const apiResponse = await ApiExecute(`page?page=${page}&limit=${limit}`);
      setLoading(false);
      if (apiResponse.status) setPages(apiResponse.data);
    },
    [limit]
  );

  const deleteCategory = async (pageSlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this page?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`page/${pageSlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "Page deleted successfully!", "success");
          fetchPages(); // Reload pages after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the page. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  return (
    <div className="p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Pages</h2>
        {loading ? (
          <Spinner />
        ) : (
          <LaravelPagination
            items={pages}
            fetchData={fetchPages}
            limit={limit}
            setLimit={setLimit}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Page Name</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pages?.data?.map((page, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + pages.from}.</td>
                      <td>{page.title}</td>
                      <td>
                        <img
                          src={page.image}
                          alt=""
                          className="size-10 rounded border border-3 border-black object-contain inline-block me-2"
                        />
                      </td>
                      <td>
                        <Actions
                          preventDelete={true}
                          editCallback={() => toggleModal(page)}
                          deleteCallback={() => deleteCategory(page.slug)}
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

      {/* Modal for adding a new product page */}
      <AddPage
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchPages();
        }}
        initialData={selectedPages}
      />
    </div>
  );
};

export default PageScreen;
