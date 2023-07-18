export const getAge = (fullYear: number, month: number, day: number) => {
  let today = new Date();
  let calculatedBirthday = new Date(fullYear, month, day);
  var calculatedAge = today.getFullYear() - calculatedBirthday.getFullYear();
  var m = today.getMonth() - calculatedBirthday.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < calculatedBirthday.getDate())) {
    calculatedAge = calculatedAge - 1;
  }

  return { calculatedBirthday, calculatedAge };
};
