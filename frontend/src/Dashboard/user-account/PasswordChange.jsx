import axios from "axios";
import { useState } from "react";
import { BASE_URL, token } from "../../config";
import PasswordError from "../../components/Error/PasswordError";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";
const PasswordChange = ({ setTab, setFormData, user }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [enable, setEnable] = useState(false);
  const [password, setPassword] = useState({
    first: null,
    second: null,
  });
  const handleOldPassword = async (e) => {
    const pass = e.target.value;
    if (pass.length <= 6) {
      setEnable(false);
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/users/check-password/${user?._id}`,
        { oldPassword: pass },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.data;
      if (!data.success) {
        setError(true);
        setErrorMessage(data.message);
        setEnable(false);

        return;
      }
      setError(false);
      setEnable(true);
    } catch (error) {
      setError(true);
      setEnable(false);
      setErrorMessage("Password not correct");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!password.first || !password.second) {
      toast.error("Field cannot be empty!");
      return;
    } else if (password.first !== password.second) {
      toast.error("New password is not same");
      return;
    }

    try {
      const res = await axios.put(
        `${BASE_URL}/users/change-password/${user._id}`,
        { newPassword: password.first },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res?.data;

      if (!data.success) {
        toast.error(data?.message || "Something went wrong!");
        throw new Error(data?.message);
      }
      setPassword({ first: null, second: null });
      setTab(false);
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <div className="mb-5 ">
        <input
          type="password"
          className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor "
          name="old-password"
          placeholder="Enter old password"
          onChange={handleOldPassword}
        />
        {error && <PasswordError error={errorMessage} />}
      </div>
      <div className="mb-5">
        <input
          onChange={handlePasswordChange}
          disabled={!enable && true}
          type="password"
          required={true}
          minLength={6}
          className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor "
          name="first"
          placeholder="Enter a new password"
        />
      </div>
      <div className="mb-5">
        <input
          onChange={handlePasswordChange}
          type="password"
          disabled={!enable && true}
          required={true}
          minLength={6}
          className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor "
          name="second"
          placeholder="Re-enter a new password"
        />
      </div>
      <button
        disabled={!enable && true}
        type="button"
        className="btn"
        onClick={submitHandler}
      >
        Change Password
      </button>
    </div>
  );
};

export default PasswordChange;
