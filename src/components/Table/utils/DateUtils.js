import moment from "moment";

export const getWeeksInMonth = (month, year) => {
  const weeks = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = firstDay.getDate() - firstDay.getDay();
  const endDate = lastDay.getDate();

  for (let i = startDate; i <= endDate; i += 7) {
    const weekStartDate = new Date(year, month, i);
    const weekEndDate = new Date(year, month, i + 6);
    if (weekStartDate.getDate() <= endDate) {
      weeks.push(
        `Semaine du ${weekStartDate.toLocaleDateString()} au ${weekEndDate.toLocaleDateString()}`,
      );
    }
  }
  return weeks;
};

export const extractFirstDateFromString = (dateString) => {
  // Use regex to match the first date format in "dd/mm/yyyy"
  const regex = /(\d{2}\/\d{2}\/\d{4})/; // Matches the format "dd/mm/yyyy"
  const match = dateString.match(regex); // Search for the date in the string
  return match ? match[0] : null; // Return the matched date or null if not found
};

