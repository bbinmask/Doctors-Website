import { useEffect, useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorsAbout from "./DoctorsAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import { experienceAndHospital } from "../../Utils/experienceAndHospital.js";
const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/doctors/search/${id}`);
        const { data } = await res?.data;

        setDoctor(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error errorMessage={"Error"} />
        ) : (
          <div className="max-w-[1170px] px-5 mx-auto">
            <div className="grid md:grid-cols-3 gap-[50px]">
              <div className="md:col-span-2">
                <div className="flex items-center gap-5 h-fit">
                  <figure className="max-w-[200px]">
                    <img
                      src={`/public/${doctor?.photo}`}
                      alt=""
                      className="rounded-t-2xl"
                    />
                  </figure>

                  <div className="">
                    <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-base lg:leading-7 font-semibold rounded">
                      {doctor?.specialization}
                    </span>
                    <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                      {doctor?.name}
                    </h3>

                    <div className="flex items-center gap-[6px]">
                      <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-base lg:leading-7 font-semibold text-headingColor">
                        <img src={starIcon} alt="" /> {doctor?.averageRating}
                      </span>
                      <span className=" text-[14px] leading-5 lg:text-base lg:leading-7 font-normal text-textColor">
                        (272)
                      </span>
                    </div>
                    <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                      {doctor?.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-[50px] border border-solid border-[#0066ff34]">
                  <button
                    onClick={() => setTab("about")}
                    className={`${
                      tab == "about" &&
                      "border-b border-solid border-primaryColor"
                    } py-2 px-5 mr-5 text-base leading-7 text-headingColor font-semibold`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setTab("feedback")}
                    className={`${
                      tab == "feedback" &&
                      "border-b border-solid border-primaryColor"
                    } py-2 px-5 mr-5 text-base leading-7 text-headingColor font-semibold`}
                  >
                    Feedback
                  </button>
                </div>

                <div className="mt-[50px]">
                  {tab === "about" && <DoctorsAbout doctor={doctor} />}
                  {tab === "feedback" && (
                    <Feedback id={id} doctor={doctor} setDoctor={setDoctor} />
                  )}
                </div>
              </div>
              <div className="">
                <SidePanel doctor={doctor} />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default DoctorDetails;
