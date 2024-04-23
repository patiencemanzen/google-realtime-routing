import { GoogleMap, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { ReactNode } from 'react';

interface MapProps {
  origin: google.maps.LatLng | null;
  destination: any;
  response: any;
  directionsCallback: (res: any) => void;
  children?: ReactNode;
  currentLocation?: google.maps.LatLngLiteral | null;
}

/**
 * The Map component is a wrapper around the GoogleMap component from the @react-google-maps/api package.
 * 
 * ------
 * Google Maps Directions API by default provides multiple routes (up to 3) if they are available. 
 * However, you can limit the API to return only the best route based on the given criteria (like distance or time) by setting the provideRouteAlternatives option to false in the DirectionsRequest object.
 * -------
 * @param param0 
 * @returns 
 */
const Map: React.FC<MapProps> = ({ origin, destination, currentLocation, response, directionsCallback }) => (
  <GoogleMap mapContainerStyle={{ width: '100vw', height: '91vh' }} zoom={15} center={origin || undefined}>
    {origin && destination && (
      <DirectionsService
        options={{
          destination: destination,
          origin: origin,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false,
        }}
        callback={directionsCallback}
      />
    )}

    {response !== null && (
      <DirectionsRenderer options={{ directions: response }} />
    )}

    {currentLocation && <Marker position={currentLocation} />}
  </GoogleMap>
);

export default Map;