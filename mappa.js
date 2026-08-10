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
            
            // Assicurati che l'immagine della mappa si chiami 'mappa.webp'
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
            // 📍 PUNTI DI INTERESSE SULLA MAPPA
            // =========================================================

            // 1. Arma dei Carabinieri
            L.marker([568, 606], { icon: customIcon })
                .addTo(mapInstance)
                .bindPopup("<b>Comando Stazione Centrale</b><br>Caserma Principale CIV. 217")
                .openPopup();

            // 2. Comune
            L.marker([646, 281])
                .addTo(mapInstance)
                .bindPopup("<b>Comune</b><br>Municipio CIV. 637");

            // 3. Guardia di Finanza
            L.marker([534, 371])
                .addTo(mapInstance)
                .bindPopup("<b>Guardia di Finanza</b><br>Comando Provinciale CIV. 355");

            // 4. Polizia di Stato
            L.marker([679, 540])
                .addTo(mapInstance)
                .bindPopup("<b>Polizia di Stato</b><br>Questura CIV. 572");

            // --- STRUMENTO PER RILEVARE NUOVE COORDINATE AL CLICK ---
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
