// Import Stylesheet
import './DraggableComponent.css';

// Import Dependencies
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../../ReduxStore.js';

export default function DraggableComponent({ children, childBlueprint, canvasReference, parentReference }) {
  const [hoveredSide, setHoveredSide] = useState('none');
  const [draggedCoordinates, setDraggedCoordinates] = useState([]);
  const containerReference = useRef(null);

  // Establish the redux store
  const dispatch = useDispatch();

  // Establish global state variables
  const draggedComponent = useSelector(state => state.draggedComponent);
  const hoveredComponent = useSelector(state => state.hoveredComponent);

  // Handle the start of the Drag Action
  const handleDragStart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const xCoordinate = event.clientX - containerReference.current.getBoundingClientRect().left - window.scrollX;
    const yCoordinate = event.clientY - containerReference.current.getBoundingClientRect().top - window.scrollY;

    setDraggedCoordinates([xCoordinate, yCoordinate]);

    // Set the currently dragged component
    const setDraggedComponent = (value) => {
      dispatch({ type: actionTypes.SET_DRAGGED_COMPONENT, payload: value });
    };

    containerReference.current.style.pointerEvents = 'none';
    setDraggedComponent(containerReference.current.id);
  };

  useEffect(() => {
    (() => {
      // Handle the active Drag Action
      const handleDrag = (event) => {
        event.stopPropagation();
        if (containerReference !== null && draggedCoordinates.length > 0) {
          // Calculate and set new position
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
            dispatch({ type: actionTypes.SET_DRAGGED_COMPONENT, payload: value });
          };

          containerReference.current.style.pointerEvents = 'auto';
          setDraggedComponent(null);
        }
      };

      // Handle movements
      canvasReference.current.addEventListener('mousemove', handleDrag);
      canvasReference.current.addEventListener('mouseup', handleDragEnd);

      // Handle container drag actions
      if (containerReference.current.id !== hoveredComponent) {
        setHoveredSide('');
      }

    })();
  }, [canvasReference, dispatch, draggedCoordinates, hoveredComponent]);

  // Handle Drop Box
  const handleDropBoxDragOver = (event) => {
    if (draggedComponent !== null && draggedComponent !== containerReference.current.id) {
      event.stopPropagation();

      const rect = containerReference.current.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Determine which side of the container the mouse is closest to
      const topDistance = Math.abs(mouseY - rect.top);
      const bottomDistance = Math.abs(mouseY - rect.bottom);
      const leftDistance = Math.abs(mouseX - rect.left);
      const rightDistance = Math.abs(mouseX - rect.right);

      let side = null;
      const minDistance = Math.min(topDistance, bottomDistance, leftDistance, rightDistance);
      
      switch(minDistance) {
        case topDistance:
          if (childBlueprint.sides.top) {
            side = 'top-border-highlight';
          } else {
            side = ''
          }
          break;
        case rightDistance:
          if (childBlueprint.sides.right) {
            side = 'right-border-highlight';
          }
          break;
        case bottomDistance:
          if (childBlueprint.sides.bottom) {
            side = 'bottom-border-highlight';
          }
          break;
        case leftDistance:
          if (childBlueprint.sides.left) {
            side = 'left-border-highlight';
          }
          break;
        default:
          side = ''
          break;
      }

      // The redux value setter method
      const setHoveredComponent = (value) => {
        dispatch({ type: actionTypes.SET_HOVERED_COMPONENT, payload: value });
      };

      setHoveredComponent(containerReference.current.id);
      setHoveredSide(side);
    }
  };

  const handleDropBoxDragLeave = (event) => {
    if (draggedComponent !== null && draggedComponent !== containerReference.current.id) {
      event.stopPropagation();
      setHoveredSide('');
    }
  };

  const handleDropBoxEnd = (event) => {
    console.log(':D');
    if (draggedComponent !== null && draggedComponent !== containerReference.current.id) {
      event.stopPropagation();
      setHoveredSide('');
    }  
  };

  if (canvasReference !== null) {
    if (hoveredSide !== 'none') {
      setTimeout(() => {
        return(
          <div className={"blueprint-dropbox " + hoveredSide} id={"dropbox-" + childBlueprint.id} draggable="true" ref={containerReference}
          onMouseDown={handleDragStart} onMouseOver={handleDropBoxDragOver} onMouseLeave={handleDropBoxDragLeave} onMouseUp={handleDropBoxEnd}
          style={{ flexDirection: (parentReference.current !== null ? parentReference.current.style.flexDirection : '') }}>
            {children}
          </div>
        );
      }, 200);
    } else {
      return(
        <div className={"blueprint-dropbox " + hoveredSide} id={"dropbox-" + childBlueprint.id} draggable="true" ref={containerReference}
        onMouseDown={handleDragStart} onMouseOver={handleDropBoxDragOver} onMouseLeave={handleDropBoxDragLeave} onMouseUp={handleDropBoxEnd}
        style={{ flexDirection: (parentReference.current !== null ? parentReference.current.style.flexDirection : '') }}>
          {children}
        </div>
      );
    }
  }
}