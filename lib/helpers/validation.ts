export const validateCoords = (coords: string) => {
  const regex = /^-?\d{1,3}\.\d+, ?-?\d{1,3}\.\d+$/;
  return regex.test(coords);
};
