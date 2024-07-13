// Import Depedencies
import { useRef } from 'react';

// Import Stylesheet
import './Box.css';

// Import Components
import RecursivePaint from '../RecursivePaint/RecursivePaint';

export default function Box({ childBlueprint, parentReference, canvasReference }) {
  const currentReference = useRef(null);

  return(
    // Box Container
    <div ref={currentReference} id={"box-" + childBlueprint.id} style={childBlueprint.style} className="canvas-box">
      {/* Box Children */}
      {childBlueprint.children.map((child, index) => {
        return (
          <RecursivePaint key={index} childBlueprint={child} parentReference={currentReference} canvasReference={canvasReference}/>
        );
      })}
    
    </div>
  );
}