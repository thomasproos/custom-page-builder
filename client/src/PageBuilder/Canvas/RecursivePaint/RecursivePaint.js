// Import Stylesheet
import './RecursivePaint.css';

// Import Dependencies

// Import Components
import Box from "../Box/Box";
import DraggableComponent from '../DraggableComponent/DraggableComponent';

export default function RecursivePaint({ childBlueprint, parentReference, cursorTool, canvasReference }) {
  // Box Component
  if (childBlueprint.type === 'box') {
    if (cursorTool === 'move') {
      return(
        <DraggableComponent childBlueprint={childBlueprint} canvasReference={canvasReference}>
          <Box childBlueprint={childBlueprint} parentReference={parentReference} cursorTool={cursorTool}
          canvasReference={canvasReference}/>    
        </DraggableComponent>
      );
    } else {
      return(
        <Box childBlueprint={childBlueprint} parentReference={parentReference} cursorTool={cursorTool}/>    
      );
    }
  } else {
    // TO-DO (future components)
  }
}