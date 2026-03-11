import { describe, expect, it } from "vitest";
import { validateCoords } from "../../lib/helpers/validation";

describe("validation helpers", () => {
  describe("validateCoords", () => {
    it("accepts valid decimal latitude/longitude pairs", () => {
      expect(validateCoords("40.123,-74.456")).toBe(true);
      expect(validateCoords("40.123, -74.456")).toBe(true);
      expect(validateCoords("-40.123,74.456")).toBe(true);
      expect(validateCoords("0.000, 0.001")).toBe(true);
    });

    it("rejects malformed coordinate input", () => {
      expect(validateCoords("40,-74")).toBe(false);
      expect(validateCoords("abc,def")).toBe(false);
      expect(validateCoords("40.123 -74.456")).toBe(false);
      expect(validateCoords("40.123,")).toBe(false);
      expect(validateCoords("40.123,-74.456,1")).toBe(false);
      expect(validateCoords("")).toBe(false);
    });
  });
});
