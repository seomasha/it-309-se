import WelcomeImage from "../assets/welcome_page.svg";
import ExpandConnections from "../assets/expand_connections.svg";
import { IoIosPersonAdd } from "react-icons/io";
import { userService } from "../service/userService";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const categories = [
    "IT",
    "FinTech",
    "Health",
    "Education",
    "E-Commerce",
    "AI",
    "GreenTech",
    "Gaming",
    "Marketing",
  ];

  const positions = [
    "Software Engineer",
    "Marketing Manager",
    "Data Analyst",
    "Graphic Designer",
    "Product Manager",
    "Sales Represntative",
    "Consultant",
    "Customer Support",
    "UX/UI Designer",
  ];

  const validate = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const response = await userService.login({ email, password });

    if (response) {
      localStorage.setItem("token", response);
      navigate("/myprofile");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <div className="text-dark">
      <header className="d-flex justify-content-between align-items-center p-3">
        <h1 className="text-primary">IBU | Startup</h1>
        <Link
          to="/signup"
          className="btn btn-outline-primary d-flex align-items-center gap-2 text-decoration-none"
        >
          <IoIosPersonAdd size={20} />
          <span className="align-middle">Create an account</span>
        </Link>
      </header>

      <main className="d-flex align-items-center mb-5 py-5">
        <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex justify-content-center">
          <form
            className="d-flex flex-column gap-3 w-100"
            style={{ maxWidth: "400px" }}
          >
            <h1 className="text-terciary">
              Welcome to <br />
              IBU Startup
            </h1>

            <div className="mb-3 d-flex flex-column gap-2">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
                onChange={handleEmailChange}
                value={email}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3 d-flex flex-column gap-2">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                onChange={handlePasswordChange}
                value={password}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <p className="text-primary">Forgot password?</p>

            <button
              type="submit"
              className="btn btn-outline-primary w-100 mb-3"
              onClick={handleLogin}
            >
              Sign in
            </button>

            <p className="small text-secondary">
              By clicking sign in, you agree to our IBU Startup{" "}
              <span className="text-primary">
                User agreement, Privacy policy and Cookie policy.
              </span>
            </p>

            <p className="text-secondary">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary text-decoration-none">
                Create one here
              </Link>
            </p>
          </form>
        </div>

        <div className="col-12 col-md-6 text-center d-none d-md-block">
          <img src={WelcomeImage} alt="IBU Startup" className="img-fluid" />
        </div>
      </main>

      <section
        className="section-background p-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "500px" }}
      >
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-5 text-center text-md-start">
          <div>
            <h1 className="text-primary">Explore startups</h1>
            <p className="text-secondary mx-auto" style={{ maxWidth: "450px" }}>
              In the realm of startup management tools, we're pioneering a new
              approach. Our platform seamlessly integrates expert insights into
              every feature, empowering entrepreneurs to navigate the challenges
              of building and scaling their ventures with confidence.
            </p>
          </div>

          <div
            className="d-flex flex-wrap justify-content-center"
            style={{ maxWidth: "450px" }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="d-flex justify-content-center"
                style={{ width: "33.33%" }}
              >
                <p className="btn btn-outline-primary rounded-pill px-4">
                  {category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="p-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "500px" }}
      >
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-5 text-center text-md-start">
          <div
            className="d-flex flex-wrap justify-content-center"
            style={{ maxWidth: "580px" }}
          >
            {positions.map((category, index) => (
              <div
                key={index}
                className="d-flex justify-content-center align-items-center"
                style={{ width: "33.33%" }}
              >
                <p
                  className="btn btn-outline-primary rounded-pill px-4"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {category}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-primary">Explore positions</h1>
            <p className="text-secondary mx-auto" style={{ maxWidth: "450px" }}>
              In the domain of startup management tools, we're innovating how
              positions are understood and optimized. Our platform synthesizes
              expert insights directly into position descriptions, streamlining
              talent acquisition and fostering organizational agility. Together,
              we're redefining how startups strategically structure their teams
              for success.
            </p>
          </div>
        </div>
      </section>

      <section className="section-background py-5 text-center text-md-start d-flex justify-content-center flex-column flex-xl-row align-items-center gap-4">
        <img
          src={ExpandConnections}
          alt="Expand"
          className="img-fluid mb-3"
          style={{ maxWidth: "600px", height: "auto" }}
        />
        <div className="px-3" style={{ maxWidth: "800px" }}>
          <h1 className="text-primary">Expand your connections</h1>
          <p className="text-secondary">
            Within startup management tools, we're bridging expertise with
            execution. Our platform integrates expert insights into position
            management, empowering startups for sustainable growth.
          </p>
        </div>
      </section>

      <footer className="text-center my-4">
        <h4 className="text-primary">IBU Startup</h4>
        <p className="text-secondary">Copyrighted © IBU Startup 2024</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
