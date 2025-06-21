import React, { useEffect, useState } from "react";

function UserLocation({ city, setCity }) {

  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const [error, setError] = useState(false);
  async function fetchCityName() {
    try {
      const apiResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${coordinates.latitude},${coordinates.longitude}&key=f86cc4dddcd34187a8d6874ed51099a0&language=en&pretty=1`
      );
      const data = await apiResponse.json();
      console.log(data);
      if (data && data.results && data.results.length > 0) {
        setCity(data.results[0].components.state);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude.toFixed(4),
            longitude: position.coords.longitude.toFixed(4),
          });
        },
        (err) => {
          console.log(err);
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (coordinates && coordinates.latitude !== null) {
      fetchCityName();
    }
  }, [coordinates]);
}

export default UserLocation;
