import './App.css';


const Header = ({ onAddNote }) => (
  <header className="header">
    <div className="logo-section">
      <span className="material-symbols-outlined">location_on</span>
    </div>
    <button className="add-note-btn" onClick={onAddNote}>
      Add Note
    </button>
  </header>
);
export default Header;
