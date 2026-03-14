import DoctorCard from "../../components/Doctors/DoctorCard.jsx";
import Testimonial from "../../components/Testimonial/Testimonial.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import Error from "../../components/Error/Error.jsx";
import Loading from "../../components/Loader/Loading.jsx";
const Doctors = () => {
  const [doctors, setDoctor] = useState();
  const [initDoctors, setInitDoctors] = useState(null);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/doctors`, {
        params: { query: search },
      });

      const { data } = res?.data;
      if (data) {
        setDoctor(data);
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setError("Failed to fetch doctors. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      setError(false);

      try {
        const res = await axios.get(`${BASE_URL}/doctors/initial-doctors`);
        const { data } = await res.data;

        setInitDoctors(data);
      } catch (error) {
        console.error(error?.response?.data || error);
        setError("Sorry, No Data Found");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search for a Doctor"
            />
            <button
              onClick={handleSearch}
              className="btn mt-0 rounded-[0px] rounded-r-md"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {doctors &&
        doctors.map((doctor, i) => (
          <section className="block">
            <h2 className="heading leading-10 text-center mb-10">
              Found the Doctor for you.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
              <DoctorCard key={i} doctor={doctor} />
            </div>
          </section>
        ))}

      {loading && <Loading />}
      {error && <Error errorMessage={error || "Sorry, No data found."} />}
      {!loading && !error && (
        <div>
          <h2 className="heading leading-10 text-center mb-10">
            Our Best Doctors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 ">
            {initDoctors?.map((doctor, i) => (
              <DoctorCard key={i} doctor={doctor} />
            ))}
          </div>
        </div>
      )}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
