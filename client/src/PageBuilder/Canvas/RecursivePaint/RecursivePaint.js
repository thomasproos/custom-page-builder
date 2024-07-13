// Import Stylesheet
import './RecursivePaint.css';

// Import Dependencies

// Import Components
import Box from "../Box/Box";
import InteractiveContainer from '../DraggableComponent/InteractiveContainer';

export default function RecursivePaint({ childBlueprint, parentReference, canvasReference }) {
  // Box Component
  if (childBlueprint.type === 'box') {
      return(
        <InteractiveContainer childBlueprint={childBlueprint} canvasReference={canvasReference} parentReference={parentReference}>
          <Box childBlueprint={childBlueprint} parentReference={parentReference} canvasReference={canvasReference}/>    
        </InteractiveContainer>
      );
  } else {
    // TO-DO (future components)
  }
}