import React from "react";
import AuthToggle from "../components/AuthToggle";
import { loginUser, signupUser } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = ({ setUser }) => {
  const handleAuthSubmit = async (isLogin, formData) => {
    try {
      const response = isLogin
        ? await loginUser(formData) // Login request
        : await signupUser(formData); // Signup request

      if (isLogin) {
        // For login, you might want to store the token in localStorage
        localStorage.setItem("authToken", response.data.token);
        setUser({ token: response.data.token });
        toast.success("Sign Up Successful");
      } else {
        // For signup, the response may include the user data
        setUser(response.data.user);
        toast.success("User Registered Successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    }
  };

  return <AuthToggle onAuthSubmit={handleAuthSubmit} />;
};

export default AuthPage;
