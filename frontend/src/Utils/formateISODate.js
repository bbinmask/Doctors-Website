export const formateISODate = (dateStr) => {
  const arr = [];

  let date = dateStr.split("T")[0].split("-").reverse().join("-");
  return date;
};
