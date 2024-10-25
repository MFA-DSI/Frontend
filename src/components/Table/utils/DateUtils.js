import moment from "moment";

export const getWeeksInMonth = (month, year) => {
  const weeks = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let currentWeekStart = new Date(firstDay);

  while (currentWeekStart <= lastDay) {
    const currentWeekEnd = new Date(
      currentWeekStart.getFullYear(),
      currentWeekStart.getMonth(),
      currentWeekStart.getDate() + 6
    );

    // Format the start and end dates for the current week
    weeks.push(
      `Semaine du ${currentWeekStart.toLocaleDateString()} au ${
        currentWeekEnd > lastDay ? lastDay.toLocaleDateString() : currentWeekEnd.toLocaleDateString()
      }`
    );

    // Move to the next week
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }

  return weeks;
};


export const extractFirstDateFromString = (dateString) => {
  // Use regex to match the first date format in "dd/mm/yyyy"
  const regex = /(\d{2}\/\d{2}\/\d{4})/; // Matches the format "dd/mm/yyyy"
  const match = dateString.match(regex); // Search for the date in the string
  return match ? match[0] : null; // Return the matched date or null if not found
};
