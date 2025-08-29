import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    Password: "",
  });
  const [editingUser, setEditingUser] = useState(null);

  const navigate = useNavigate();

  // Fetch users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const body = { ...formData };
      if (!formData.Password) delete body.Password;

      if (editingUser) {
        await axios.put(
          `http://localhost:5000/api/v1/users/${editingUser._id}`,
          body,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("✅ User updated successfully");
        setEditingUser(null);
      } else {
        await axios.post("http://localhost:5000/api/v1/users", body, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ User added successfully");
      }

      setFormData({ firstName: "", lastName: "", email: "", Password: "" });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save user");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ User deleted successfully");
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      Password: "",
    });
  };

  // Sign out function
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar py-5 vh-100">
          <div className="sidebar-sticky">
            <h5 className="text-center mb-4">Admin Panel</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link className="nav-link active" to="/dashboard/admin">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link" to="/dashboard/admin">
                  Users
                </Link>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="col-md-10 ms-sm-auto px-4 py-4">
          <h2 className="mb-4">User Management</h2>

          {/* User Form */}
          <div className="card mb-4 p-4 shadow-sm">
            <h5>{editingUser ? "Edit User" : "Add User"}</h5>
            <form className="row g-3 mt-2" onSubmit={handleSubmit}>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                {!editingUser && (
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
              <div className="col-12">
                <button className="btn btn-primary" type="submit">
                  {editingUser ? "Update User" : "Add User"}
                </button>
                {editingUser && (
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setEditingUser(null);
                      setFormData({ firstName: "", lastName: "", email: "" });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Users Table */}
          <div className="card p-4 shadow-sm">
            <h5>All Users</h5>
            <div className="table-responsive">
              <table className="table table-striped mt-3">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info me-2"
                            onClick={() => handleEdit(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(user._id)}
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
