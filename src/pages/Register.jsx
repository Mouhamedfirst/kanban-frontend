import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Logo/Illustration */}
      <div className="hidden md:flex w-1/2  items-center justify-center p-8">
        <img
          src="/logo-kanban.jpeg"
          alt="Kanban Logo"
          className="w-2/3 max-w-sm animate-fade-in"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <img src="/logo-kanban.jpeg" className="w-12 mx-auto mb-4" alt="Logo" />
            <h2 className="text-3xl font-bold">Create a new account</h2>
            <p className="text-gray-500 mt-2">Join us today — it’s free!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <InputField
              label="Name"
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
            />

            <InputField
              label="Confirm Password"
              type="password"
              name="password_confirmation"
              placeholder="********"
              value={form.password_confirmation}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Get Started
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5"
              />
              Sign in with Google
            </button>
          </form>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
