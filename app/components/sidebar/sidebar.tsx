import { useMainStore } from "@/lib/store/mainStore";

export default function Sidebar() {
  const { searchingCoords, coordsResults } = useMainStore();
  return (
    <div className="border-r border-border z-10 h-full">
      {searchingCoords && <div>Searching...</div>}
      {coordsResults.map((result) => (
        <div key={result.id}>{result.name}</div>
      ))}
    </div>
  );
}
