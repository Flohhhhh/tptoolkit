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
