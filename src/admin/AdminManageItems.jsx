import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import "./AdminManageItems.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/store/itemsSlice";
import { deleteItem } from "../Redux/store/adminSlice";
import { useNavigate } from "react-router";

const AdminManageItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems({ page: 1 }));
  }, [dispatch]);

  const items = data?.items || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteItem(id))
        .unwrap()
        .then(() => {
          dispatch(fetchItems({ page: data.pagination.page }));
        })
        .catch((err) => {
          console.error("Delete failed:", err);
        });
    }
  };

  return (
    <div className="admin-manage-items">
      <AdminNavbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Manage Items</h2>
        <p>Here you can view, edit, or delete lost and found items.</p>

        {loading && <p className="text-gray-500">Loading items...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Item ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-3 text-center text-gray-500">
                      No items found
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item._id}>
                      <td className="p-3">{item._id}</td>
                      <td className="p-3">{item.title}</td>
                      <td className="p-3 capitalize">{item.category}</td>
                      <td className="p-3 capitalize">{item.status}</td>
                      <td className="p-3 space-x-2">
                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(`/admin/items/edit/${item._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {data?.pagination && (
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              disabled={data.pagination.page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() =>
                dispatch(fetchItems({ page: data.pagination.page - 1 }))
              }
            >
              Previous
            </button>
            <span>
              Page {data.pagination.page} of {data.pagination.pages}
            </span>
            <button
              disabled={!data.pagination.hasNext}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() =>
                dispatch(fetchItems({ page: data.pagination.page + 1 }))
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageItems;
