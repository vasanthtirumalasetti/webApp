import { useState } from 'react';

const NoteForm = ({ selectedLatLng, onCancel, onSubmit }) => {
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedLatLng || !text.trim()) return;
    onSubmit({
      text,
      tag,
      lat: selectedLatLng.lat,
      lng: selectedLatLng.lng,
      user: 'You',
      timeAgo: 'Just now',
    });
  };

  return (
    <div className="add-note-form-section">
      <h2>Create New Note</h2>
      <div className="note-location">
        {selectedLatLng
          ? `Selected: Lat: ${selectedLatLng.lat.toFixed(4)}, Lng: ${selectedLatLng.lng.toFixed(4)}`
          : 'Click on the map to select a location.'}
      </div>
      <form onSubmit={handleSubmit}>
        <label>Your Note:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} required />
        <label>Tag (optional):</label>
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">None</option>
          <option value="recommendation">Recommendation</option>
          <option value="warning">Warning</option>
        </select>
        <button type="submit" disabled={!selectedLatLng}>Add Note</button>
      </form>
      <button className="cancel-btn" onClick={onCancel}>Cancel</button>
    </div>
  );
};
export default NoteForm;
