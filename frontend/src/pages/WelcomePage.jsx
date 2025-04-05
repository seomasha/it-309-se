import WelcomeImage from "../assets/welcome_page.svg";
import ExpandConnections from "../assets/expand_connections.svg";
import { IoIosPersonAdd } from "react-icons/io";

const WelcomePage = () => {
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

  return (
    <div className="text-dark">
      <header className="d-flex justify-content-between align-items-center p-3">
        <h1 className="text-primary">IBU | Startup</h1>
        <button className="btn btn-outline-primary d-flex align-items-center gap-2">
          <IoIosPersonAdd size={20} />
          <span className="align-middle">Create an account</span>
        </button>
      </header>

      <main className="d-flex align-items-center mb-5 p-5">
        <div className="col-md-5 d-flex justify-content-center">
          <form className="d-flex flex-column gap-3 w-75">
            <h1 className="text-terciary">
              Welcome to <br />
              IBU Startup
            </h1>

            <div className="mb-3 d-flex flex-column gap-2">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3 d-flex flex-column gap-2">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            <p className="text-primary">Forgot password?</p>

            <button
              type="submit"
              className="btn btn-outline-primary w-100 mb-3"
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
              <span className="text-primary">Create one here</span>
            </p>
          </form>
        </div>

        <div className="col-md-7 text-center">
          <img src={WelcomeImage} alt="IBU Startup" />
        </div>
      </main>

      <section
        className="section-background p-5 d-flex justify-content-center"
        style={{ height: "400px" }}
      >
        <div className="d-flex flex-row flex-wrap align-items-center gap-5">
          <div>
            <h1 className="text-primary">Explore startups</h1>
            <p className="text-secondary" style={{ width: "450px" }}>
              In the realm of startup management tools, we're pioneering a new
              approach. Our platform seamlessly integrates expert insights into
              every feature, empowering entrepreneurs to navigate the challenges
              of building and scaling their ventures with confidence.
            </p>
          </div>

          <div
            className="d-flex flex-row flex-wrap gap-0"
            style={{ width: "450px" }}
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
        className="p-5 d-flex justify-content-center"
        style={{ height: "400px" }}
      >
        <div className="d-flex flex-row flex-wrap align-items-center gap-5">
          <div
            className="d-flex flex-row flex-wrap gap-0"
            style={{ width: "450px" }}
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
          <div>
            <h1 className="text-primary">Explore positions</h1>
            <p className="text-secondary" style={{ width: "450px" }}>
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

      <section className="d-flex column section-background p-5 align-items-center">
        <img src={ExpandConnections} height="600" />
        <div>
          <h1 className="text-primary">Expand your connections</h1>
          <p className="text-secondary">
            Within startup management tools, we're bridging expertise with
            execution. Our platform integrates expert insights into position
            management, empowering startups for sustainable growth. Together,
            we're redefining how talent is leveraged for innovation and
            strategic success.
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
