import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { setUserInfo } from "../store/userInfo.slice";
import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";

const Login = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (!data?.success) {
        throw new Error(data.message);
      }
      dispatch(setUserInfo(data));
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setLoading(false);
      toast.success(data.message);
      navigate("/home");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.token) {
      navigate("/home", {
        replace: true,
      });
      toast.error("Unauthorized!");
    }
  }, []);
  return (
    <section>
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back🎉
        </h3>
        <form className="py-4 md:py-0">
          <div className="mb-5">
            <input
              value={formData.email}
              type="email"
              className="w-full py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor "
              name="email"
              placeholder="Enter Your Email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-5">
            <input
              value={formData.password}
              type="password"
              className="w-full py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor   "
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading && true}
              className="w-full bg-primaryColor px-4 py-3 text-white text-[18px] leading-[30px] rounded-lg"
            >
              {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center ">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-primaryColor font-medium mt-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
