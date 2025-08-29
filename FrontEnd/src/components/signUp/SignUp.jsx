import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/sign-up",
        formData
      );

      if (res.status === 201) {
        alert("✅ Account created successfully!");
      }
    } catch (err) {
      if (err.response) {
        alert("❌ " + err.response.data.message);
      } else {
        // Network error
        alert("⚠️ " + err.message);
      }
    }
  };

  return (
    <div className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
            <div className="bg-white p-4 p-md-5 rounded shadow-sm">
              <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                Sign up for a new account
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label htmlFor="firstName" className="form-label">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="lastName" className="form-label">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <div className="d-grid">
                      <button className="btn btn-primary btn-lg" type="submit">
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <hr className="mt-5 mb-4 border-secondary-subtle" />
              <p className="m-0 text-secondary text-center">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="link-primary text-decoration-none"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
