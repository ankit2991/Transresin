import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";

const ContactEnquiryScreen = () => {
  const [contactEnquiries, setContactEnquiries] = useState({});

  const [limit, setLimit] = useState(10);

  const fetchContactEnquiries = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(
        `contact-enquiry?page=${page}&limit=${limit}`
      );

      if (apiResponse.status) setContactEnquiries(apiResponse.data);
    },
    [limit]
  );

  const deleteContactEnquiry = async (contactEnquiryId) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(
          `contact-enquiry/${contactEnquiryId}`,
          {
            method: "POST",
            data: {
              _method: "DELETE",
            },
          }
        );
        if (apiResponse.status) {
          swal("Deleted!", "Contact Enquiry deleted successfully!", "success");
          fetchContactEnquiries(); // Reload contactEnquiries after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the contactEnquiry. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchContactEnquiries();
  }, [fetchContactEnquiries]);

  return (
    <div className="p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Contact Enquiries</h2>
        <LaravelPagination
          items={contactEnquiries}
          fetchData={fetchContactEnquiries}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Message</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {contactEnquiries?.data?.map((contactEnquiry, index) => {
                return (
                  <tr key={index}>
                    <td>{index + contactEnquiries.from}.</td>
                    <td>{contactEnquiry.first_name}</td>
                    <td>{contactEnquiry.last_name}</td>
                    <td>{contactEnquiry.email}</td>
                    <td>{contactEnquiry.phone}</td>
                    <td>{contactEnquiry?.message}</td>
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

export default ContactEnquiryScreen;
