import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { userService } from "../service/userService";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    validateField(id, value);
  };

  const resetFields = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      phone: "",
    });

    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      phone: "",
    });
  };

  const validateField = (field, value) => {
    let newErrors = { ...errors };

    switch (field) {
      case "firstName":
        if (!value) {
          newErrors.firstName = "First name is required.";
        } else {
          newErrors.firstName = "";
        }
        break;
      case "lastName":
        if (!value) {
          newErrors.lastName = "Last name is required.";
        } else {
          newErrors.lastName = "";
        }
        break;
      case "email":
        if (!value) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Please enter a valid email address.";
        } else {
          newErrors.email = "";
        }
        break;
      case "username":
        if (!value) {
          newErrors.username = "Username is required.";
        } else {
          newErrors.username = "";
        }
        break;
      case "password":
        if (!value) {
          newErrors.password = "Password is required.";
        } else if (value.length < 8) {
          newErrors.password = "Password must be at least 8 characters long.";
        } else {
          newErrors.password = "";
        }
        break;
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Please confirm your password.";
        } else if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match.";
        } else {
          newErrors.confirmPassword = "";
        }
        break;
      case "phone":
        if (!value) {
          newErrors.phone = "Phone number is required.";
        } else if (!/^\+?\d{10,15}$/.test(value)) {
          newErrors.phone = "Please enter a valid phone number.";
        } else {
          newErrors.phone = "";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => error === "")) {
      userService.create(formData);
      //toast.success("Account succesfully created!"); //Fix validaiton error
      resetFields();
    }
  };

  return (
    <div className="section-background text-dark">
      <header className="d-flex justify-content-between align-items-center p-3">
        <h1 className="text-primary">IBU | Startup</h1>
        <Link
          to="/"
          className="btn btn-outline-primary d-flex align-items-center gap-2 text-decoration-none"
        >
          <FaSignInAlt size={20} />
          <span className="align-middle">Sign in</span>
        </Link>
      </header>

      <main>
        <h1 className="text-primary text-center">
          Make the most out of your experience!
        </h1>

        <div className="d-flex justify-content-center align-items-center flex-column">
          <form
            className="d-flex justify-content-center flex-column gap-3 mt-4 p-5 bg-white rounded border border-2"
            style={{ width: "400px" }}
            onSubmit={handleSubmit}
          >
            <div className="d-flex gap-3">
              <label htmlFor="firstName" className="form-label">
                First name
                <input
                  type="text"
                  id="firstName"
                  className={`form-control mt-2 ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </label>
              <label htmlFor="lastName" className="form-label">
                Last name
                <input
                  type="text"
                  id="lastName"
                  className={`form-control mt-2 ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </label>
            </div>

            <label htmlFor="email" className="form-label">
              Email address
              <input
                type="email"
                id="email"
                className={`form-control mt-2 ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </label>

            <label htmlFor="username" className="form-label">
              Username
              <input
                type="text"
                id="username"
                className={`form-control mt-2 ${
                  errors.username ? "is-invalid" : ""
                }`}
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </label>

            <label htmlFor="password" className="form-label">
              Password
              <input
                type="password"
                id="password"
                className={`form-control mt-2 ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </label>

            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                className={`form-control mt-2 ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </label>

            <label htmlFor="phone" className="form-label">
              Phone number
              <input
                type="text"
                id="phone"
                className={`form-control mt-2 ${
                  errors.phone ? "is-invalid" : ""
                }`}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </label>

            <button className="btn btn-outline-primary" type="submit">
              Sign up
            </button>

            <p className="text-secondary">
              Already have an account? Click here to{" "}
              <Link to="/" className="text-primary text-decoration-none">
                sign in.
              </Link>
            </p>
          </form>
        </div>
      </main>

      <footer className="text-center mt-4 py-2 bg-white">
        <h4 className="text-primary">IBU Startup</h4>
        <p className="text-secondary">Copyrighted © IBU Startup 2024</p>
      </footer>
    </div>
  );
};

export default SignUp;
