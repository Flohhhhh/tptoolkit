import { useMainStore } from "../store/mainStore";

export const parseInput = () => {
  const { searchInput, setSearchInput, setSearchResults } = useMainStore();
  // check if input is valid coordinates
  const isCoords = /^-?\d{1,3}\.\d{6}, -?\d{1,3}\.\d{6}$/.test(searchInput);
  if (isCoords) {
    const [lat, lng] = searchInput.split(",");
    setSearchInput(searchInput);
  }
};
