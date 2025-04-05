import { FaSignInAlt } from "react-icons/fa";

const SignUp = () => {
  return (
    <div className="section-background text-dark">
      <header className="d-flex justify-content-between align-items-center p-3">
        <h1 className="text-primary">IBU | Startup</h1>
        <button className="btn btn-outline-primary d-flex align-items-center gap-2">
          <FaSignInAlt size={20} />
          <span className="align-middle">Sign in</span>
        </button>
      </header>

      <main>
        <h1 className="text-primary text-center">
          Make the most out of your experience!
        </h1>

        <div className="d-flex justify-content-center align-items-center flex-column">
          <form
            className="d-flex justify-content-center flex-column gap-3 mt-4 p-5 bg-white rounded border border-2"
            style={{ width: "400px" }}
          >
            <label htmlFor="email" className="form-label">
              Email address
              <input
                type="email"
                id="email"
                className="form-control mt-2"
                placeholder="Enter your email"
              />
            </label>
            <label htmlFor="email" className="form-label">
              Email address
              <input
                type="email"
                id="email"
                className="form-control mt-2"
                placeholder="Enter your email"
              />
            </label>
            <label htmlFor="email" className="form-label">
              Email address
              <input
                type="email"
                id="email"
                className="form-control mt-2"
                placeholder="Enter your email"
              />
            </label>
            <label htmlFor="email" className="form-label">
              Email address
              <input
                type="email"
                id="email"
                className="form-control mt-2"
                placeholder="Enter your email"
              />
            </label>
            <label htmlFor="email" className="form-label">
              Email address
              <input
                type="email"
                id="email"
                className="form-control mt-2"
                placeholder="Enter your email"
              />
            </label>
            <label htmlFor="email" className="form-label">
              Email address
              <input
                type="email"
                id="email"
                className="form-control mt-2"
                placeholder="Enter your email"
              />
            </label>
            <button className="btn btn-outline-primary">Sign up</button>

            <p className="text-secondary">
              Already have an account? Click here to{" "}
              <span className="text-primary">sign in.</span>
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
