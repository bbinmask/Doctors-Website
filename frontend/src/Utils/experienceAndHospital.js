export const experienceAndHospital = (experiences) => {
  let string;
  let data = [];

  experiences.forEach((element) => {
    let years = "";
    let exp = "";

    element.split(" ").forEach((el, i) => {
      if (i < 2) {
        years += el + " ";
      } else {
        exp += el + " ";
      }
    });

    data = [...data, { years, exp }];
  });

  return data;
};
