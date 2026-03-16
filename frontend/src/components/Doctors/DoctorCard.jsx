import React from "react";
import startIcon from "@/assets/images/star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { formatePatient } from "../../Utils/formatePatient.js";
import Error from "../Error/Error.jsx";
const DoctorCard = ({ doctor }) => {
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
    hospital,
  } = doctor;
  return (
    <>
      {!id && <Error errorMessage={"Somethig went wrong!"} />}
      {id && (
        <div className="p-3 lg:p-5 w-fit border rounded-lg">
          <Link to={`/doctors/${id}`} className="">
            <img
              className="w-80 h-96 rounded-t-2xl object-cover"
              src={photo}
              alt="doctor"
            />
          </Link>
          <div className="block">
            <div className="flex gap-2">
              {" "}
              <h2 className="text-[18px] leading-[10px] lg:text-[26px] lg:leading-[15px] text-headingColor font-bold mt-3 lg:mt-5 w-full">
                {name}
              </h2>
              <p className="text__para text-sm w-fit">
                ({`${qualifications[0]}, ${qualifications[1]}`})
              </p>
            </div>
            <p className="text__para">{bio}</p>
          </div>
          <div className="mt-2 lg:mt-4 flex items-center justify-between">
            <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-base lg:leading-7 font-semibold rounded">
              {specialization}
            </span>
            <div className="flex items-center gap-[6px] ">
              <span className="flex items-center gap-[6px] text-sm leading-6 lg:text-base lg:leading-7 font-semibold text-headingColor ">
                <img src={startIcon} alt="" />
                {avgRating}
              </span>
              <span className="text-[14px] leading-6 lg:text-base lg:leading-7 font-normal text-textColor">
                ({totalRating}+)
              </span>
            </div>
            <div className="mt-[18px] lg:mt-5 flex items-center justify-between"></div>
          </div>
          <div className="">
            <h3 className="text-base leading-7 mt-2 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
              {formatePatient(patientsCured)}+ patients
            </h3>
            <p className="text-[14px] leading-6 font-normal text-textColor">
              {hospital}
            </p>
          </div>
          <Link
            to={`/doctors/${id}`}
            className="w-11 h-11 rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none
                "
          >
            <BsArrowRight className="group-hover:text-white w-6 h-5" />
          </Link>
        </div>
      )}
    </>
  );
};

export default DoctorCard;
