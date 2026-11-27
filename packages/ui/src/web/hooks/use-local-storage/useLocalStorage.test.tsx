import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => window.localStorage.clear());

  it("loads an existing value without overwriting it during initialization", async () => {
    window.localStorage.setItem("theme", JSON.stringify("dark"));

    const { result } = renderHook(() => useLocalStorage("theme", "light"));

    await waitFor(() => expect(result.current[0]).toBe("dark"));
    expect(window.localStorage.getItem("theme")).toBe(JSON.stringify("dark"));
  });

  it("loads a new key without writing the previous key value into it", async () => {
    window.localStorage.setItem("second", JSON.stringify("stored"));
    const { result, rerender } = renderHook(
      ({ storageKey }) => useLocalStorage(storageKey, "default"),
      { initialProps: { storageKey: "first" } },
    );

    act(() => result.current[1]("first value"));
    rerender({ storageKey: "second" });

    await waitFor(() => expect(result.current[0]).toBe("stored"));
    expect(window.localStorage.getItem("second")).toBe(JSON.stringify("stored"));
  });

  it("removes rather than immediately recreating a reset value", () => {
    const { result } = renderHook(() => useLocalStorage("filters", ["new"]));

    act(() => result.current[1](["sale"]));
    act(() => result.current[2]());

    expect(result.current[0]).toEqual(["new"]);
    expect(window.localStorage.getItem("filters")).toBeNull();
  });

  it("synchronizes storage changes from another document", () => {
    const { result } = renderHook(() => useLocalStorage("count", 0));

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "count",
          newValue: JSON.stringify(2),
          storageArea: window.localStorage,
        }),
      );
    });

    expect(result.current[0]).toBe(2);
  });

  it("keeps React state working when storage writes are restricted", () => {
    const setItem = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new DOMException("Blocked");
      });
    const { result } = renderHook(() => useLocalStorage("count", 0));

    act(() => result.current[1]((count) => count + 1));

    expect(result.current[0]).toBe(1);
    setItem.mockRestore();
  });
});
