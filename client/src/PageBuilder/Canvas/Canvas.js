// Import Depedencies
import { useEffect, useRef, useState } from 'react';

// Import Stylesheet
import './Canvas.css';

// Import Components
import Box from './Box/Box';

export default function Canvas({ blueprint, setBlueprint, clearAction, setClearAction, 
  activeDrag, setActiveDrag, adultRef }) {
  const [dragOver, setDragOver] = useState(false);
  const [clear, setClear] = useState(false);
  const [currentDrag, setCurrentDrag] = useState(null);
  const [hoveredDropBox, setHoveredDropBox] = useState(null);
  const parentRef = useRef(null);

  // Clear Actions
  useEffect(() => {
    if (clearAction) {
      setDragOver(false);
      setClearAction(false);
    }
  }, [clearAction, setClearAction]);

  // Handle Drag Start
  const handleDragStart = (event) => {
    setActiveDrag(event.target.id);
  };

  // Handle Drag Over
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Check if hovering over self
    if (activeDrag !== event.currentTarget.id) {
      setDragOver(true);
    }
  };

  // Handle Drag Leave
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
  };

  // Canvas Type Paint
  if (blueprint.type === 'canvas') {
    return(
      <section id="canvas" ref={parentRef} className="no-highlight-or-drag" onClick={() => {setDragOver(false); setClear(true);}}
        onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        {blueprint.children.length > 0 ? 
          <>
            {blueprint.children.map((child, index) => {
              return (
                <Canvas key={index} adultRef={parentRef} blueprint={child} setBlueprint={setBlueprint} clearAction={clear} setClearAction={setClear}
                activeDrag={currentDrag} setActiveDrag={setCurrentDrag}/>
              );
            })}
          </>
          :
          <></>
        }
      </section>
    );
  // Box Type Paint
  } else if (blueprint.type === 'box') {
    return(
      <Box parentRef={parentRef} adultRef={adultRef} blueprint={blueprint} setCurrentDrag={setActiveDrag} currentDrag={activeDrag} 
      handleDragOver={handleDragOver} handleDragStart={handleDragStart} setDragOver={setDragOver} dragOver={dragOver} 
      handleDragLeave={handleDragLeave} hoveredDropBox={hoveredDropBox} setHoveredDropBox={setHoveredDropBox}/>
    );
  }
}