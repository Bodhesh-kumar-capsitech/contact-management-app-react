import { useState } from "react";
import ColorCard from "./componenets/Colorcard";

export interface Color {
  id: number;
  hex: string;
}

export default function Newapp() {
  const [color, setColor] = useState("#ff0000");
  const [savedColors, setSavedColors] = useState<Color[]>([]);

  const saveColor = () => {
    if (savedColors.find((c) => c.hex === color)) return;
    const newColor: Color = {
      id: Date.now(),
      hex: color,
    };
    setSavedColors([...savedColors, newColor]);
  };

  const deleteColor = (id: number) => {
    setSavedColors(savedColors.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎨 Color Picker</h1>

      <div className="flex items-center justify-center gap-4 mb-8">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-16 rounded border-2 border-gray-300 shadow"
        />
        <button
          onClick={saveColor}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          Save Color
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {savedColors.map((c) => (
          <ColorCard key={c.id} color={c} onDelete={deleteColor} />
        ))}
      </div>
    </div>
  );
}
