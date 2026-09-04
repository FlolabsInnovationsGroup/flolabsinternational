import { describe, expect, it } from "vitest";

import {
  PREFERRED_SOURCE_DISMISS_MS,
  isPreferredSourceDismissed,
  isPreferredSourcePrivatePath,
  readPreferredSourceDismissedAt,
} from "./preferred-source";

describe("isPreferredSourcePrivatePath", () => {
  it("hides the chip on account and HR routes", () => {
    expect(isPreferredSourcePrivatePath("/login")).toBe(true);
    expect(isPreferredSourcePrivatePath("/me")).toBe(true);
    expect(isPreferredSourcePrivatePath("/me/hr/responses")).toBe(true);
    expect(isPreferredSourcePrivatePath("/profile")).toBe(true);
  });

  it("allows public marketing and blog routes", () => {
    expect(isPreferredSourcePrivatePath("/")).toBe(false);
    expect(isPreferredSourcePrivatePath("/blogs")).toBe(false);
    expect(isPreferredSourcePrivatePath("/blogs/some-post")).toBe(false);
    expect(isPreferredSourcePrivatePath("/internships")).toBe(false);
  });
});

describe("isPreferredSourceDismissed", () => {
  it("is false when nothing has been stored", () => {
    expect(isPreferredSourceDismissed(1_000, null)).toBe(false);
  });

  it("is true within the 30-day window", () => {
    const dismissedAt = 10_000;
    expect(
      isPreferredSourceDismissed(
        dismissedAt + PREFERRED_SOURCE_DISMISS_MS - 1,
        dismissedAt,
      ),
    ).toBe(true);
  });

  it("expires after 30 days", () => {
    const dismissedAt = 10_000;
    expect(
      isPreferredSourceDismissed(
        dismissedAt + PREFERRED_SOURCE_DISMISS_MS,
        dismissedAt,
      ),
    ).toBe(false);
  });
});

describe("readPreferredSourceDismissedAt", () => {
  it("returns null for missing or invalid values", () => {
    expect(readPreferredSourceDismissedAt(null)).toBe(null);
    expect(
      readPreferredSourceDismissedAt({
        getItem: () => null,
      }),
    ).toBe(null);
    expect(
      readPreferredSourceDismissedAt({
        getItem: () => "nope",
      }),
    ).toBe(null);
  });

  it("parses a stored timestamp", () => {
    expect(
      readPreferredSourceDismissedAt({
        getItem: () => "1710000000000",
      }),
    ).toBe(1_710_000_000_000);
  });
});
