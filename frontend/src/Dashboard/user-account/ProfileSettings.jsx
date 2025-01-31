import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageTo from "../../Utils/uploadOn.js";
import axios from "axios";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { BsPencilFill } from "react-icons/bs";
import PasswordChange from "./PasswordChange.jsx";

const ProfileSettings = ({ user }) => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    role: "patient",
    bloodType: "",
  });
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(false);

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageTo(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/users/${user?._id}`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          photo: formData.photo,
          gender: formData.gender,
          role: formData.role,
          bloodType: formData.bloodType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response?.data;

      if (!data?.success) {
        throw new Error(data.message);
      }

      setLoading(false);
      toast.success(data.message);

      navigate("/users/profile/me");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // user);
  return (
    <section className="">
      <h1 className="text-headingColor text-3xl font-bold text-center">
        Profile Settings
      </h1>
      <form onSubmit={submitHandler}>
        {tab ? (
          <PasswordChange
            setTab={setTab}
            setFormData={setFormData}
            user={user}
          />
        ) : (
          <div>
            <div className="mb-5">
              <input
                value={formData.name}
                type="text"
                className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor "
                name="name"
                placeholder={"Full Name"}
                onChange={handleInputChange}
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
              />
            </div>

            <div className="mb-5">
              <input
                value={formData.bloodType}
                type="text"
                minLength={0}
                maxLength={2}
                className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor "
                name="bloodType"
                placeholder="Blood Type"
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-5 flex items-center justify-between">
              <label
                htmlFor=""
                className="text-headingColor font-bold text-base leading-7  "
              >
                Gender
                <select
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
            <div className="mb-5 flex items-center gap-3">
              {formData.photo && (
                <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor">
                  <img
                    src={formData.photo}
                    alt="Avatar"
                    className="w-full rounded-full "
                  />
                </figure>
              )}
              <div className="relative w-[140px] h-[50px]">
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
                  Set New Profile
                </label>
              </div>
            </div>

            <div className="mt-7 flex gap-20">
              <button
                type="button"
                onClick={() => setTab(true)}
                className="w-48 bg-textColor px-4 py-3 text-white text-[16px] leading-[16px] rounded-lg text-nowrap"
              >
                Change Password
              </button>
              <button
                disabled={loading && true}
                type="submit"
                className="w-full bg-primaryColor px-4 py-3 text-white text-[18px] leading-[30px] rounded-lg"
              >
                {loading ? <HashLoader size={25} color="#fff" /> : "Update"}
              </button>
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

export default ProfileSettings;
