import Palette from './Palette';

export default function BackgroundChanger({ setBackground }) {
  const presetColors = ['#008080', '#00007f', '#800000'];
  const presetImages = ['/backgrounds/clouds.jpg'];

  return (
    <div className="flex flex-col gap-3 p-2">
      <div>
        <p className="text-sm mb-1">Solid colors</p>
        <div className="flex gap-2">
          {presetColors.map((color) => (
            <Palette key={color} color={color} setBackground={setBackground} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm mb-1">Background images</p>
        <div className="flex gap-2">
          {presetImages.map((img) => (
            <button
              key={img}
              className="btn"
              onClick={() => setBackground(`url(${img}) center/cover`)}
            >
              <img src={img} alt="" className="w-10 h-10 object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}