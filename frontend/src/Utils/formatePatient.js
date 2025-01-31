const defaultValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

export const formatePatient = (num) => {
  let patient;
  defaultValues.forEach((key, i) => {
    if (num >= key) {
      patient = key;
    } else if (num <= key) {
      return patient;
    }
  });
  return patient;
};
