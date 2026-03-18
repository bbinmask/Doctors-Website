export const formatDoctorAbout = (doctor) => {
  const { name, about, qualifications, specialization, specialFields, gender } =
    doctor;

  const genderText = gender === "female" ? "She" : "He";

  if (qualifications.length === 0 || name.trim() === "") return "N/A";

  return about.trim() !== ""
    ? about
    : `${name} is an ${
        qualifications.length >= 2
          ? `${qualifications[0]} with ${qualifications[1]}`
          : `${qualifications[0]}`
      }. ${genderText} known for his expertise in ${
        specialFields.length !== 0
          ? specialFields.length >= 2
            ? `${specialFields[0]} & ${specialFields[1]}`
            : `${specialFields[0]}`
          : `${specialization}`
      }`;
};
