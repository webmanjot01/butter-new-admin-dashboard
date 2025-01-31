import React, { useEffect, useRef, useState } from "react";

const apiKey = "AIzaSyCMh77P3xQzQwC9VmOffzFmmvJ6IVFuwKI";

const Autocomplete = ({ setLocation }) => {
  const [address, setAddress] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null); // For storing the city, state, and country
  const inputRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        const autocompleteService =
          new window.google.maps.places.AutocompleteService();
        const placesService = new window.google.maps.places.PlacesService(
          document.createElement("div")
        ); // Create a hidden div to use the Places Service

        const fetchPredictions = (query) => {
          if (query.length < 3) {
            setPredictions([]);
            return;
          }

          autocompleteService.getPlacePredictions(
            { input: query },
            (predictions, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setPredictions(predictions);
              } else {
                setPredictions([]);
              }
            }
          );
        };

        const handleInputChange = (e) => {
          const query = e.target.value;
          setAddress(query);
          fetchPredictions(query);
        };

        if (inputRef.current) {
          inputRef.current.addEventListener("input", handleInputChange);
        }

        return () => {
          if (inputRef.current) {
            inputRef.current.removeEventListener("input", handleInputChange);
          }
        };
      } else {
        console.error("Google Maps API is not loaded properly.");
      }
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = loadGoogleMaps;
    script.onerror = () => console.error("Failed to load Google Maps API.");
    document.head.appendChild(script);

    return () => {
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Get place details (city, state, country) when a prediction is selected
  const fetchPlaceDetails = (placeId) => {
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    placesService.getDetails({ placeId }, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place
      ) {
        const city = place.address_components.find((component) =>
          component.types.includes("locality")
        )?.long_name;
        const state = place.address_components.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name;
        const country = place.address_components.find((component) =>
          component.types.includes("country")
        )?.long_name;

        setLocationDetails({ city, state, country });
        setLocation({ city, state, country });
      }
    });
  };

  // Select a prediction and fetch its details
  const handleSelect = (prediction) => {
    setAddress(prediction.description);
    setPredictions([]);
    fetchPlaceDetails(prediction.place_id);
  };

  return (
    <div>
      <div className="autocomplete-container">
        <input
          type="text"
          ref={inputRef}
          value={address}
          className="form-control"
          onChange={(e) => setAddress(e.target.value)} // Update state on input change
          placeholder="Search for a place"
          // className="autocomplete-input"
        />
        {predictions.length > 0 && (
          <ul className="autocomplete-suggestions">
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                onClick={() => handleSelect(prediction)}
                className="autocomplete-suggestion"
              >
                {prediction.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      {locationDetails && (
        <div className="location-details mt-3">
          <p>
            <strong>City:</strong> {locationDetails.city}
          </p>
          <p>
            <strong>State:</strong> {locationDetails.state}
          </p>
          <p>
            <strong>Country:</strong> {locationDetails.country}
          </p>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
