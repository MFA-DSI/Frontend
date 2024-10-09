import moment from "moment";

export const getTimeSince = (creationDatetime) => {
  const now = moment();
  const created = moment(creationDatetime);

  const diffMinutes = now.diff(created, "minutes");
  const diffHours = now.diff(created, "hours");
  const diffDays = now.diff(created, "days");
  const diffMonths = now.diff(created, "months");
  const diffYears = now.diff(created, "years");

  if (diffMinutes < 60) {
    return `il y a ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
  } else if (diffHours < 24) {
    return `il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`;
  } else if (diffDays < 30) {
    return `il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  } else if (diffMonths < 12) {
    return `il y a ${diffMonths} mois`;
  } else {
    return `il y a ${diffYears} an${diffYears > 1 ? "s" : ""}`;
  }
};

export const convertToJSDate = (localDateOrTime) => {
  if (localDateOrTime.length === 10) {
    return moment(localDateOrTime + "T00:00:00");
  }
  return moment(localDateOrTime);
};
