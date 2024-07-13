// Import Stylesheet
import './Toolbar.css';

export default function Toolbar() {
  return(
    <div id="toolbar" className="no-highlight-or-drag">
      <div id="toolbar-auto-cursor-bttn" className="toolbar-bttn" />
      <div id="toolbar-move-cursor-bttn" className="toolbar-bttn" />
      <div id="toolbar-new-container-bttn" className="toolbar-bttn">New</div>
      <div id="toolbar-new-text-bttn" className="toolbar-bttn">Trash</div>
    </div>
  );
}