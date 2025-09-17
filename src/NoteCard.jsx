const NoteCard = ({ note }) => (
  <div className={`note-card ${note.tag || ''}`}>
    {note.tag && <div className={`note-tag ${note.tag}`}>{note.tag}</div>}
    <div className="note-text">{note.text}</div>
    <div className="note-meta">
      <div className="note-meta-top">
        <div className="note-meta-item">
          <span className="material-symbols-outlined">person</span>
          {note.user}
        </div>
        <div className="note-meta-item">
          <span className="material-symbols-outlined">schedule</span>
          {note.timeAgo}
        </div>
      </div>
      <div className="note-meta-bottom">
        <div className="note-meta-item">
          <span className="material-symbols-outlined">location_on</span>
          Lat: {note.lat.toFixed(4)}, Lng: {note.lng.toFixed(4)}
        </div>
      </div>
    </div>
  </div>
);
export default NoteCard;
