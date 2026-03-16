import { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import DoctorCard from "./DoctorCard";
import useFetchData from "../../hooks/useFetchData";
const DoctorList = () => {
  const {
    loading,
    error,
    data: doctors,
  } = useFetchData(`http://localhost:5000/api/v1/doctors/initial-doctors`);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {doctors.map((doctor, i) => (
        <DoctorCard key={i} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
