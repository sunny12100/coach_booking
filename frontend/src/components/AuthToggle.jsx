import React, { useState } from "react";

const AuthToggle = ({ onAuthSubmit }) => {
  const [isLogin, setIsLogin] = useState(true);
  const initialFormData = isLogin
    ? {
        email: "",
        password: "",
      }
    : { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);

  const handleToggle = () => setIsLogin(!isLogin);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Conditionally remove username for login
    const dataToSubmit = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

    onAuthSubmit(isLogin, dataToSubmit);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        className={` p-6 rounded shadow-md w-80 h-96 ${
          isLogin ? "bg-white duration-300" : "bg-black duration-300"
        }`}
      >
        <h2
          className={`text-xl font-bold ${
            isLogin ? "text-black" : "text-white"
          }`}
        >
          Welcome
        </h2>
        <h3
          className={`text-sm font-medium mb-10 ${
            isLogin ? "text-black" : "text-white"
          }`}
        >
          glad to see you!
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-3 py-2 focus:outline-none  ${
                isLogin
                  ? "border-b-2 border-gray-400"
                  : "border-b-2 border-gray-400 bg-black text-white"
              }`}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 focus:outline-none  ${
              isLogin
                ? "border-b-2 border-gray-400"
                : "border-b-2 border-gray-400 bg-black text-white"
            }`}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 focus:outline-none  ${
              isLogin
                ? "border-b-2 border-gray-400"
                : "border-b-2 border-gray-400 bg-black text-white"
            }`}
            required
          />
          <button
            type="submit"
            className={`w-full py-2 rounded ${
              isLogin
                ? "bg-black text-white hover:bg-black "
                : "bg-white text-black hover:bg-white"
            }`}
          >
            {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
          </button>
        </form>
        <button
          className={`mt-4  hover:underline ${
            isLogin ? "text-black" : "text-white"
          }`}
          onClick={handleToggle}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthToggle;
