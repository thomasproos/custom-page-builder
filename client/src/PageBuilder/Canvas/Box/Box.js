// Import Depedencies
import { useEffect, useRef, useState } from 'react';

// Import Stylesheet
import './Box.css';

export default function Box({ blueprint, setCurrentDrag, currentDrag, handleDragOver, 
  handleDragStart, setDragOver, dragOver, hoveredDropBox, setHoveredDropBox, parentRef, adultRef }) {
  const [hoveredSide, setHoveredSide] = useState('none');
  const [styling, setStyling] = useState({});
  const [modifiedBox, setModifiedBox] = useState(null);
  const containerRef = useRef(null);

  // Handle Drag End
  const handleDragEnd = () => {
    setCurrentDrag(null);
    setHoveredDropBox(null);
    setHoveredSide('none');
  };

  // Handle Drag Leave
  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
    setHoveredSide('none');
    if (adultRef.current.childNodes[modifiedBox] !== undefined) {
      adultRef.current.childNodes[modifiedBox].style.borderBottomColor = 'transparent';
      adultRef.current.childNodes[modifiedBox].style.borderTopColor = 'transparent';
    }
  };

  // Handle Drop Box
  const handleDropBoxDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const rect = containerRef.current.getBoundingClientRect();
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
        side = 'top';
        break;
      case rightDistance:
        side = 'right';
        break;
      case bottomDistance:
        side = 'bottom';
        break;
      case leftDistance:
        side = 'left';
        break;
      default:
        side = 'none'
        break;
    }

    setHoveredSide(side);
    setHoveredDropBox(event.target.id);
  };

  // Handle DropBox Drop
  const handleDragDrop = (event) => {
    
  };

  useEffect(() => {
    let tempStyling = {
      paddingTop: (blueprint.sides.top ? 5 : 0),
      marginTop: (blueprint.sides.top ? 0 : 5),
      paddingRight: (blueprint.sides.right ? 5 : 0),
      marginRight: (blueprint.sides.right ? 0 : 5),
      paddingBottom: (blueprint.sides.bottom ? 5 : 0),
      marginBottom: (blueprint.sides.bottom ? 0 : 5),
      paddingLeft: (blueprint.sides.left ? 5 : 0),
      marginLeft: (blueprint.sides.left ? 0 : 5),
    };

    const activeDropStyling = {
      borderTopColor: (hoveredSide === 'top' && blueprint.sides.top ? 'white' : 'transparent'),
      borderRightColor: (hoveredSide === 'right' && blueprint.sides.right ? 'white' : 'transparent'),
      borderBottomColor: (hoveredSide === 'bottom' && blueprint.sides.bottom ? 'white' : 'transparent'),
      borderLeftColor: (hoveredSide === 'left' && blueprint.sides.left ? 'white' : 'transparent'),
    }

    if (hoveredDropBox === ("dropbox-" + blueprint.id)) {
      tempStyling = {...tempStyling, ...activeDropStyling};

      const parent = adultRef.current.childNodes;
      if (blueprint.parent === 'column' && parent !== undefined) {
        if (parent.length > 0) {
          let position = null;
          parent.forEach((item, index) => {
            if (item.id === ("dropbox-" + blueprint.id)) {
              position = index;
            }
          });

          if (hoveredSide === 'top' && (position - 1) > -1) {
            parent[(position - 1)].style.borderBottomColor = 'white';
            setModifiedBox(position - 1);
          } else if (hoveredSide === 'bottom' && (position + 1) < parent.length) {
            parent[(position + 1)].style.borderTopColor = 'white';
            setModifiedBox(position + 1);
          }
        }
      }
    }

    setStyling(tempStyling);
  }, [adultRef, blueprint, hoveredDropBox, hoveredSide]);

  if (currentDrag) {
    return(
      <div className="blueprint-dropbox" id={"dropbox-" + blueprint.id} onDragOver={handleDropBoxDragOver}
      ref={containerRef} style={styling} onDragLeave={handleDragLeave}>
        <div ref={parentRef} id={"bp-" + blueprint.id} className={"canvas-box " + (dragOver ? "active-drag-hover" : "")} draggable="true" onDragStart={handleDragStart} 
        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDragEnd={handleDragEnd} onClick={() => {setDragOver(false);}}>
          {blueprint.id}
        </div>
      </div>
    );
  } else {
    return(
      <div className="blueprint-dropbox" id={"dropbox-" + blueprint.id} onDragOver={handleDropBoxDragOver} ref={containerRef}>
        <div ref={parentRef} id={"bp-" + blueprint.id} className={"canvas-box " + (dragOver ? "active-drag-hover" : "")} draggable="true" onDragStart={handleDragStart} 
        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDragEnd={handleDragEnd} onClick={() => {setDragOver(false);}}>
          {blueprint.id}
        </div>
      </div>
    );
  }
}