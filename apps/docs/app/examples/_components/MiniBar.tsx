type MiniBarProps = {
  value: number;
  color: string;
};

export default function MiniBar({ value, color }: MiniBarProps) {
  return (
    <div className="flex h-24 items-end border-2 border-black bg-white">
      <div
        className={`${color} h-full w-full border-t-2 border-black`}
        style={{
          transform: `scaleY(${value / 100})`,
          transformOrigin: "bottom",
        }}
      />
    </div>
  );
}
