import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default function LocationSearchInput() {
  const [addressState, setAddressState] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')

 const  handleChange = address => {
    setAddressState(address);
  };

 const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>{
        setLat(latLng['lat']);
        setLng(latLng['lng']);
      } )
      .catch(error => console.error('Error', error));
  };
  console.log("lat",lat)
  console.log("lng",lng)
  return (
    <>
     <PlacesAutocomplete
        value={addressState}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input form-control',
              })}
            />
            <div className="autocomplete-dropdown-container">
              

                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: 'orange', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <p>{suggestion.description}</p>
                    </div>
                  );
                })}

            </div>
          </div>
        )}
      </PlacesAutocomplete></>
  )
}
