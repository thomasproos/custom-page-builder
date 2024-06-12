// Import Depedencies

// Import Stylesheet
import { useState } from 'react';
import './PageBuilder.css';

// Import Components
import DragCanvas from './Canvas/Canvas';
import Toolbar from './ToolBar/Toolbar';

// Import JSON
import blueprintData from './DefaultBlueprint.json';

export default function PageBuilder({ theme }) {
  const [cursorTool, setCursorTool] = useState('auto');
  const [blueprint, setBlueprint] = useState(blueprintData);
  
  return(
    <section id="page-builder" style={{ cursor: cursorTool }}>
      {/* Toolbar */}
      <Toolbar cursorTool={cursorTool} setCursorTool={setCursorTool} />
      
      {/* Canvas */}
      <DragCanvas cursorTool={cursorTool} blueprint={blueprint}/>
    </section>
  );
}