export default function DesktopIcon({ label, icon, onOpen }) {
  return (
    <div onClick={onOpen}>
      <div className='w-12 flex flex-col items-center gap-1'>
        <div className='w-12 h-12 flex items-center justify-center'>
          {icon ? (
            <img src={icon} alt={label} className='w-10 h-10 object-contain' />
          ) : (
            <div className='w-12 h-12 bg-[#bbc0bf]'></div>
          )}
        </div>
        <label className='text-white text-center leading-tight'>{label}</label>
      </div>
    </div>
  );
}