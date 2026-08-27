export default function Taskbar({ openWindows, onToggleMinimize }) {
  return (
    <div className='w-full bg-[#bbc0bf] fixed bottom-0 window flex justify-between'>

      <div className="flex">
        <button className='aria-label flex justify-center items-center font-bold'>
          <img src='/icons/start.png' className='w-4'/>
          Start
        </button>

        <div className="flex gap-1">
          {openWindows.map((win) => (
            <button key={win.id} className="btn" onClick={() => onToggleMinimize(win.id)}>
              {win.title}
            </button>
          ))}
        </div>
      </div>


      <div className="status-field-border flex p-0">
        <img src='/icons/sound.png' className='w-4 h-4' />
        12:45 PM
      </div>
    </div>
  );
}