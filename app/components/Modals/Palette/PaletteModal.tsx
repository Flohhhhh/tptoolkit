"use client";

import { useState, useEffect, useContext } from "react";
import { ModalContext } from "@/lib/context/modalContext";
import { turnpikeData } from "@/lib/parsedData";
import { useMap } from "@/lib/context/mapContext";
import { SendHorizontal } from "lucide-react";

export default function PaletteModal() {
  const { updateCoordsMarker, updateSelected, flyTo } = useMap();
  const { setModalOpen } = useContext(ModalContext);
  const [input, setInput] = useState("@");
  const [suggestions, setSuggestions] = useState(["TP", "GSP"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkIncludes = (input: string, substrings: string[]) => {
    return substrings.some((substring) => input.includes(substring));
  };

  useEffect(() => {
    if (!input.startsWith("@GSP") && !input.startsWith("@TP")) {
      setSuggestions(["GSP", "TP", "..."]);
    } else if (input.startsWith("@GSP")) {
      if (!checkIncludes(input, [" NB", " SB", " LOC", " EXP"])) {
        setSuggestions(["NB", "SB", "LOC", "EXP"]);
      } else if (checkIncludes(input, [" LOC", " EXP"])) {
        if (!checkIncludes(input, [" NB", " SB"])) {
          setSuggestions([" NB", " SB"]);
        } else if (!checkIncludes(input, [" NB", " EXT"])) {
          console.log("Hello");
          setSuggestions([" MP", " EXT"]);
        } else {
          if (!checkIncludes(input, [" MP", " EXT"])) {
            setSuggestions([" MP", " EXT"]);
          } else {
            if (input.includes(" MP")) {
              setSuggestions(["Enter a mile marker"]);
            } else if (input.includes(" EXT")) {
              setSuggestions(["Enter an exit number"]);
            }
          }
        }
      } else if (checkIncludes(input, [" NB", " SB"])) {
        if (!checkIncludes(input, [" MP", " EXT"])) {
          setSuggestions([" MP", " EXT"]);
        } else {
          if (input.includes(" MP")) {
            setSuggestions(["Enter a mile marker"]);
          } else if (input.includes(" EXT")) {
            setSuggestions(["Enter an exit number"]);
          }
        }
      }
    } else if (input.startsWith("@TP")) {
      if (!checkIncludes(input, [...turnpikeData.roadways, "INT"])) {
        setSuggestions([
          "SN",
          "NS",
          "SNO",
          "SNI",
          "NSO",
          "NSI",
          "INT",
          "NS95",
          "NS80",
          "...",
        ]);
      } else {
        if (checkIncludes(input, turnpikeData.roadways)) {
          if (!checkIncludes(input, [" MP"])) {
            setSuggestions(["MP"]);
          } else {
            setSuggestions(["Enter a mile marker"]);
          }
        } else if (checkIncludes(input, ["INT"])) {
          setSuggestions(["Enter an interchange identifier"]);
        }
      }
    }
  }, [input]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    query: string
  ) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");
    updateSelected();

    console.log("Submitting");

    const res = await fetch(`/api/search/text?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      setLoading(false);
      setError(data);
      return;
    }

    console.log(data);
    updateSelected(data);
    updateCoordsMarker(data.y, data.x);
    flyTo(data.y, data.x);
    setLoading(false);
    setModalOpen(false);
  };

  const suggestionBlocks = suggestions.map((suggestion) => (
    <button
      key={suggestion}
      disabled={
        loading ||
        suggestion === "Enter a mile marker" ||
        suggestion === "Enter an exit number" ||
        suggestion === "..."
      }
      className="animate-in text-xs rounded-md border border-shark-100 dark:border-shark-600 px-2 bg-shark-50 dark:bg-shark-700 py-1 enabled:hover:brightness-95 enabled:dark:hover:brightness-125 transition duration-50"
      onClick={() => {
        if (suggestion === "...") return;
        if (suggestion === "Enter a mile marker") return;
        if (suggestion === "Enter an exit number") return;

        setInput(`${input}${suggestion} `);
      }}
    >
      <span>{suggestion}</span>
    </button>
  ));

  return (
    <div className="text-shark-700 dark:text-shark-200">
      <form
        onSubmit={(e) => handleSubmit(e, input)}
        className="flex justify-between items-center -m-2 rounded-t-xl px-3 py-1 mb-1 bg-shark-50 dark:bg-shark-900"
      >
        <input
          type="text"
          name="query"
          value={input.toUpperCase()}
          onChange={(e) => {
            setError("");
            if (e.target.value === "") {
              setInput("@");
              return;
            }
            setInput(e.target.value);
          }}
          className="bg-shark-50 dark:bg-shark-900 disabled:opacity-50 transition text-sm border-none w-full rounded-md active:ring-0 focus:ring-0 focus:outline-none px-0 py-2 m-0"
          placeholder="@"
          disabled={loading}
        />
        <button
          disabled={loading || input === "@"}
          className="text-shark-500 disabled:opacity-50 dark:text-shark-300 bg-shark-50 rounded-md p-[6px] dark:bg-shark-700 enabled:hover:brightness-95 enabled:dark:hover:brightness-125 border border-shark-100 dark:border-shark-600 transition duration-50"
        >
          <SendHorizontal size={14} />
        </button>
      </form>

      <div className="py-2 space-y-2">
        <div className="flex gap-1 items-center">{suggestionBlocks}</div>
        {error ? (
          <p className="pl-1 text-xs text-red-500 dark:text-red-400">{error}</p>
        ) : (
          <p className="pl-1 text-xs text-shark-300 dark:text-shark-400">
            Enter a location to view details.
          </p>
        )}
      </div>
    </div>
  );
}
