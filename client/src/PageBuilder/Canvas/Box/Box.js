// Import Depedencies
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../../ReduxStore.js';

// Import Stylesheet
import './Box.css';

// Import Components
import RecursivePaint from '../RecursivePaint/RecursivePaint';

export default function Box({ childBlueprint, parentReference, cursorTool, canvasReference }) {
  const [currentlyHovered, setCurrentHovered] = useState(false);
  const currentReference = useRef(null);
  // const [dropHighlight, setDropHighlight] = useState('');
  // const [modifiedBox, setModifiedBox] = useState(null);
  // const [position, setPosition] = useState(null);
  // const [currentDragPosition, setCurrentDragPosition] = useState(null);
  // const containerRef = useRef(null);

  // Establish
  const dispatch = useDispatch();
  const draggedComponent = useSelector(state => state.draggedComponent);

  // Handle Drag Over
  const handleDragOver = (event) => {
      console.log(':D');
      // Verify that the user is dragging a component
    if (draggedComponent !== null) {
      // The redux value setter method
      const setHoveredComponent = (value) => {
        dispatch({ type: actionTypes.SET_HOVERED_COMPONENT, payload: value });
      };
  
      setHoveredComponent(event.target.id);
      setCurrentHovered(true);
    }
  };

  const handleDragOverLeave = (event) => {
    // Verify that the user is dragging a component
      console.log(':o');
      if (draggedComponent !== null) {
      // The redux value setter method
      const setHoveredComponent = (value) => {
        dispatch({ type: actionTypes.SET_HOVERED_COMPONENT, payload: value });
      };
  
      setHoveredComponent(null);
      setCurrentHovered(false);
    }
  };

  // Handle DropBox Drop
  const handleDragDrop = (event) => {
    // // Check the authenticity of the dragged move
    // if (event.target.id !== currentDrag && parseInt(currentDrag.slice(3)) !== childBlueprint.id) {
    //   // Ensure that the call isn't being made from neighboring 
    //   if (parentAlign === 'column') {
    //     if (currentDragPosition < position && hoveredSide !== 'top') {
    //       if (hoveredSide !== 'right' && hoveredSide !== 'bottom' && hoveredSide !== 'left') {
    //         console.log('box');
    //       } else {
    //         console.log('in-between');
    //       }
    //     } else if (currentDragPosition > position && hoveredSide !== 'bottom') {
    //       console.log(':D');
    //     }
    //   } else if (parentAlign === 'row') {
    //     // TO-DO
    //   }
    // }

    // // Clear all drag view settings
    // setHoveredDropBox(null);
    // setHoveredSide('none');
    // setModifiedBox(null);
    // setDropHighlight('');
    // if (adultRef.current.childNodes[modifiedBox] !== undefined) {
    //   adultRef.current.childNodes[modifiedBox].style.borderBottomColor = 'transparent';
    //   adultRef.current.childNodes[modifiedBox].style.borderTopColor = 'transparent';
    // }
  };

  useEffect(() => {
    // if (hoveredDropBox === ("dropbox-" + childBlueprint.id)) {
    //   setDropHighlight(
    //     (hoveredSide === 'top' && childBlueprint.sides.top ?
    //       'top-border-highlight' 
    //     : hoveredSide === 'right' && childBlueprint.sides.right ?
    //       'right-border-highlight'
    //     : hoveredSide === 'bottom' && childBlueprint.sides.bottom ?
    //       'bottom-border-highlight'
    //     : hoveredSide === 'left' && childBlueprint.sides.left ?
    //       'left-border-highlight'
    //     : ''
    //     )
    //   );

    //   const parent = adultRef.current.childNodes;
    //   if (parentAlign === 'column' && parent !== undefined) {
    //     if (parent.length > 0) {
    //       let childPosition = null;
    //       parent.forEach((item, index) => {
    //         if (item.id === ("dropbox-" + childBlueprint.id)) {
    //           childPosition = index;
    //         } else if (item.id.slice(8) === currentDrag.slice(3)) {
    //           setCurrentDragPosition(index);
    //         }
    //       });

    //       setPosition(childPosition);
    //     }
    //   }
    // }
  }, []);

  return(
    // Box Container
    <div ref={currentReference} id={"box-" + childBlueprint.id} className={"canvas-box " + (currentlyHovered ? "active-drag-hover" : "")} 
    style={childBlueprint.style} onDragOver={handleDragOver} onDragLeave={handleDragOverLeave}>
      
      {/* Box Children */}
      {childBlueprint.children.map((child, index) => {
        return (
          <RecursivePaint key={index} childBlueprint={child} parentReference={currentReference} cursorTool={cursorTool}
          canvasReference={canvasReference}/>
        );
      })}
    
    </div>
  );
}