import { createContext, useContext } from "react";

export type NativeCardResolvedTextTone = "default" | "inverted";

const NativeCardContext = createContext<{
  textTone: NativeCardResolvedTextTone;
}>({
  textTone: "default",
});

export const NativeCardProvider = NativeCardContext.Provider;

export function useNativeCardTextTone() {
  return useContext(NativeCardContext).textTone;
}
