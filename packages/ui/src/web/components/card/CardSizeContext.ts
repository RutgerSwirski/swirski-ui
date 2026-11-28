"use client";

import { createContext } from "react";
import type { CardSize } from "./Card";

export const CardSizeContext = createContext<CardSize | undefined>(undefined);
