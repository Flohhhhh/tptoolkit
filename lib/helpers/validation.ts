export const validateCoords = (coords: string) => {
  const regex = /^-?\d{1,3}\.\d{6}, ?-?\d{1,3}\.\d{6}$/;
  return regex.test(coords);
};
