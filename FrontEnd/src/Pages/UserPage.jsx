import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch logged-in user data
  const fetchUser = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/v1/users/${storedUser._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.data);
      setFormData({
        firstName: res.data.data.firstName,
        lastName: res.data.data.lastName,
        email: res.data.data.email,
        password: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;

      await axios.put(
        `http://localhost:5000/api/v1/users/${user._id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Profile updated successfully");
      fetchUser();
      setEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-light sidebar py-5 vh-100">
          <div className="sidebar-sticky">
            <h5 className="text-center mb-4">User Panel</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <button
                  className="btn btn-link nav-link text-start"
                  onClick={() => setEditing(false)}
                >
                  Profile
                </button>
              </li>
              <li className="nav-item mt-4">
                <button
                  className="btn btn-danger w-100"
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
          <h2 className="mb-4">My Profile</h2>

          <div className="card p-4 shadow-sm">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!editing}
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
                  disabled={!editing}
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
                  disabled={!editing}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password (leave blank to keep current)"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              {editing && (
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary me-2"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>

            {!editing && (
              <div className="mt-3">
                <button
                  className="btn btn-info"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
