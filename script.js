document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const mapElement = document.getElementById('map');
    const showAddNoteFormBtn = document.getElementById('showAddNoteFormBtn');
    const addNoteFormSection = document.getElementById('addNoteFormSection');
    const cancelNoteBtn = document.getElementById('cancelNoteBtn');
    const noteForm = document.getElementById('noteForm');
    const noteContentInput = document.getElementById('noteContent');
    const noteTagSelect = document.getElementById('noteTag');
    const submitNoteBtn = document.getElementById('submitNoteBtn');
    const selectedLocationDisplay = document.getElementById('selectedLocationDisplay');
    const recentNotesList = document.getElementById('recentNotesList');

    // --- Leaflet Map Initialization ---
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let selectedLatLng = null; // Stores the LatLng object from map click
    let tempMarker = null; // Stores the temporary marker for selected location

    // --- Helper Function to Create Note Card HTML ---
    function createNoteCardHTML(note) {
        const tagHtml = note.tag ? `<div class="note-tag ${note.tag}">${note.tag}</div>` : '';
        const user = note.user || 'Anonymous'; // Default user if not provided
        const timeAgo = note.timeAgo || 'Just now'; // Default time if not provided

        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');
        if (note.tag) {
            noteCard.classList.add(note.tag); // Add tag class to card for potential future styling
        }
        noteCard.innerHTML = `
            ${tagHtml}
            <div class="note-text">${note.text}</div>
            <div class="note-meta">
                <div class="note-meta-top">
                    <div class="note-meta-item">
                        <span class="material-symbols-outlined">person</span>
                        ${user}
                    </div>
                    <div class="note-meta-item">
                        <span class="material-symbols-outlined">schedule</span>
                        ${timeAgo}
                    </div>
                </div>
                <div class="note-meta-bottom">
                    <div class="note-meta-item">
                        <span class="material-symbols-outlined">location_on</span>
                        Lat: ${note.lat.toFixed(4)}, Lng: ${note.lng.toFixed(4)}
                    </div>
                </div>
            </div>
        `;

        // Add event listener to map to the note's marker when clicked in sidebar
        noteCard.addEventListener('click', () => {
            map.flyTo([note.lat, note.lng], 15); // Fly to the marker location
            // Open popup if marker already exists, or create a temporary one
            const existingMarkers = map.eachLayer(layer => {
                if (layer instanceof L.Marker && layer.getLatLng().equals([note.lat, note.lng])) {
                    layer.openPopup();
                }
            });
            // If no existing marker found (e.g., initial load notes), add one
            if (!existingMarkers) {
                const marker = L.marker([note.lat, note.lng]).addTo(map);
                marker.bindPopup(`<b>Note:</b> ${note.text}`).openPopup();
            }
        });

        return noteCard;
    }

    // --- Function to Add a Note (to list and map) ---
    function addNoteToApp(note) {
        const noteCard = createNoteCardHTML(note);
        recentNotesList.prepend(noteCard); // Add new notes to the top of the list

        const marker = L.marker([note.lat, note.lng]).addTo(map);
        marker.bindPopup(`<b>Note:</b> ${note.text}`).openPopup();
    }

    // --- Show/Hide Add Note Form ---
    function showAddNoteForm() {
        addNoteFormSection.classList.remove('hidden');
        recentNotesList.classList.add('hidden'); // Hide recent notes list temporarily
        // Scroll to the top of the sidebar to show the form
        sidebar.scrollTop = 0;
        mapElement.classList.add('map-picking-mode'); // Optional: Add a visual cue to map
        alert('Click on the map to select the note location!');
    }

    function hideAddNoteForm() {
        addNoteFormSection.classList.add('hidden');
        recentNotesList.classList.remove('hidden');
        noteForm.reset();
        selectedLatLng = null;
        selectedLocationDisplay.textContent = 'Click on the map to select a location.';
        submitNoteBtn.disabled = true;
        if (tempMarker) {
            map.removeLayer(tempMarker);
            tempMarker = null;
        }
        mapElement.classList.remove('map-picking-mode');
    }

    // --- Event Listeners ---
    showAddNoteFormBtn.addEventListener('click', showAddNoteForm);
    cancelNoteBtn.addEventListener('click', hideAddNoteForm);

    // Map click handler
    map.on('click', (e) => {
        if (!addNoteFormSection.classList.contains('hidden')) { // Only process click if form is visible
            selectedLatLng = e.latlng;

            // Remove previous temporary marker if exists
            if (tempMarker) {
                map.removeLayer(tempMarker);
            }

            // Add a new temporary marker for the selected location
            tempMarker = L.marker(selectedLatLng, {
                icon: L.icon({
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            }).addTo(map);

            selectedLocationDisplay.textContent = `Selected: Lat: ${selectedLatLng.lat.toFixed(4)}, Lng: ${selectedLatLng.lng.toFixed(4)}`;
            submitNoteBtn.disabled = false; // Enable submit button
            noteContentInput.focus(); // Focus on the note input
        }
    });

    // Form submission handler
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const noteContent = noteContentInput.value.trim();
        const noteTag = noteTagSelect.value;

        if (selectedLatLng && noteContent) {
            const newNote = {
                text: noteContent,
                tag: noteTag,
                lat: selectedLatLng.lat,
                lng: selectedLatLng.lng,
                user: 'You', // Placeholder for current user
                timeAgo: 'Just now'
            };

            // In a real application, you would send `newNote` to your backend here
            // using `fetch` or `axios`.
            console.log('Sending note to backend (simulated):', newNote);

            addNoteToApp(newNote); // Add to the frontend list and map
            hideAddNoteForm(); // Hide the form after submission
            alert('Note added successfully!');
        } else {
            alert('Please select a location on the map and type your note.');
        }
    });

    // --- Initial Notes Loading (Simulated) ---
    function loadInitialNotes() {
        // Clear dummy note
        recentNotesList.innerHTML = '';

        // Example pre-existing notes
        const initialNotes = [
            {
                text: 'Amazing coffee shop with great atmosphere! Perfect for working or meeting...',
                tag: 'recommendation',
                lat: 40.7580, lng: -73.9855, // Times Square, NYC
                user: 'Sarah Chen',
                timeAgo: '2 hours ago'
            },
            {
                text: 'Heads up: The west entrance to the park is closed for a private event today. Use the east entrance.',
                tag: 'warning',
                lat: 40.7812, lng: -73.9665, // Central Park, NYC
                user: 'Admin',
                timeAgo: '1 day ago'
            },
            {
                text: 'The pizza here is a must-try. The crust is perfect and they have unique toppings.',
                tag: 'recommendation',
                lat: 40.7042, lng: -73.9926, // Brooklyn Bridge Park
                user: 'Mike R.',
                timeAgo: '3 days ago'
            }
        ];

        initialNotes.forEach(note => addNoteToApp(note));
    }

    loadInitialNotes(); // Call to load notes when the page first loads
});