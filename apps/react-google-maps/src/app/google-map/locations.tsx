import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  MapMouseEvent,
} from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';

const INITIAL_POSITION = {
  center: { lat: -37.840935, lng: 144.946457 },
  zoom: 12,
};

export default function Locations() {
  const [markers, setMarkers] = useState([
    { lat: -37.840935, lng: 144.946457 },
  ]);

  const [locationProps, setLocationProps] =
    useState<MapCameraProps>(INITIAL_POSITION);

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => setLocationProps(ev.detail),
    [locationProps]
  );

  const onMapClick = (e: MapMouseEvent) => {
    const value = e.detail.latLng;
    if (value) {
      setMarkers((current) => [
        ...current,
        {
          lat: value.lat,
          lng: value.lng,
        },
      ]);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      Google maps
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <Map
          {...locationProps}
          onCameraChanged={handleCameraChange}
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          onClick={onMapClick}
        >
          {markers.map((marker, index) => (
            <AdvancedMarker
              key={index}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
