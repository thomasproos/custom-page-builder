// Import Depedencies

// Import Stylesheet
import { useState } from 'react';
import './PageBuilder.css';

// Import Components
import Canvas from './Canvas/Canvas';

export default function PageBuilder({ theme }) {
  const [blueprint, setBlueprint] = useState({
    type: 'canvas',
    level: 0,
    idIndex: 0,
    position: 0,
    id: 3,
    style: {},
    children: [
      {
        type: 'box',
        parent: 'column',
        level: 1,
        id: 1,
        style: {},
        children: [],
        sides: {
          top: true,
          right: false,
          bottom: true,
          left: false
        }
      },
      {
        type: 'box',
        parent: 'column',
        level: 1,
        id: 2,
        style: {},
        children: [],
        sides: {
          top: true,
          right: false,
          bottom: true,
          left: false
        }
      },
      {
        type: 'box',
        parent: 'column',
        level: 1,
        id: 3,
        style: {},
        children: [],
        sides: {
          top: true,
          right: false,
          bottom: true,
          left: false
        }
      },
    ]
  });
  
  return(
    <section id="page-builder">
      <div id="toolbar" className="no-highlight-or-drag">
        <div id="toolbar-new-container-bttn" className="toolbar-bttn">New</div>
        <div id="toolbar-new-text-bttn" className="toolbar-bttn">Trash</div>
      </div>
      
      {/* Canvas */}
      <Canvas blueprint={blueprint} setBlueprint={setBlueprint}/>
    </section>
  );
}