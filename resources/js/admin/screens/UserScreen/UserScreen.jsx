import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import AddUser from "./AddUser";

const UserScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUser] = useState(null);
  const [users, setUsers] = useState({});

  const [limit, setLimit] = useState(10);

  const toggleModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(!isModalOpen);
  };

  const fetchUsers = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(`user?page=${page}&limit=${limit}`);

      if (apiResponse.status) setUsers(apiResponse.data);
    },
    [limit]
  );

  const deleteCategory = async (userSlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`user/${userSlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "User deleted successfully!", "success");
          fetchUsers(); // Reload users after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the user. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="p-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Users</h2>
        <LaravelPagination
          items={users}
          fetchData={fetchUsers}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Email Verified</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((user, index) => {
                const hasChildren = users.data.some(
                  (cat) => cat.parent?.id === user.id
                );
                return (
                  <tr key={index}>
                    <td>{index + users.from}.</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.email_verified_at ? "Yes" : "No"}</td>
                    {/* <td>
                      <img
                        src={user.image}
                        alt=""
                        className="size-10 rounded border border-3 border-black object-contain inline-block me-2"
                      />
                    </td> */}
                    {/* <td></td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </LaravelPagination>
      </div>

      {/* Modal for adding a new product user */}
      <AddUser
        isOpen={isModalOpen}
        onClose={toggleModal}
        afterSubmit={() => {
          toggleModal();
          fetchUsers();
        }}
        initialData={selectedUsers}
      />
    </div>
  );
};

export default UserScreen;
