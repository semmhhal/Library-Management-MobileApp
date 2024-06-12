export const today = new Date();
export const twoWeeksLater = new Date();
twoWeeksLater.setDate(today.getDate() + 14);
export const twoWeeksBefore = new Date();
twoWeeksBefore.setDate(today.getDate() - 14);
// Function to format dates to YYYY-MM-DD format
export const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
