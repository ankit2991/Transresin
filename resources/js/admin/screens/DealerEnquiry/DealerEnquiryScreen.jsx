import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";

const DealerEnquiryScreen = () => {
  const [dealerEnquiries, setDealerEnquiries] = useState({});

  const [limit, setLimit] = useState(10);

  const fetchDealerEnquiries = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(
        `dealer-enquiry?page=${page}&limit=${limit}`
      );

      if (apiResponse.status) setDealerEnquiries(apiResponse.data);
    },
    [limit]
  );

  const deleteDealerEnquiry = async (dealerEnquiryId) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(
          `dealer-enquiry/${dealerEnquiryId}`,
          {
            method: "POST",
            data: {
              _method: "DELETE",
            },
          }
        );
        if (apiResponse.status) {
          swal("Deleted!", "Dealer Enquiry deleted successfully!", "success");
          fetchDealerEnquiries(); // Reload dealerEnquiries after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the dealerEnquiry. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchDealerEnquiries();
  }, [fetchDealerEnquiries]);

  return (
    <div className="p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Dealer Enquiries</h2>
        <LaravelPagination
          items={dealerEnquiries}
          fetchData={fetchDealerEnquiries}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Message</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {dealerEnquiries?.data?.map((dealerEnquiry, index) => {
                return (
                  <tr key={index}>
                    <td>{index + dealerEnquiries.from}.</td>
                    <td>{dealerEnquiry.name}</td>
                    <td>{dealerEnquiry.company_name}</td>
                    <td>{dealerEnquiry.email}</td>
                    <td>{dealerEnquiry.phone}</td>
                    <td>{dealerEnquiry?.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </LaravelPagination>
      </div>
    </div>
  );
};

export default DealerEnquiryScreen;
