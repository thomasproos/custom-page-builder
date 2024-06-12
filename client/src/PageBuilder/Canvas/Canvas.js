// Import Depedencies
import { useRef, useState } from 'react';

// Import Stylesheet
import './Canvas.css';

// Import Components
import RecursivePaint from './RecursivePaint/RecursivePaint';

export default function Canvas({ cursorTool, blueprint }) {
  const canvasReference = useRef(null);

  // Canvas Type Paint
  return(
    <section id="canvas" ref={canvasReference} className="no-highlight-or-drag">
      {blueprint.children.map((child, index) => {
        return (
          <RecursivePaint key={index} childBlueprint={child} parentReference={canvasReference} cursorTool={cursorTool}
          canvasReference={canvasReference}/>
        );
      })}
    </section>
  );
}