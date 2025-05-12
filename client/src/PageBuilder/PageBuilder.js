// Import Depedencies

// Import Stylesheet
import { useState } from 'react';
import './PageBuilder.css';

// Import Components
import Canvas from './Canvas/Canvas';
import Toolbar from './ToolBar/Toolbar';
import Index from './Index/Index';

// Import JSON
import blueprintData from './DefaultBlueprint.json';

export default function PageBuilder({ theme }) {
  const [blueprint, setBlueprint] = useState(blueprintData);
  
  return(
    <section id="page-builder">
      {/* Toolbar */}
      <Toolbar />
      
      <div style={{ width: '100%', height: '100%' }}>
        {/* Attributes Panel */}


        {/* Canvas */}
        <Canvas blueprint={blueprint}/>
      </div>
    </section>
  );
}