import NoteForm from './NoteForm';
import NoteCard from './NoteCard';

const Sidebar = ({ notes, showForm, selectedLatLng, onCancel, onSubmit }) => (
  <aside className="sidebar">
    {showForm ? (
      <NoteForm
        selectedLatLng={selectedLatLng}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    ) : (
      <>
        <h2>Recent Notes</h2>
        <p>Click on map markers to explore</p>
        <div className="recent-notes-list">
          {notes.map((note, idx) => (
            <NoteCard key={idx} note={note} />
          ))}
        </div>
      </>
    )}
  </aside>
);
export default Sidebar;
