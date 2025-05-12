// Import Stylesheet
import './Index.css';

export default function Index() {
  return(
    <div id="index" className="no-highlight-or-drag">
      <div id="index-auto-cursor-bttn" className="index-bttn" />
      <div id="index-move-cursor-bttn" className="index-bttn" />
      <div id="index-new-container-bttn" className="index-bttn">New</div>
      <div id="index-new-text-bttn" className="index-bttn">Trash</div>
    </div>
  );
}