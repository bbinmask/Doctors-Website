import { formateDate } from "../../Utils/formateDate";
import { experienceAndHospital } from "../../Utils/experienceAndHospital";
import { formatDoctorAbout } from "../../Utils/formatDoctorAbout";
const DoctorsAbout = ({ doctor }) => {
  const { name, bio, about, experiences, qualifications, specialFields } =
    doctor;

  return (
    <div>
      <div className="">
        <h3 className="text-[20px]  leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text__para">{formatDoctorAbout(doctor)}</p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px]  leading-[30px] text-headingColor font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          {qualifications.map((qual, i) => (
            <li
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
              key={i}
            >
              <div className="">
                <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                  {formateDate("09-13-2014")} - {formateDate("09-13-2016")}
                </span>
                <p className="text-base leading-6 font-medium text-textColor">
                  {qual}
                </p>
                <p className="text-[14px] leading-6 font-medium text-textColor">
                  New Apollo Hospital, New York.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px]  leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {experienceAndHospital(experiences)?.map((exp, i) => (
            <li className="p-4 rounded bg-[#fff9ea]" key={i}>
              <span className="text-yellowColor text-[18px] leading-6 font-semibold">
                {/* {formateDate("09-13-2014")} - {formateDate("09-13-2016")} */}
                {exp.years} of experience
              </span>
              <p className="text-base leading-6 font-medium text-textColor">
                {specialFields[i]}
              </p>
              <p className="text-[14px] leading-6 font-medium text-textColor">
                {exp.exp}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorsAbout;
