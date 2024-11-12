import moment from "moment";
export const getWeeksInMonthWithOverflow = (month, year) => {
  const weeks = [];
  const firstDay = new Date(year, month, 1);
  let currentWeekStart = new Date(firstDay);

  // Boucle tant que la semaine commence dans le mois sélectionné
  while (currentWeekStart.getMonth() === month) {
    const currentWeekEnd = new Date(
      currentWeekStart.getFullYear(),
      currentWeekStart.getMonth(),
      currentWeekStart.getDate() + 6,
    );

    // Affiche la semaine avec overflow possible vers le mois suivant
    weeks.push(
      `Semaine du ${currentWeekStart.toLocaleDateString("fr-FR")} au ${currentWeekEnd.toLocaleDateString(
        "fr-FR",
      )}`,
    );

    // Avancer de 7 jours pour commencer la semaine suivante
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
