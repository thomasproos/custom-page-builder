// Import Depedencies
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../ReduxStore.js';

// Import Stylesheet
import './Canvas.css';

// Import Components
import RecursivePaint from './RecursivePaint/RecursivePaint';

export default function Canvas({ cursorTool, blueprint }) {
  const canvasReference = useRef(null);

  // Establish the redux store
  const dispatch = useDispatch();

  // const handleClick = (event) => {
  //   // The redux value setter method
  //   const setHoveredComponent = (value) => {
  //     dispatch({ type: actionTypes.SET_HOVERED_COMPONENT, payload: value });
  //   };

  //   // Clear the hovered component when clicked
  //   setHoveredComponent(null);
  // };

  // Load in user preferences


  // Canvas Type Paint
  return(
    <section id="canvas" ref={canvasReference} className="no-highlight-or-drag" style={{ flexDirection: 'column' }}>
      {blueprint.children.map((child, index) => {
        return (
          <RecursivePaint key={index} childBlueprint={child} parentReference={canvasReference} cursorTool={cursorTool}
          canvasReference={canvasReference}/>
        );
      })}
    </section>
  );
}