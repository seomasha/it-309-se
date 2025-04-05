import { IoIosPersonAdd } from "react-icons/io";

const SignUp = () => {
  return (
    <div className="section-background text-dark">
      <header className="d-flex justify-content-between align-items-center p-3">
        <h1 className="text-primary">IBU | Startup</h1>
        <button className="btn btn-outline-primary d-flex align-items-center gap-2">
          <IoIosPersonAdd size={20} />
          <span className="align-middle">Create an account</span>
        </button>
      </header>
    </div>
  );
};

export default SignUp;
