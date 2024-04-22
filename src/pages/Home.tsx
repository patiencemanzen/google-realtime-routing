import { useEffect, useState } from 'react';
import '../assets/css/App.css';
import { useLoadScript, Marker } from '@react-google-maps/api';
import SearchBox from '../components/SearchBox';
import Map from '../components/Map';

const Home = () => {
  const [origin, setOrigin] = useState<google.maps.LatLng | null>(null);
  const [destination, setDestination] = useState<google.maps.LatLng | null>(null);
  const [response, setResponse] = useState(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  
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
      <div className='absolute top-2 right-1/4 z-20 bg-slate-300 p-4 w-80 rounded-[10px]'>
        <SearchBox onLoad={onSearchBoxLoaded} onPlacesChanged={onPlacesChanged} />
      </div>

      <div className='map-container'>
        <Map origin={origin} destination={destination} response={response} directionsCallback={directionsCallback}>
          {origin && <Marker position={origin} />}
        </Map>  
      </div>
    </div>
  );
}

export default Home;