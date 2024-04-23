import { useEffect, useState } from 'react';
import '../assets/css/App.css';
import { useLoadScript, Marker } from '@react-google-maps/api';
import SearchBox from '../components/Map/SearchBox';
import Map from '../components/Map/Map';
import StartRouting from '../components/Map/StartRouting';
import CancelRouting from '../components/Map/CancelRouting';

const Home = () => {
  const [origin, setOrigin] = useState<google.maps.LatLng | null>(null);
  const [destination, setDestination] = useState<google.maps.LatLng | null>(null);
  const [response, setResponse] = useState(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [isRouting, setIsRouting] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ["places"],
  });

  useEffect(() => {
    /**
     * Get the user's current location and set it as the origin.
     */
    navigator.geolocation.getCurrentPosition((position) => {
      setOrigin(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    });
  }, []);

  useEffect(() => {
    let watchId: number | null = null;

    if (isRouting) {
      // To display the user's real-time location while routing
      watchId = navigator.geolocation.watchPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isRouting]);

  /**
   * When the directions service returns a response, 
   * the response is set to the response state.
   * 
   * @param res google.maps.DirectionsResult
   */
  const directionsCallback = (res: any) => {
    if (res !== null) {
      if (res.status === 'OK') {
        setResponse(res);

        const newSteps = res.routes[0].legs[0].steps.map((step: any) => step.instructions);
        setSteps(newSteps);
      } else {
        console.log('response: ', res);
      }
    }
  }

  /**
   * When the search box is loaded, the reference is 
   * set to the search box state.
   * 
   * @param ref google.maps.places.SearchBox
   * @returns void
   */
  const onSearchBoxLoaded = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  /**
   * When the user selects a place from the search box, 
   * the place's geometry is set as the destination.
   * 
   * @returns void
   */
  const onPlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      const place = places && places[0];
      if (place && place.geometry && place.geometry.location) {
        setDestination(place.geometry.location);
      }
    }
  };

  /**
   * Set the isRouting state to true to start routing.
   * 
   * @returns void
   */
  const startRouting = () => {
    setIsRouting(true);
  };

  const cancelRouting = () => {
    setIsRouting(false);
  };

  // Show an error message if the maps failed to load
  if (loadError) {
    return <div>Error loading maps</div>;
  }

  // Show a loading message while the maps are loading
  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className='relative'>
      <div className='absolute top-2 right-20 z-20 bg-slate-300 p-4 w-80 rounded-[10px]'>
        <SearchBox onLoad={onSearchBoxLoaded} onPlacesChanged={onPlacesChanged} />
        <div className='mt-2 flex justify-between'>
          {destination && !isRouting && <StartRouting onClick={startRouting} />}
          {isRouting && <CancelRouting onClick={cancelRouting} />}
        </div>
      </div>

      <div className='map-container'>
        <Map origin={origin} destination={destination} currentLocation={currentLocation} response={response} directionsCallback={directionsCallback}>
          {origin && <Marker position={origin} />}
        </Map>  
      </div>

      {isRouting && (
        <div className='absolute bottom-2 left-20 z-20 bg-slate-300 p-4 w-80 rounded-[10px]'>
          <div className='rounded-[10px] bg-white p-5'>
            {steps.map((step: string, index: number) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: step }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;