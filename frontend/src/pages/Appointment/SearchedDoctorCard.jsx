import startIcon from "../../images/star.png";
import { Link } from "react-router-dom";
import { formatePatient } from "../../Utils/formatePatient.js";
import { FaCheck } from "react-icons/fa";
const SearchedDoctorCard = ({ doctor, onSelectedDoc, selectedDoctor }) => {
  const {
    _id: id,
    name,
    avgRating,
    totalRating,
    photo,
    bio,
    qualifications,
    specialization,
    patientsCured,
  } = doctor;
  return (
    <div
      className={`${
        selectedDoctor?._id == id ? "ring-green-500" : "hover:ring-green-500"
      } mt-5 w-[178px] relative border rounded-lg rounded-t-2xl cursor-pointer `}
      onClick={() => onSelectedDoc(doctor)}
    >
      <div className="relative">
        {selectedDoctor?._id == id && (
          <FaCheck
            className="w-20 h-20 absolute top-20 left-12"
            color="#46e63b"
          />
        )}
        <img
          className="rounded-t-2xl img_4x4 "
          src={
            photo ||
            "https://unsplash.com/illustrations/a-flat-icon-of-a-doctor-with-a-stethoscope-aSf7_rXvfe8"
          }
          alt="doctor.jpg"
        />
      </div>
      <div className="block">
        <div className="flex flex-col w-full  justify-center">
          <Link
            to={`/doctors/${id}`}
            className="text-sm text-headingColor font-bold mt-3 lg:mt-5 w-full hover:text-primaryColor hover:border-none"
          >
            {name}
          </Link>
          <p className="text-textColor text-[8px] leading-tight ">
            ({`${qualifications[0]}, ${qualifications[1]}`})
          </p>
        </div>
        <p className="text-textColor text-wrap text-[10px] p-0 w-full mt-3">
          {bio}
        </p>
      </div>
      <div className="mt-2 flex items-start justify-around">
        <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-2 text-[8px] font-semibold rounded">
          {specialization}
        </span>
        <div className="flex items-start gap-[6px] pb-2 px-2">
          <span className="flex items-center text-[2px]  font-semibold text-headingColor ">
            <img src={startIcon} alt="" width={12} height={12} />
            {avgRating}
            <span className="text-[8px] leading-6  font-normal text-textColor">
              ({totalRating}+)
            </span>
          </span>
        </div>
      </div>
      {patientsCured && (
        <div className="mb-2">
          <h3 className="text-xs font-semibold text-headingColor">
            {`${formatePatient(patientsCured)} + patients cured successfully`}
          </h3>
        </div>
      )}
    </div>
  );
};

export default SearchedDoctorCard;
