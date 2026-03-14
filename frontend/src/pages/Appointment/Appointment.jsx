import React, { useEffect, useState } from "react";
import Error from "../../components/Error/Error";
import axios from "axios";
import { BASE_URL, token } from "../../config";
import SearchedDoctorCard from "../Appointment/SearchedDoctorCard";
import { useSelector } from "react-redux";
const Appointment = () => {
  const { user } = useSelector((store) => store.user);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bloodType: user?.bloodType || "",
    phone: user?.phone || "",
    desease: "",
    date: null,
    oldPatient: false,
    doctorId: null,
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [select, setSelect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchHandler = async () => {
    setSelect(false);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/doctors`, {
        params: { query: search },
      });
      const { data } = await res?.data;
      if (data) {
        setDoctor(data);
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setError("Failed to fetch doctors. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedDoc = (doctor) => {
    setSelect(true);
    if (selectedDoctor == doctor._id) {
      setSelectedDoctor(null);
      setSelect(false);
    } else {
      setSelectedDoctor(doctor._id);
    }

    setFormData({ ...formData, doctorId: doctor._id });
    // setDoctor([doctor]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!select) {
      return alert("All fields required");
    }

    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/appointment/new-appointment`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const data = res?.data;

        console.log({ data });
        setError(null);
      } catch (error) {
        setError(error.message || "Something went wrong!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };
  return (
    <section className="">
      <div className="flex flex-col lg:flex-row gap-4 justify-between w-full">
        <section className="w-full">
          <h3 className="text-headingColor heading text-center leading-9 font-bold mb-10">
            Information about <span className="text-primaryColor">Patient</span>
          </h3>
          <div className="rounded-l-lg pl-6 py-10">
            <form action="" onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={user?.name}
                  className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-base font-medium pl-2 "
                  name="name"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  onChange={handleInputChange}
                  type="tel"
                  value={user?.phone}
                  className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor placeholder:text-base font-medium pl-2 "
                  name="phone"
                  placeholder="phone"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  onChange={handleInputChange}
                  type="text"
                  value={user?.bloodType}
                  className="w-full pr-5 py-3 font-semibold border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor pl-2 "
                  name="bloodType"
                  placeholder="Blood Type"
                  required
                />
              </div>
              <div className="mb-5">
                <span className="pl-2 text-textColor text-lg">
                  Enter the date
                </span>
                <input
                  onChange={handleInputChange}
                  type="date"
                  className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor pl-2 "
                  name="date"
                  placeholder="Date"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  onChange={handleInputChange}
                  type="text"
                  className="w-full pr-5 py-3 border-b border-solid border-[#0066ff34] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor font-medium pl-2 "
                  name="desease"
                  placeholder="Enter your Desease"
                  required
                />
              </div>
              <div className="mb-5 grid grid-cols-1">
                <label
                  htmlFor="oldPatient"
                  className="text-lg text-headingColor font-semibold leading-10"
                >
                  Are you an old patient?
                </label>
                <div className="flex items-center w-20 justify-between text-headingColor font-medium">
                  <span>Yes</span>
                  <input
                    onChange={handleInputChange}
                    type="radio"
                    name="oldPatient"
                    id="oldPatient"
                    value={true}
                  />
                </div>
                <div className="flex items-center w-20 justify-between text-headingColor font-medium">
                  <span>No</span>
                  <input
                    defaultChecked
                    onChange={handleInputChange}
                    type="radio"
                    name="oldPatient"
                    id="oldPatient"
                    value={false}
                  />
                </div>
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-fit bg-primaryColor px-4 py-3 text-white text-[18px] leading-[30px] rounded-lg"
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </section>
        <section className="bg-[#fff9ea] w-full max-h-[800px] overflow-y-scroll">
          <div className="container text-center">
            <h2 className="heading">Find a Doctor</h2>
            <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
              <input
                onChange={handleSearch}
                type="search"
                className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
                placeholder="Search for a Doctor"
              />
              <button
                className="btn mt-0 rounded-[0px] rounded-r-md"
                onClick={searchHandler}
              >
                Search
              </button>
            </div>

            {!doctor && !error && (
              <div className="w-full h-72 flex justify-center items-center">
                <h1 className="heading">Search for a Doctor.</h1>
              </div>
            )}
            {!select && (
              <h2 className="text-2xl my-3 text-headingColor font-semibold leading-10">
                Select a doctor
              </h2>
            )}
            {error && !loading && (
              <Error errorMessage={error || "Doctor not found."} />
            )}
            {select && (
              <h2 className="text-2xl my-3 text-headingColor font-semibold leading-10">
                Doctor selected.
              </h2>
            )}
            <div className="w-full sm:grid flex flex-wrap sm:grid-cols-2 md:grid-cols-3 gap-4">
              {doctor &&
                doctor.map((doctor, i) => (
                  <SearchedDoctorCard
                    key={i}
                    doctor={doctor}
                    selectedDoctor={selectedDoctor}
                    onSelectedDoc={handleSelectedDoc}
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Appointment;
