let mapInstance = null;

function renderMap() {
    setTimeout(() => {
        if (!mapInstance) {
            // Inizializza la mappa sulla griglia cartesiana [0,0] -> [1000,1000]
            mapInstance = L.map('mapFiveM', {
                crs: L.CRS.Simple,
                minZoom: -1,
                maxZoom: 3,
                zoomSnap: 0.25
            });

            const bounds = [[0, 0], [1000, 1000]];
            
            // Assicurati che il file dell'immagine mappa si chiami 'mappa.webp' (o cambia il nome qui sotto)
            L.imageOverlay('mappa.webp', bounds).addTo(mapInstance);
            mapInstance.fitBounds(bounds);

            // Icona personalizzata con il logo
            const customIcon = L.icon({
                iconUrl: 'logo.png',
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
            });

            // --- ESEMPIO SEGNAPOSTO: CASERMA CENTRALE ---
            L.marker([500, 500], { icon: customIcon })
                .addTo(mapInstance)
                .bindPopup("<b>Comando Stazione Centrale</b><br>Caserma Principale");

            // --- CLICCA SULLA MAPPA PER TROVARE LE COORDINATE DI NUOVI LUOGHI ---
            mapInstance.on('click', function(e) {
                const y = Math.round(e.latlng.lat);
                const x = Math.round(e.latlng.lng);
                
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(`Coordinate punto: <b>[${y}, ${x}]</b>`)
                    .openOn(mapInstance);
            });
        } else {
            // Adatta le dimensioni del contenitore se era nascosto
            mapInstance.invalidateSize();
        }
    }, 150);
}
