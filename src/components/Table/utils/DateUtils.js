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
          `Semaine du ${weekStartDate.toLocaleDateString()} au ${weekEndDate.toLocaleDateString()}`
        );
      }
    }
    return weeks;
  };