import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './app.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedLatLng, setSelectedLatLng] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleMapClick = (e) => {
    if (showForm) {
      setSelectedLatLng(e.latlng);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({ click: handleMapClick });
    return null;
  };

  const addNote = (note) => {
    setNotes([note, ...notes]);
    setShowForm(false);
    setSelectedLatLng(null);
  };

  useEffect(() => {
    setNotes([
      {
        text: 'Amazing coffee shop!',
        tag: 'recommendation',
        lat: 40.7580,
        lng: -73.9855,
        user: 'Sarah Chen',
        timeAgo: '2 hours ago',
      },
    ]);
  }, []);

  return (
    <div className="app-container">
      <Header onAddNote={() => setShowForm(true)} />
      <main className="main-content">
        <Sidebar
          notes={notes}
          showForm={showForm}
          selectedLatLng={selectedLatLng}
          onCancel={() => setShowForm(false)}
          onSubmit={addNote}
        />
        <div id="map">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler />
            {notes.map((note, idx) => (
              <Marker key={idx} position={[note.lat, note.lng]}>
                <Popup><b>Note:</b> {note.text}</Popup>
              </Marker>
            ))}
            {selectedLatLng && showForm && (
              <Marker position={[selectedLatLng.lat, selectedLatLng.lng]} />
            )}
          </MapContainer>
        </div>
      </main>
    </div>
  );
}

export default App;
