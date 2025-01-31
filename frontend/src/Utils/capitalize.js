export const capitalize = (string) => {
  if (!string) return ""; // Handle empty strings

  let str = "";

  if (string.includes(" ")) {
    let arrOfString = string.split(" ");
    arrOfString.forEach((word) => {
      let firstLetter = word.at(0).toUpperCase();
      let restString = word.substring(1);
      let finalString = firstLetter + restString;
      str += finalString + " "; // Append with a space
    });
    str = str.trim(); // Remove trailing space
  } else {
    let firstLetter = string.at(0).toUpperCase();
    let restString = string.substring(1);
    str = firstLetter + restString;
  }

  return str;
};
