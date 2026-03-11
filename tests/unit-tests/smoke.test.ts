import { describe, expect, it } from "vitest";
import {
  directionToRoadDirection,
  parseMetersToString,
} from "../../lib/helpers/conversions";
import { validateCoords } from "../../lib/helpers/validation";

describe("unit test smoke", () => {
  it("loads core helper modules", () => {
    expect(typeof parseMetersToString).toBe("function");
    expect(typeof directionToRoadDirection).toBe("function");
    expect(typeof validateCoords).toBe("function");
  });
});
