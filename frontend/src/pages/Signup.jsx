import { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import avatar from "../assets/images/doctor-img01.png";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../Utils/uploadOnCloudinary";
import axios from "axios";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    role: "patient",
  });
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (
      formData.email == "" ||
      formData.password == "" ||
      formData.name == "" ||
      formData.gender == "" ||
      formData.role == ""
    ) {
      alert("All fields are mandatory");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        photo: formData.photo,
        gender: formData.gender,
        role: formData.role,
      });
      const data = await response?.data;

      if (!data?.success) {
        throw new Error(data.message);
      }

      setLoading(false);
      toast.success(data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      throw new Error(error.message);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {/* =========== img box ========= */}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={signupImg}
                alt="Image"
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>
          {/* ========== signup form ========= */}

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">Account</span>
            </h3>
            <form action="" onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  value={formData.name}
                  type="text"
                  className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor "
                  name="name"
                  placeholder="Full Name"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  value={formData.email}
                  type="email"
                  className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor "
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  value={formData.password}
                  type="password"
                  className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor "
                  name="password"
                  placeholder="Create a Password"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-headingColor font-bold text-base leading-7  "
                >
                  Are you a:
                  <select
                    required
                    name="role"
                    onChange={handleInputChange}
                    value={formData.role}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient" className="">
                      Patient
                    </option>
                    <option value="doctor" className="">
                      Doctor
                    </option>
                  </select>
                </label>
                <label
                  htmlFor=""
                  className="text-headingColor font-bold text-base leading-7  "
                >
                  Gender
                  <select
                    required
                    onChange={handleInputChange}
                    value={formData.gender}
                    name="gender"
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="female" className="">
                      Female
                    </option>
                    <option value="male" className="">
                      Male
                    </option>
                    <option value="others" className="">
                      Others
                    </option>
                  </select>
                </label>
              </div>
              <div className="mb-15 flex items-center gap-3">
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor">
                    <img
                      src={previewURL}
                      alt="Avatar"
                      className="w-full rounded-full "
                    />
                  </figure>
                )}
                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    onChange={handleFileInputChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    name="photo"
                    id="customFile"
                    accept=".jpg, .png"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor px-4 py-3 text-white text-[18px] leading-[30px] rounded-lg"
                >
                  {loading ? <HashLoader size={35} color="#fff" /> : "Sign up"}
                </button>
              </div>

              <p className="mt-5 text-textColor text-center ">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-primaryColor font-medium mt-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
