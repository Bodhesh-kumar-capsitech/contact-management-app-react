import type { Color } from "../Newapp";

interface Props {
  color: Color;
  onDelete: (id: number) => void;
}

export default function ColorCard({ color, onDelete }: Props) {
  return (
    <div
      className="w-32 h-32 rounded-lg flex items-center justify-center text-white font-bold relative shadow-md"
      style={{ backgroundColor: color.hex }}
    >
      <button
        onClick={() => onDelete(color.id)}
        className="absolute top-1 right-1 bg-black bg-opacity-40 text-white px-2 py-1 rounded text-xs hover:bg-opacity-70"
      >
        ✕
      </button>
      {color.hex}
    </div>
  );
}
