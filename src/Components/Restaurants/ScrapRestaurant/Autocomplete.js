import React, { useEffect, useRef, useState } from "react";

const apiKey = "AIzaSyCMh77P3xQzQwC9VmOffzFmmvJ6IVFuwKI";

const Autocomplete = ({ setLocation, value }) => {
  const [address, setAddress] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [locationDetails, setLocationDetails] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      setAddress(value);
    }
  }, [value]);
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        const autocompleteService =
          new window.google.maps.places.AutocompleteService();
        const placesService = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );

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

  const fetchPlaceDetails = (placeId, full_address) => {
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
        const latitude = place.geometry?.location?.lat();
        const longitude = place.geometry?.location?.lng();
        const postalCode = place.address_components.find((component) =>
          component.types.includes("postal_code")
        )?.long_name;
        console.log("place", place.address_components);
        setLocationDetails({
          city,
          state,
          country,
          latitude,
          longitude,
          postal_code: postalCode,
        });
        setLocation(
          {
            city,
            state,
            country,
            latitude,
            longitude,
            postal_code: postalCode,
          },
          full_address
        );
      }
    });
  };

  const handleSelect = (prediction) => {
    setAddress(prediction.description);
    setPredictions([]);
    fetchPlaceDetails(prediction.place_id, prediction.description);
  };

  return (
    <div>
      <div className="autocomplete-container">
        <input
          type="text"
          ref={inputRef}
          value={address}
          className="form-control"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Search for a place"
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

      {/* {locationDetails && (

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
          <p>
            <strong>Latitude:</strong> {locationDetails.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {locationDetails.longitude}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default Autocomplete;
