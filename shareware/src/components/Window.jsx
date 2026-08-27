import { useState, useRef, useEffect } from 'react';

export default function Window({
  title,
  isMaximized,
  isMinimized,
  initialX = 100,
  initialY = 100,
  initialWidth = 300,
  initialHeight = 200,
  onClose,
  onMinimize,
  onMaximize,
  onRestore,
  children,
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  function startDrag(e) {
    if (isMaximized) return;
    setDragging(true);
    offset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  }

  useEffect(() => {
    if (!dragging) return;

    function onMouseMove(e) {
      setPosition({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    }

    function onMouseUp() {
      setDragging(false);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  return (
    <div
      className="window"
      style={{
        ...(isMaximized
          ? { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }
          : { position: 'absolute', top: position.y, left: position.x, width: initialWidth, height: initialHeight }),
        display: isMinimized ? 'none' : 'block',
      }}
    >
      <div className="title-bar" onMouseDown={startDrag} style={{ cursor: isMaximized ? 'default' : 'move' }}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={onMinimize}></button>
          {isMaximized ? (
            <button aria-label="Restore" onClick={onRestore}></button>
          ) : (
            <button aria-label="Maximize" onClick={onMaximize}></button>
          )}
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}