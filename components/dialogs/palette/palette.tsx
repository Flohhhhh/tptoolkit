"use client";

import { useState } from "react";
import { DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { useMap } from "@/lib/context/mapContext";
import useSWR from "swr";
import { searchLocationsByName } from "@/lib/actions/search";
import { popModal } from "@/components/dialogs";
import { Loader2 } from "lucide-react";
import { useSearchStore } from "@/lib/store/searchStore";

const fetcher = (name: string) => searchLocationsByName(name, 10);

export default function PaletteDialog() {
  const [search, setSearch] = useState("");
  const cleanSearch = search.replace(/\./g, "");
  const { data, error, isLoading } = useSWR(
    cleanSearch.length > 2 ? cleanSearch : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000,
    }
  );
  const { updateSelected, updateCoordsMarker } = useMap();
  const { searchCoords } = useSearchStore();

  const handleSelect = (location: TPLocation) => {
    if (location.x_old && location.y_old) {
      updateCoordsMarker(location.y_old, location.x_old);
      searchCoords(location.x_old, location.y_old);
    }
    updateSelected(location);
    popModal();
  };

  return (
    <DialogContent className="sm:max-w-[640px] p-0 gap-0 overflow-hidden">
      <Command className="rounded-lg" shouldFilter={false}>
        <div className="px-3 pt-3">
          <CommandInput
            placeholder="Search locations..."
            value={search}
            onValueChange={setSearch}
            className="h-11"
          />
        </div>
        <div className="h-[300px] overflow-hidden relative">
          <CommandList className="absolute inset-0 overflow-y-auto">
            <CommandEmpty className="py-6 text-center text-sm">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    Searching locations...
                  </p>
                </div>
              ) : search.length > 0 ? (
                "No locations found."
              ) : (
                "Type to search locations..."
              )}
            </CommandEmpty>
            {data?.data && (
              <CommandGroup>
                {data.data.map((location: TPLocation) => (
                  <CommandItem
                    key={location.id}
                    value={location.name}
                    onSelect={() => handleSelect(location)}
                    className="px-4 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{location.name}</span>
                      {location.type && (
                        <span className="text-sm text-muted-foreground">
                          {location.type.replace(/_/g, " ")}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          <div className="pointer-events-none absolute bottom-0 h-24 w-full bg-gradient-to-t from-background to-transparent" />
        </div>
      </Command>
    </DialogContent>
  );
}
