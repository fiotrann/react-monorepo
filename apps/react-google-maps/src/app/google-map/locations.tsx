import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
} from '@vis.gl/react-google-maps';
import { useCallback, useState } from 'react';

const INITIAL_POSITION = {
  center: { lat: -37.840935, lng: 144.946457 },
  zoom: 12,
};

export default function Locations() {
  const [locationProps, setLocationProps] =
    useState<MapCameraProps>(INITIAL_POSITION);

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => setLocationProps(ev.detail),
    [locationProps]
  );

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      Google maps
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <Map
          {...locationProps}
          onCameraChanged={handleCameraChange}
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
        ></Map>
      </APIProvider>
    </div>
  );
}
