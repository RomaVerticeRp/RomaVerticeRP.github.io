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
            
            // Assicurati che l'immagine sia nella stessa cartella e si chiami 'mappa.webp'
            L.imageOverlay('mappa.webp', bounds).addTo(mapInstance);
            mapInstance.fitBounds(bounds);

            // Icona personalizzata con il logo dei Carabinieri
            const customIcon = L.icon({
                iconUrl: 'logo.png',
                iconSize: [36, 36],
                iconAnchor: [18, 18],
                popupAnchor: [0, -18]
            });

            // =========================================================
            // 📍 CASERMA PRINCIPALE (Modifica i primi due numeri Y e X)
            // =========================================================
            // Sostituisci 500, 500 con le coordinate esatte della tua caserma
            const Y = 500; 
            const X = 500; 

            L.marker([Y, X], { icon: customIcon })
                .addTo(mapInstance)
                .bindPopup("<b>Comando Stazione Centrale</b><br>Caserma Principale CIV. 217");

            // --- STRUMENTO PER TROVARE LE COORDINATE SULLA MAPPA ---
            // Cliccando su un punto qualsiasi della mappa comparirà un fumetto con le coordinate Y e X
            mapInstance.on('click', function(e) {
                const coordY = Math.round(e.latlng.lat);
                const coordX = Math.round(e.latlng.lng);
                
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(`Coordinate cliccate: <b>[${coordY}, ${coordX}]</b>`)
                    .openOn(mapInstance);
            });
        } else {
            mapInstance.invalidateSize();
        }
    }, 150);
}
