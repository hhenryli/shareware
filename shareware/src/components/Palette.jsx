export default function Palette({ color, setBackground }) {
  return (
    <button
      onClick={() => setBackground(color)}
      className="w-8 h-8 border"
      style={{ backgroundColor: color }}
    ></button>
  );
}