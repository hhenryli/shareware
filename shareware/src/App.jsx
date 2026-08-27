import { useState } from 'react'
import "98.css/dist/98.css";
import './App.css'
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import DesktopIcon from './components/DesktopIcon';
import { appRegistry } from './AppRegistry';



function App() {
  const [openWindows, setOpenWindows] = useState(() => {
    const width = 300;
    const height = 400;
    return [
      {
        id: 'home',
        title: 'Welcome to Shareware',
        isMaximized: false,
        isMinimized: false,
        x: (window.innerWidth - width) / 2,
        y: (window.innerHeight - height) / 2,
        width,
        height,
      },
    ];
  });
  const [bgColor, setBgColor] = useState('#00007f');

  function openWindow(id, title, options = {}) {
    setOpenWindows((prev) => {
      if (prev.find((w) => w.id === id)) return prev;
  
      const width = options.width ?? 300;
      const height = options.height ?? 200;
  
      const x = options.x ?? (window.innerWidth - width) / 2;
      const y = options.y ?? (window.innerHeight - height) / 2;
  
      return [
        ...prev,
        { id, title, isMaximized: false, isMinimized: false, x, y, width, height },
      ];
    });
  }
  
  function closeWindow(id) {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  }
  
  function toggleMinimize(id) {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: !w.isMinimized } : w))
    );
  }
  
  function toggleMaximize(id) {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }

  return (
    <>
      <div className='w-screen h-screen' style={{ backgroundColor: bgColor }}>

        {openWindows.map((win) => {
          const AppComponent = appRegistry[win.id].component;
            return (
              <Window
                key={win.id}
                title={win.title}
                isMaximized={win.isMaximized}
                isMinimized={win.isMinimized}
                initialX={win.x}
                initialY={win.y}
                initialWidth={win.width}
                initialHeight={win.height}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => toggleMinimize(win.id)}
                onMaximize={() => toggleMaximize(win.id)}
                onRestore={() => toggleMaximize(win.id)}
              >
              <AppComponent setBgColor={setBgColor} />
            </Window>
          );
        })}
 
        <div className='flex flex-col flex-wrap w-fit p-8 gap-4'>
          <DesktopIcon label="Readme" icon="/icons/home.png" onOpen={() => openWindow('home', 'Welcome to Shareware', {width: 300, height: 400})}  />
          <DesktopIcon label="Background Changer" icon="/icons/bgchanger.png" onOpen={() => openWindow('bgchanger', 'Background Changer')} />
        </div>

        <Taskbar
          openWindows={openWindows}
          onToggleMinimize={toggleMinimize}
        />
      </div>
    </>
  )
}

export default App
