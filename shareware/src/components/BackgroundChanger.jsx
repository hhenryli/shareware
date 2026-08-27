export default function BackgroundChanger({ setBgColor }) {
  return (
    <div className="flex gap-2 p-2">
      <button className="btn" onClick={() => setBgColor('#008080')}>Teal</button>
      <button className="btn" onClick={() => setBgColor('#00007f')}>Navy</button>
      <button className="btn" onClick={() => setBgColor('#800000')}>Maroon</button>
    </div>
  );
}