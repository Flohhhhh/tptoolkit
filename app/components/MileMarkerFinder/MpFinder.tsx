"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Search, X, Command } from "lucide-react";
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

const isMac =
  typeof window !== "undefined" &&
  navigator.platform.toUpperCase().indexOf("MAC") >= 0;

const MpFinder = () => {
  const {
    enteredCoords,
    setEnteredCoords,
    searchCoords,
    results,
    searchError,
    setSearchError,
    searching,
    clearResults,
  } = useSearchStore();

  const form = useForm<CoordsForm>({
    resolver: zodResolver(coordsSchema),
    defaultValues: {
      coords: enteredCoords,
    },
  });

  const handleSearch = async (values: CoordsForm) => {
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
    <div className="absolute top-10 bottom-0 w-[320px] z-10 ">
      <div className="h-full col-span-3 flex flex-col justify-between self-start w-full rounded-lg p-4">
        <div>
          <h1 className="text-xl font-semibold mb-4 text-foreground">
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
                          className="pr-10"
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
                        variant="secondary"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        disabled={searching}
                      >
                        <Search className="h-3 w-3" />
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
              <p className="text-muted-foreground mt-4 custom-animate-in text-sm">
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
                  <Button
                    variant="outline"
                    onClick={clearResults}
                    className="justify-start gap-3 custom-animate-in-2"
                    icon={<X className="size-4" />}
                  >
                    Clear results
                  </Button>
                  <p className="select-none text-sm text-muted-foreground mt-4 custom-animate-in-3">
                    These results are only approximate suggestions! Verify the
                    roadway and location with the caller!
                  </p>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            onClick={openPalette}
            variant="secondary"
            className="w-full justify-between px-2"
            icon={
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span className="text-xs">Name search </span>
              </div>
            }
          >
            <span className="justify-self-end text-xs px-3 py-1 rounded border bg-background/50 text-muted-foreground border-muted-foreground/20 flex items-center gap-1">
              {isMac ? (
                <>
                  <Command className="size-3" />K
                </>
              ) : (
                "Ctrl+K"
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MpFinder;
