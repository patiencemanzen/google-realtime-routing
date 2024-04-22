import { StandaloneSearchBox } from '@react-google-maps/api';

interface SearchBoxProps {
  onLoad: (ref: google.maps.places.SearchBox) => void;
  onPlacesChanged: () => void;
}

/**
 * Search box input styles.
 * @type {React.CSSProperties}
 */
const inputStyles: React.CSSProperties = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `100%`,
  height: `50px`,
  padding: `0 12px`,
  borderRadius: `10px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const SearchBox: React.FC<SearchBoxProps> = ({ onLoad, onPlacesChanged }) => (
  <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
    <input type="text" placeholder="Where do want go?" style={inputStyles} />
  </StandaloneSearchBox>
);

export default SearchBox;