"use client";

import { useState, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { useHistoryStore } from "@/lib/store/historyStore";
import HistoryCardSmall from "./history-card-small";
import HistoryCardLarge from "./history-card-large";
import { useMainStore } from "@/lib/store/mainStore";

export default function HistoryPanel() {
  const { historyPanelOpen, setHistoryPanelOpen } = useMainStore();
  const panelRef = useRef<HTMLDivElement>(null);
  const { history } = useHistoryStore();

  useClickOutside(
    panelRef,
    () => {
      if (historyPanelOpen) setHistoryPanelOpen(false);
    },
    historyPanelOpen
  );

  return (
    <div
      ref={panelRef}
      className={cn(
        "relative w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-all duration-300 ease-in-out",
        "border-t border-border",
        historyPanelOpen ? "h-[65vh]" : "h-[80px]"
      )}
      data-state={historyPanelOpen ? "open" : "closed"}
    >
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-b-none border border-none border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 z-20"
        onClick={() => setHistoryPanelOpen(!historyPanelOpen)}
      >
        <ChevronUp
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            historyPanelOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>

      {/* Panel Content */}
      <div
        className={cn(
          "absolute inset-0 overflow-hidden max-h-full w-full transition-all duration-300 ease-in-out",
          "flex flex-col",
          historyPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex-none p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Search History</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto h-[calc(65vh-4rem)]">
          <div className="grid grid-cols-3 gap-2">
            {history.map((item) => {
              return (
                <div key={item.id}>
                  <HistoryCardLarge item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Collapsed State Content */}
      <div
        className={cn(
          "absolute inset-0 w-full p-4 transition-all duration-300 ease-in-out",
          "flex items-center gap-1",
          "overflow-x-auto overflow-y-hidden whitespace-nowrap",
          "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
          historyPanelOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <div className="flex flex-1 items-center gap-1">
          {history.length > 0 ? (
            [...history]
              .reverse()
              .map((item) => <HistoryCardSmall key={item.id} item={item} />)
          ) : (
            <div className="text-sm text-muted-foreground">
              No recent searches
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
