export const metricTiles = [
  { label: "Pipeline", value: "$4.2M", note: "+18% vs. last month" },
  { label: "NPS", value: "72", note: "Enterprise accounts" },
  { label: "Seats", value: "18.4K", note: "Active this week" },
] as const;

export const deals = [
  {
    account: "Northstar HR",
    owner: "Iris",
    stage: "Expansion",
    value: "$78K",
    progress: 82,
  },
  {
    account: "Forge Labs",
    owner: "Malik",
    stage: "Procurement",
    value: "$124K",
    progress: 64,
  },
  {
    account: "Atlas Freight",
    owner: "Noa",
    stage: "Security",
    value: "$51K",
    progress: 48,
  },
] as const;

export const portfolioProjects = [
  {
    title: "Mercury Commerce",
    type: "Identity",
    color: "bg-[#FF3131]",
  },
  {
    title: "North Pier",
    type: "Web",
    color: "bg-[#0057FF]",
  },
  {
    title: "Signal House",
    type: "Product",
    color: "bg-[#FFD400]",
  },
] as const;

export const commerceProducts = [
  {
    name: "Grid Tote",
    price: "$74",
    tag: "Best seller",
    color: "bg-[#FFD400]",
    accent: "bg-[#0057FF]",
    kind: "bag",
  },
  {
    name: "Loop Lamp",
    price: "$128",
    tag: "New",
    color: "bg-[#0057FF]",
    accent: "bg-[#FFD400]",
    kind: "lamp",
  },
  {
    name: "Modular Pack",
    price: "$96",
    tag: "Low stock",
    color: "bg-[#FF3131]",
    accent: "bg-[#F5F5F3]",
    kind: "pack",
  },
] as const;

export type CommerceProduct = (typeof commerceProducts)[number];
