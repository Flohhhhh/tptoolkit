"use client";

import { useMainStore } from "@/lib/store/mainStore";
import { useEffect, useState } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Input } from "@/components/ui/input";

export default function Search() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 500);

  const { searchInput, setSearchInput, searchResults, setSearchResults } =
    useMainStore();

  // this is just precautionary right now, we're not executing any actions on input change yet
  useEffect(() => {
    // console.log(debouncedInput);
    if (debouncedInput.length > 0) {
      setSearchInput(debouncedInput);
    } else {
      setSearchInput("");
    }
  }, [debouncedInput]);

  return (
    <div className="drop-shadow-xl border border-foreground/10 min-w-0 sm:min-w-sm rounded-lg p-1 bg-background">
      <Input
        type="text"
        placeholder="Enter coordinates or name to search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
