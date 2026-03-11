import { afterEach, describe, expect, it, vi } from "vitest";
import {
  directionToRoadDirection,
  parseMetersToString,
  timestampToRelativeTime,
} from "../../lib/helpers/conversions";

describe("conversions helpers", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe("parseMetersToString", () => {
    it("formats shorter distances in feet", () => {
      expect(parseMetersToString(100)).toBe("328 feet");
      expect(parseMetersToString(100, true)).toBe("328 ft");
    });

    it("formats longer distances in miles", () => {
      expect(parseMetersToString(2000)).toBe("1.24 miles");
      expect(parseMetersToString(2000, true)).toBe("1.24 mi");
    });
  });

  describe("directionToRoadDirection", () => {
    it("maps N/S/E/W to NB/SB/EB/WB", () => {
      expect(directionToRoadDirection("N")).toBe("NB");
      expect(directionToRoadDirection("S")).toBe("SB");
      expect(directionToRoadDirection("E")).toBe("EB");
      expect(directionToRoadDirection("W")).toBe("WB");
    });
  });

  describe("timestampToRelativeTime", () => {
    it("returns just now for less than a minute", () => {
      vi.useFakeTimers();
      const now = new Date("2026-03-11T12:00:00.000Z");
      vi.setSystemTime(now);

      expect(timestampToRelativeTime(now.getTime() - 30_000)).toBe("just now");
    });

    it("returns minute, hour, and day labels", () => {
      vi.useFakeTimers();
      const now = new Date("2026-03-11T12:00:00.000Z");
      vi.setSystemTime(now);

      expect(timestampToRelativeTime(now.getTime() - 5 * 60_000)).toBe(
        "5 minutes ago"
      );
      expect(timestampToRelativeTime(now.getTime() - 2 * 60 * 60_000)).toBe(
        "2 hours ago"
      );
      expect(timestampToRelativeTime(now.getTime() - 3 * 24 * 60 * 60_000)).toBe(
        "3 days ago"
      );
    });
  });
});
