export const parseMetersToString = (meters: number, short?: boolean) => {
  const feet = meters * 3.28084;
  const miles = feet / 5280;

  if (feet < 1000) {
    return `${Math.round(feet)} ${short ? "ft" : "feet"}`;
  }

  return `${miles.toFixed(2)} ${short ? "mi" : "miles"}`;
};

export const directionToRoadDirection = (direction: string) => {
  const compass = {
    N: "NB",
    S: "SB",
    E: "EB",
    W: "WB",
  };
  return compass[direction as keyof typeof compass];
};

export const timestampToRelativeTime = (timestamp: number) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diff = now.getTime() - then.getTime();
  const diffInSeconds = Math.floor(diff / 1000);
  const diffInMinutes = Math.floor(diff / 1000 / 60);
  const diffInHours = Math.floor(diff / 1000 / 60 / 60);
  const diffInDays = Math.floor(diff / 1000 / 60 / 60 / 24);
  const diffInMonths = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
  const diffInYears = Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12);

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else {
    return "just now";
  }
};
