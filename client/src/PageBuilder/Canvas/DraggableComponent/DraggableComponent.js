// Import Stylesheet
import './DraggableComponent.css';

// Import Dependencies
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../../ReduxStore.js';

export default function DraggableComponent({ children, childBlueprint, canvasReference }) {
  const [hoveredSide, setHoveredSide] = useState('none');
  const [draggedCoordinates, setDraggedCoordinates] = useState([]);
  const containerReference = useRef(null);

  // Establish the redux store
  const dispatch = useDispatch();

  // Handle the start of the Drag Action
  const handleDragStart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const xCoordinate = event.clientX - containerReference.current.getBoundingClientRect().left - window.scrollX;
    const yCoordinate = event.clientY - containerReference.current.getBoundingClientRect().top - window.scrollY;

    setDraggedCoordinates([xCoordinate, yCoordinate]);

    // Set the currently dragged component
    const setDraggedComponent = (value) => {
      dispatch({ type: actionTypes.SET_HOVERED_COMPONENT, payload: value });
    };

    setDraggedComponent(containerReference.current.id);
    console.log('^w^')
  };

  useEffect(() => {
    (() => {
      // Handle the active Drag Action
      const handleDrag = (event) => {
        event.stopPropagation();
        if (containerReference !== null && draggedCoordinates.length > 0) {
          containerReference.current.style.left = `${event.clientX - draggedCoordinates[0]}px`;
          containerReference.current.style.top = `${event.clientY - draggedCoordinates[1]}px`;
          containerReference.current.style.position = 'absolute';
        }
      };

      // Handle the end of the Drag Action
      const handleDragEnd = (event) => {
        event.stopPropagation();
        // Clear state fields
        if (containerReference.current !== null) {
          containerReference.current.style.position = 'static';
          containerReference.current.style.left = ``;
          containerReference.current.style.top = ``;
          
          setDraggedCoordinates([]);
          
          // Handle movements
          canvasReference.current.removeEventListener('mousemove', handleDrag);
          canvasReference.current.removeEventListener('mouseup', handleDragEnd);

          // Cleanup redux store
          const setDraggedComponent = (value) => {
            dispatch({ type: actionTypes.SET_HOVERED_COMPONENT, payload: value });
          };

          setDraggedComponent(null);
        }
      };

      // Handle movements
      canvasReference.current.addEventListener('mousemove', handleDrag);
      canvasReference.current.addEventListener('mouseup', handleDragEnd);

    })();
  }, [canvasReference, dispatch, draggedCoordinates]);

  // Handle Drop Box
  const handleDropBoxDragOver = (event) => {
    // event.preventDefault();
    // event.stopPropagation();

    // const rect = containerReference.current.getBoundingClientRect();
    // const mouseX = event.clientX;
    // const mouseY = event.clientY;

    // // Determine which side of the container the mouse is closest to
    // const topDistance = Math.abs(mouseY - rect.top);
    // const bottomDistance = Math.abs(mouseY - rect.bottom);
    // const leftDistance = Math.abs(mouseX - rect.left);
    // const rightDistance = Math.abs(mouseX - rect.right);

    // let side = null;
    // const minDistance = Math.min(topDistance, bottomDistance, leftDistance, rightDistance);
    
    // switch(minDistance) {
    //   case topDistance:
    //     side = 'top';
    //     break;
    //   case rightDistance:
    //     side = 'right';
    //     break;
    //   case bottomDistance:
    //     side = 'bottom';
    //     break;
    //   case leftDistance:
    //     side = 'left';
    //     break;
    //   default:
    //     side = 'none'
    //     break;
    // }

    // setHoveredSide(side);
    // setHoveredDropBox(event.target.id);
  };

  if (canvasReference !== null) {
    return(
      <div className="blueprint-dropbox" id={"dropbox-" + childBlueprint.id} draggable="true" ref={containerReference}
      onMouseDown={handleDragStart}>
        {children}
      </div>
    );
  }
}