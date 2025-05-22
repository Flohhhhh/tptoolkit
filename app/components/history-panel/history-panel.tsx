"use client";

import { useState, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/lib/hooks/useClickOutside";

export default function HistoryPanel() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useClickOutside(
    panelRef,
    () => {
      if (open) setOpen(false);
    },
    open
  );

  return (
    <div
      ref={panelRef}
      className={cn(
        "relative w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-all duration-300 ease-in-out",
        "border-t border-border",
        open ? "h-[65vh]" : "h-[80px]"
      )}
      data-state={open ? "open" : "closed"}
    >
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-b-none border border-none border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200 z-20"
        onClick={() => setOpen(!open)}
      >
        <ChevronUp
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>

      {/* Panel Content */}
      <div
        className={cn(
          "absolute inset-0 w-full overflow-hidden transition-all duration-300 ease-in-out",
          "flex flex-col",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex-1 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Search History</h2>
          {/* Add your history content here */}
          <div className="text-sm text-muted-foreground">
            No recent searches
          </div>
        </div>
      </div>

      {/* Collapsed State Content */}
      <div
        className={cn(
          "absolute inset-0 w-full p-4 transition-all duration-300 ease-in-out",
          "flex items-center",
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <span className="text-sm text-muted-foreground">
          Click to view search history
        </span>
      </div>
    </div>
  );
}
