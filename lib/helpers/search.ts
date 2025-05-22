import { useMainStore } from "../store/mainStore";
import { useHistoryStore } from "../store/historyStore";
import { validateCoords } from "./validation";

export const parseInput = (searchInput: string) => {
  const store = useMainStore.getState();
  // console.log("parseInput", searchInput);
  // check if input is valid coordinates
  const isCoords = validateCoords(searchInput);
  if (isCoords) {
    // console.log("isCoords", isCoords);
    const [lat, lng] = searchInput.split(",");
    // console.log("lat", lat);
    // console.log("lng", lng);
    // check if coords are within bounds
    if (
      Number(lat) < 38 ||
      Number(lat) > 42 ||
      Number(lng) < -79 ||
      Number(lng) > -71
    ) {
      store.setSearchError("Coordinates are out of bounds");
      console.error("Coordinates are out of bounds");
      return { type: "error" };
    }
    return { type: "coords" };
  }
  // check if input is only numbers, -, ., comma, or space (partial coords)
  const isNumeric = /^[\d\s,.-]+$/.test(searchInput) && searchInput.length > 0;
  if (isNumeric) {
    return { type: "numeric" };
  }
  return { type: "text" };
};

export const searchCoords = async (
  lat: number,
  lng: number,
  addHistory = true
) => {
  const historyStore = useHistoryStore.getState();
  console.log("searchCoords called", lat, lng);
  const store = useMainStore.getState();
  store.setCoordsResults([]);
  store.setSearchWindowState("closed");
  store.setSearchingCoords(true);
  console.log("fetching coords", lat, lng);
  const res = await fetch(`/api/v2/search/coords?x=${lng}&y=${lat}`, {
    method: "GET",
  });
  const data = await res.json();
  console.log("data", data);
  store.setCoordsResults(data);
  store.setSearchingCoords(false);

  if (addHistory) {
    historyStore.addHistoryItem({
      id: crypto.randomUUID(),
      inputContent: `${lat},${lng}`,
      resultText: data[0].name,
      lat: Number(lat),
      lng: Number(lng),
      timestamp: Date.now(),
    });
  }
};

// export const search = async () => {
//   const store = useMainStore.getState();
//   const searchInput = store.searchInput;
//   const { type } = parseInput(searchInput);
//   const [y, x] = searchInput.split(",");

//   console.log("type", type);
//   store.setSearching(true);

//   if (type === "error") {
//     return;
//   } else if (type === "coords") {
//     try {
//       console.log("x", x);
//       console.log("y", y);
//       const res = await fetch(`/api/v2/search/coords?x=${x}&y=${y}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data);
//       }

//       console.log("data", data);
//       store.setSearchResults(data);
//       store.setSearching(false);
//     } catch (error) {
//       console.error("[lib/store/searchStore] searchCoords error", error);
//       store.setSearchError(
//         error instanceof Error ? error.message : "An error occurred"
//       );
//       store.setSearching(false);
//     }
//   } else if (type === "text") {
//     try {
//       const res = await fetch(`/api/v2/search/name?input=${searchInput}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data);
//       }

//       console.log("data", data);
//       store.setSearchResults(data);
//       store.setSearching(false);
//     } catch (error) {
//       console.error("[lib/store/searchStore] searchText error", error);
//       store.setSearchError(
//         error instanceof Error ? error.message : "An error occurred"
//       );
//       store.setSearching(false);
//     }
//   }
// };
