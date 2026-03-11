import { useMainStore } from "../store/mainStore";
import { useHistoryStore } from "../store/historyStore";
import { validateCoords } from "./validation";
import {
  type CoordinateSearchErrorType,
  type CoordinateSearchSource,
  trackSearchCoordinates,
} from "../analytics/events";

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
  options: {
    addHistory?: boolean;
    source?: CoordinateSearchSource;
  } = {}
) => {
  const { addHistory = true, source = "search_panel" } = options;
  const historyStore = useHistoryStore.getState();
  console.log("searchCoords called", lat, lng);
  const store = useMainStore.getState();
  store.setCoordsResults([]);
  store.setSearchWindowState("closed");
  store.setSearchingCoords(true);
  console.log("fetching coords", lat, lng);
  try {
    const res = await fetch(`/api/v2/search/coords?x=${lng}&y=${lat}`, {
      method: "GET",
    });
    // If parsing fails, treat as no results
    const data = await res.json().catch(() => null);
    console.log("data", data);

    const success = res.ok && Array.isArray(data);
    const resultCount = success ? data.length : 0;
    let errorType: CoordinateSearchErrorType = "none";

    if (success) {
      store.setCoordsResults(data);
    } else {
      store.setCoordsResults([]);
      // capture an error message for UI, but keep results empty
      const message = typeof data === "string" ? data : "No results";
      store.setSearchError(message);
      errorType = res.status === 404 ? "no_results" : "request_failed";
    }

    trackSearchCoordinates({
      source,
      success,
      result_count: resultCount,
      error_type: errorType,
    });

    if (addHistory) {
      const resultText =
        Array.isArray(data) && data.length > 0 && data[0]?.name
          ? data[0].name
          : "No results";
      historyStore.addHistoryItem({
        id: crypto.randomUUID(),
        inputContent: `${lat},${lng}`,
        resultText,
        lat: Number(lat),
        lng: Number(lng),
        timestamp: Date.now(),
      });
    }
  } catch (error) {
    console.error("searchCoords error", error);
    store.setCoordsResults([]);
    store.setSearchError(
      error instanceof Error ? error.message : "An error occurred"
    );
    trackSearchCoordinates({
      source,
      success: false,
      result_count: 0,
      error_type: "request_failed",
    });
  } finally {
    store.setSearchingCoords(false);
    store.setSidebarTab("results");
    store.setSelectedLocation(null);
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
