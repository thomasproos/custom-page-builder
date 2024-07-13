// Import Stylesheet
import './InteractiveContainer.css';

// Import Dependencies
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../../ReduxStore.js';

export default function InteractiveContainer({ children, childBlueprint, canvasReference, parentReference }) {
  const [draggedCoordinates, setDraggedCoordinates] = useState([]);
  const containerReference = useRef(null);

  // Establish the redux store
  const dispatch = useDispatch();

  // Establish global state variables
  const draggedComponent = useSelector(state => state.draggedComponent);
  const hoveredComponent = useSelector(state => state.hoveredComponent);
  const activeComponent = useSelector(state => state.activeComponent);

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
      const sideClassNameArray = ['top-border-highlight', 'right-border-highlight', 'bottom-border-highlight', 'left-border-highlight'];

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
          const setHoveredComponent = (value) => {
            dispatch({ type: actionTypes.SET_HOVERED_COMPONENT, payload: value });
          };

          containerReference.current.style.pointerEvents = 'auto';
          // setHoveredComponent(null);
          setDraggedComponent(null);

          // Remove the hovered element
          Array.from(parentReference.current.children).forEach((item) => {
            if (sideClassNameArray.includes(item.className)) {
              parentReference.current.removeChild(item);
            }
          });
        }
      };

      // Handle movements
      canvasReference.current.addEventListener('mousemove', handleDrag);
      canvasReference.current.addEventListener('mouseup', handleDragEnd);
    })();
  }, [canvasReference, dispatch, draggedCoordinates, hoveredComponent, parentReference]);

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

      if (side !== null) {
        // console.log(side);
        // Check if there already is a hover element
        let activeHoverBar = false;
        Array.from(parentReference.current.children).forEach((item) => {
          if (item.className === side) {
            activeHoverBar = true;
          } else if (item.className === 'top-border-highlight') {
            parentReference.current.removeChild(item);
          } else if (item.className === 'bottom-border-highlight') {
            parentReference.current.removeChild(item);
          } else if (item.className === 'left-border-highlight') {
            parentReference.current.removeChild(item);
          } else if (item.className === 'right-border-highlight') {
            parentReference.current.removeChild(item);
          }
        });
        
        if (!activeHoverBar) {
          // Add new hover divider to parent
          const divider = document.createElement('div');
          divider.innerHTML = '';
          divider.className = side;
    
          // Check if before or after
          if (side === 'top-border-highlight' || side === 'left-border-highlight') {
            parentReference.current.insertBefore(divider, containerReference.current);
          } else { 
            parentReference.current.insertBefore(divider, containerReference.current.nextSibling);
          }
        }
      }
    }
  };

  const handleDropBoxDragLeave = (event) => {
    if (draggedComponent !== null && draggedComponent !== containerReference.current.id) {
      event.stopPropagation();

      const sideClassNameArray = ['top-border-highlight', 'right-border-highlight', 'bottom-border-highlight', 'left-border-highlight'];

      // Remove the hovered element
      Array.from(parentReference.current.children).forEach((item) => {
        if (sideClassNameArray.includes(item.className)) {
          parentReference.current.removeChild(item);
        }
      });
    }
  };

  // Handle making a component the active one
  const handleComponentClick = (event) => {
    event.stopPropagation();

    if (activeComponent !== event.target.id) {
      const setActiveComponent = (value) => {
        dispatch({ type: actionTypes.SET_ACTIVE_COMPONENT, payload: value });
      };
  
      setActiveComponent("box-" + childBlueprint.id);
    }
  };

  if (canvasReference !== null) {
    // Check if the box is active
    if (("box-" + childBlueprint.id) === activeComponent) {
      return(
        <div className="interactive-container" id={"interactive-" + childBlueprint.id} draggable="true" ref={containerReference}
        onMouseDown={handleDragStart} onMouseOver={handleDropBoxDragOver} onMouseLeave={handleDropBoxDragLeave}
        style={{
          minWidth: childBlueprint.style.minWidth,
          minHeight: childBlueprint.style.minHeight, 
          boxShadow: "0px 0px 0px 2px #9296F0",
          border: "1px dashed gray"
        }}>
          {children}
          <div id="active-type-container">
            <div id="active-type-label">{childBlueprint.type.charAt(0).toUpperCase() + childBlueprint.type.slice(1)}</div>
            <div id="active-buttons-container">
              <div></div>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div className="interactive-container" id={"interactive-" + childBlueprint.id} ref={containerReference}
        
        style={{
          minWidth: childBlueprint.style.minWidth,
          minHeight: childBlueprint.style.minHeight, 
          border: "1px dashed gray"
        }} onClick={handleComponentClick}>
          {children}
        </div>
      );
    }
  }
}