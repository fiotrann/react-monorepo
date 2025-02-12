import { useEffect, useState } from 'react';

interface ILocation {
  lat: number;
  lng: number;
}
export default function LocationsWithoutPlugin() {
  const [markers, setMarkers] = useState<ILocation[]>(() => {
    const saved = localStorage.getItem('destinations');
    return saved ? JSON.parse(saved) : [{ lat: -37.840935, lng: 144.946457 }];
  });

  useEffect(() => {
    localStorage.setItem('destinations', JSON.stringify(markers));

    const script: HTMLScriptElement = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=' +
      import.meta.env.VITE_GOOGLE_API_KEY +
      '&loading=async&libraries=maps,marker&v=beta';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // const onMapClick = (e: MapMouseEvent) => {
  //   const value = e.detail.latLng;
  //   if (value) {
  //     setMarkers((current: ILocation[]) => [
  //       ...current,
  //       {
  //         lat: value.lat,
  //         lng: value.lng,
  //       },
  //     ]);
  //   }
  // };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      Google maps without plugin
    </div>
  );
}
