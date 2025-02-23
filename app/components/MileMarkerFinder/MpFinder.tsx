"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Search } from "lucide-react";
import MileMarker from "./MileMarker";
import { pushModal } from "@/components/dialogs";
import { useSearchStore } from "@/lib/store/searchStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasteGoButton } from "./paste-go-button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import type { ControllerRenderProps } from "react-hook-form";
import LocationListItem from "../location-list-item";

const coordsSchema = z.object({
  coords: z.string().regex(/^-?\d+\.?\d*,\s*-?\d+\.?\d*$/, {
    message: "Invalid coordinate format. Expected: lat, lng",
  }),
});

type CoordsForm = z.infer<typeof coordsSchema>;

const MpFinder = () => {
  const {
    enteredCoords,
    setEnteredCoords,
    searchCoords,
    results,
    searchError,
    setSearchError,
    searching,
    startSearch,
    clearResults,
  } = useSearchStore();

  const form = useForm<CoordsForm>({
    resolver: zodResolver(coordsSchema),
    defaultValues: {
      coords: enteredCoords,
    },
  });

  const handleSearch = async (values: CoordsForm) => {
    startSearch();
    const [y, x] = values.coords.split(",").map(Number);
    if (isNaN(x) || isNaN(y)) {
      setSearchError("Invalid coordinates");
      return;
    }
    await searchCoords(x, y);
  };

  const openPalette = () => {
    pushModal("PaletteDialog");
  };

  return (
    <div className="absolute top-10 bottom-0 w-[320px] z-10">
      <div className="h-full col-span-3 flex flex-col justify-between self-start w-full rounded-lg p-4">
        <div>
          <h1 className="text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-200">
            Location Lookup
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSearch)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="coords"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<CoordsForm, "coords">;
                }) => (
                  <FormItem>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Coordinates"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setEnteredCoords(e.target.value);
                            clearResults();
                          }}
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        size="icon"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full px-3"
                        disabled={searching}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
              <PasteGoButton
                onPaste={(text) => form.setValue("coords", text)}
              />
            </form>
          </Form>

          <div className="flex flex-col items-center justify-center">
            {results === null && !searching && !searchError ? (
              <p className="text-zinc-200 dark:text-zinc-500 mt-4 custom-animate-in">
                Input coordinates to see nearby markers & landmarks!
              </p>
            ) : null}
            {searchError ? (
              <p className="mt-4 text-sm text-center text-red-400 bg-zinc-50 dark:bg-zinc-700 px-4 py-2 rounded-md custom-animate-in">
                {searchError}
              </p>
            ) : null}
            {searching ? (
              <div role="status" className="mt-12 custom-animate-in">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-zinc-200 animate-spin dark:text-zinc-600 fill-zinc-100"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              results && (
                <div className="w-full h-full flex flex-col gap-1 mt-4">
                  {results
                    .filter(
                      (result): result is TPLocation & { distance: number } => {
                        if (!result.distance) {
                          console.error(`null distance for ${result.name}`);
                          return false;
                        }
                        return true;
                      }
                    )
                    .map((result) => (
                      <LocationListItem
                        key={result.id}
                        location={result}
                        distance={result.distance}
                      />
                    ))}
                  <p className="text-sm text-muted-foreground mt-4 custom-animate-in-2">
                    These results are only approximate suggestions! Verify the
                    roadway and location with the caller!
                  </p>
                </div>
              )
            )}
          </div>
        </div>
        <div>
          <button
            onClick={openPalette}
            className="w-full py-1.5 justify-between px-4 hover:brightness-95 transition duration-50 dark:hover:brightness-125 flex items-center gap-2 bg-zinc-50 dark:bg-zinc-700 rounded-md border border-zinc-100 dark:border-zinc-600 text-zinc-500 dark:text-zinc-200"
          >
            <span className="text-sm">Lookup by name </span>
            <span className="text-xs px-3 py-1 rounded border text-zinc-500 dark:text-zinc-200 bg-white dark:bg-zinc-800 border-zinc-100 dark:border-zinc-600">
              /
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MpFinder;
