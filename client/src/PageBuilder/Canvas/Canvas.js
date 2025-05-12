// Import Depedencies
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../ReduxStore.js';

// Import Stylesheet
import './Canvas.css';

// Import Components
import RecursivePaint from './RecursivePaint/RecursivePaint';

export default function Canvas({ blueprint }) {
  const canvasReference = useRef(null);

  // Establish the redux store
  const dispatch = useDispatch();
  const activeComponent = useSelector(state => state.activeComponent);

  const handleCanvasClick = () => {
    const setActiveComponent = (value) => {
      dispatch({ type: actionTypes.SET_ACTIVE_COMPONENT, payload: value });
    };

    setActiveComponent(null);
  };

  // Canvas Type Paint
  return(
    <section id="canvas" ref={canvasReference} className="no-highlight-or-drag" onClick={handleCanvasClick}
    style={{ 
      flexDirection: 'column',
      boxShadow: (activeComponent === 'canvas' ? "0px 0px 0px 2px #9296F0" : "")  
    }}>
      {blueprint.children.map((child, index) => {
        return (
          <RecursivePaint key={index} childBlueprint={child} parentReference={canvasReference} canvasReference={canvasReference}/>
        );
      })}
    </section>
  );
}