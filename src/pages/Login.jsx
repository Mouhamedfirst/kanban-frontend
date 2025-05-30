import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Logo/Illustration Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <img
          src="/logo-kanban.jpeg"
          alt="Kanban Logo"
          className="w-2/3 max-w-sm animate-fade-in"
        />
      </div>

      {/* Right Login Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <img src="/logo-kanban.jpeg" className="w-12 mx-auto mb-4" alt="Logo" />
            <h2 className="text-3xl font-bold">Log in to your account</h2>
            <p className="text-gray-500 mt-2">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Sign in
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
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
