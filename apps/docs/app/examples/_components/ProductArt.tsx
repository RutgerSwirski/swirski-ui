import { Badge, DiagonalLines } from "@swirski/ui";

import type { CommerceProduct } from "../_data";

type ProductArtProps = {
  product: CommerceProduct;
  className?: string;
};

export default function ProductArt({
  product,
  className = "",
}: ProductArtProps) {
  return (
    <div
      className={`relative min-h-56 overflow-hidden border-4 border-black ${product.color} ${className}`}
    >
      <DiagonalLines
        className="inset-0"
        color="#FFFFFF"
        opacity={0.23}
        spacing={14}
        accentEvery={5}
      />

      {product.kind === "bag" && (
        <>
          <div className="absolute left-1/2 top-10 h-16 w-24 -translate-x-1/2 border-4 border-b-0 border-black bg-white" />
          <div className="absolute bottom-8 left-1/2 h-28 w-36 -translate-x-1/2 border-4 border-black bg-white shadow-[7px_7px_0_#0B0B0C]" />
          <div
            className={`absolute bottom-16 left-1/2 h-10 w-16 -translate-x-1/2 border-4 border-black ${product.accent}`}
          />
        </>
      )}

      {product.kind === "lamp" && (
        <>
          <div className="absolute left-1/2 top-10 h-20 w-36 -translate-x-1/2 border-4 border-black bg-white shadow-[7px_7px_0_#0B0B0C]" />
          <div
            className={`absolute left-1/2 top-[7.25rem] h-24 w-5 -translate-x-1/2 border-x-4 border-black ${product.accent}`}
          />
          <div className="absolute bottom-9 left-1/2 h-8 w-32 -translate-x-1/2 border-4 border-black bg-white" />
        </>
      )}

      {product.kind === "pack" && (
        <>
          <div className="absolute bottom-8 left-1/2 h-36 w-32 -translate-x-1/2 border-4 border-black bg-white shadow-[7px_7px_0_#0B0B0C]" />
          <div
            className={`absolute bottom-20 left-1/2 h-14 w-20 -translate-x-1/2 border-4 border-black ${product.accent}`}
          />
          <div className="absolute bottom-28 left-[calc(50%-5.5rem)] h-16 w-8 border-4 border-black bg-white" />
          <div className="absolute bottom-28 right-[calc(50%-5.5rem)] h-16 w-8 border-4 border-black bg-white" />
        </>
      )}

      <Badge className="absolute left-3 top-3" tone="black" withShadow={false}>
        {product.tag}
      </Badge>
    </div>
  );
}
