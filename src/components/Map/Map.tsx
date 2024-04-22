import { GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { ReactNode } from 'react';

interface MapProps {
  origin: google.maps.LatLng | null;
  destination: any;
  response: any;
  directionsCallback: (res: any) => void;
  children?: ReactNode;
}

const Map: React.FC<MapProps> = ({ origin, destination, response, directionsCallback }) => (
  <GoogleMap mapContainerStyle={{ width: '100vw', height: '91vh' }} zoom={15} center={origin || undefined}>
    {origin && destination && (
      <DirectionsService
        options={{
          destination: destination,
          origin: origin,
          travelMode: google.maps.TravelMode.DRIVING
        }}
        callback={directionsCallback}
      />
    )}

    {response !== null && (
      <DirectionsRenderer options={{ directions: response }} />
    )}
  </GoogleMap>
);

export default Map;