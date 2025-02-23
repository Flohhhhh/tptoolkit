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
import { CircleSlash, Loader2 } from "lucide-react";
import { useSearchStore } from "@/lib/store/searchStore";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import LocationListItem from "@/app/components/location-list-item";

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
          <CommandList className="absolute inset-0 overflow-y-auto transform-gpu">
            <CommandEmpty className="py-6 text-center text-sm">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Loader2 className="size-8 animate-spin text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Searching locations...
                  </p>
                </div>
              ) : search.length > 0 ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <CircleSlash className="size-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    No locations matched your search.
                  </p>
                  {/* <p className="text-sm text-muted-foreground/50">
                    Try a different search or check the map for locations.
                  </p> */}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Type to search locations...
                </p>
              )}
            </CommandEmpty>
            {data?.data && (
              <CommandGroup className="px-3 h-full">
                {data.data.map((location: TPLocation) => (
                  <CommandItem
                    key={location.id}
                    value={location.name}
                    onSelect={() => handleSelect(location)}
                    className="my-1 p-0"
                  >
                    <LocationListItem
                      location={location}
                      onClick={() => handleSelect(location)}
                      showSelected={false}
                      className="w-full"
                      altTextType="type"
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          <div className="pointer-events-none absolute bottom-0 h-24 w-full bg-linear-to-t from-background to-transparent" />
        </div>
        <div className="px-3 pb-3">
          {/* <Button variant="outline" className="w-full">
            <MapPin className="w-4 h-4" />
            Service Area Reference
          </Button> */}
        </div>
      </Command>
    </DialogContent>
  );
}
