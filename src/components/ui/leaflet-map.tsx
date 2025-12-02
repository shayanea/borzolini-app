import React, { useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface MapLocation {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
}

interface LeafletMapProps {
  locations: MapLocation[];
  userLocation?: { latitude: number; longitude: number } | null;
  onMarkerPress?: (locationId: string) => void;
}

export function LeafletMap({ locations, userLocation, onMarkerPress }: LeafletMapProps) {
  const webViewRef = useRef<WebView>(null);

  // Center map on user or first location, default to Irvine/Tustin area
  const initialLat = userLocation?.latitude || locations[0]?.latitude || 33.68;
  const initialLng = userLocation?.longitude || locations[0]?.longitude || -117.81;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { width: 100%; height: 100vh; }
          .leaflet-popup-content-wrapper {
            border-radius: 8px;
            padding: 5px;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map', {
            zoomControl: false,
            attributionControl: false
          }).setView([${initialLat}, ${initialLng}], 11);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          var locations = ${JSON.stringify(locations)};
          var userLocation = ${JSON.stringify(userLocation)};

          // Add user location marker (Blue)
          if (userLocation) {
            L.circleMarker([userLocation.latitude, userLocation.longitude], {
              radius: 10,
              fillColor: "#3b82f6",
              color: "#fff",
              weight: 3,
              opacity: 1,
              fillOpacity: 1
            }).addTo(map)
            .bindPopup("<b>You are here</b>");
          }

          // Add clinic markers (Orange)
          locations.forEach(function(loc) {
            var marker = L.circleMarker([loc.latitude, loc.longitude], {
              radius: 8,
              fillColor: "#f97316",
              color: "#fff",
              weight: 2,
              opacity: 1,
              fillOpacity: 0.8
            }).addTo(map);
            
            marker.bindPopup("<b>" + loc.title + "</b><br>" + (loc.description || ""));
            
            marker.on('click', function() {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'markerPress', id: loc.id }));
            });
          });
          
          // Fit bounds if we have locations
          if (locations.length > 0) {
            var group = new L.featureGroup(locations.map(l => L.circleMarker([l.latitude, l.longitude])));
            if (userLocation) {
              group.addLayer(L.circleMarker([userLocation.latitude, userLocation.longitude]));
            }
            map.fitBounds(group.getBounds(), { padding: [50, 50] });
          }
        </script>
      </body>
    </html>
  `;

  return (
    <View className="flex-1 bg-gray-100 rounded-2xl overflow-hidden border-2 border-gray-200">
      <WebView
        ref={webViewRef}
        source={{ html: htmlContent }}
        className="flex-1"
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'markerPress' && onMarkerPress) {
              onMarkerPress(data.id);
            }
          } catch (e) {
            console.error("Error parsing map message", e);
          }
        }}
        startInLoadingState
        renderLoading={() => (
          <View className="absolute inset-0 justify-center items-center bg-gray-100">
            <ActivityIndicator size="large" color="#f97316" />
          </View>
        )}
      />
    </View>
  );
}
