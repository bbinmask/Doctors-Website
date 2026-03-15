import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetUserInfo } from "../../store/userInfo.slice";
import MyBookings from "./MyBookings";
import Profile from "./ProfileSettings";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { User } from "lucide-react";
const MyAccount = () => {
  const dispatch = useDispatch();

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
  const [tab, setTab] = useState("bookings");

  const handleLogOut = () => {
    dispatch(resetUserInfo());
    localStorage.clear();
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto font-[poppins]">
        {loading && !error && <Loading />}

        {error && !loading && <Error errorMessage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  {userData?.photo ? (
                    <img
                      src={userData?.photo}
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <User className="h-full w-full p-4" />
                  )}
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-lg leading-8 text-headingColor font-bold">
                  {userData?.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData?.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:{" "}
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData?.bloodType}
                  </span>
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px]">
                <button
                  className="w-full bg-[#181a1e] p-3 text-white text-base leading-7 rounded-md"
                  onClick={handleLogOut}
                >
                  Log out
                </button>
                <button className="w-full bg-red-600 mt-4 p-3 text-white text-base leading-7 rounded-md">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div className="flex justify-between px-20">
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab == "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-sm leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab == "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-sm leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
