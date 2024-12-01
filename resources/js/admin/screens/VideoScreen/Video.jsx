import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import AddVideo from "./AddVideo";
import Spinner from "../../components/Spinner";

const Video = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideos, setSelectedVideo] = useState(null);
  // const [search, setSearch] = useState("");
  const [videos, setVideos] = useState({});

  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(10);

  const toggleModal = (brand = null) => {
    setSelectedVideo(brand);
    setIsModalOpen(!isModalOpen);
  };

  const fetchVideos = useCallback(
    async (page = 1) => {
      setLoading(true);
      const apiResponse = await ApiExecute(`video?page=${page}&limit=${limit}`);
      setLoading(false);

      if (apiResponse.status) setVideos(apiResponse.data);
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
          swal("Deleted!", "Video deleted successfully!", "success");
          fetchVideos(); // Reload videos after deletion
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
    fetchVideos();
  }, [fetchVideos]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          {/* <input
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
          + Add Video
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Video</h2>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {videos?.total ? (
              <LaravelPagination
                items={videos}
                fetchData={fetchVideos}
                limit={limit}
                setLimit={setLimit}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr. No.</th>
                      <th>Title</th>
                      <th>Preview</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos?.data?.map((video, index) => {
                      const hasChildren = videos.data.some(
                        (cat) => cat.parent?.id === video.id
                      );
                      return (
                        <tr key={index}>
                          <td>{index + videos.from}.</td>
                          <td>{video.title}</td>
                          <td>
                            <a
                              href={video.youtube_video_url}
                              target="_blank"
                              className="text-primary-300 underline"
                            >
                              Preview
                            </a>
                          </td>
                          <td>
                            <Actions
                              preventDelete={hasChildren}
                              editCallback={() => toggleModal(video)}
                              deleteCallback={() => deleteCategory(video.id)}
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
      <AddVideo
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchVideos();
        }}
        initialData={selectedVideos}
      />
    </div>
  );
};

export default Video;
