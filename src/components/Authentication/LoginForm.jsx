import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Ship Maintenance Login
        </h2>
        <form onSubmit={SubmitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-blue-800 text-lg font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border border-blue-300 rounded-lg text-black focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-blue-800 text-lg font-semibold mb-1">
              Role
            </label>
            <div className="flex gap-4">
              {["admin", "inspector", "engineer"].map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-1 text-blue-700"
                >
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-blue-800 text-lg font-semibold"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-blue-300 rounded-lg text-black focus:ring focus:ring-blue-200"
            />
            <p className="text-sm text-gray-500 mt-1">
              We'll never share your email with anyone else.
            </p>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-blue-800 text-lg font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-blue-300 rounded-lg text-black focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-900 transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
