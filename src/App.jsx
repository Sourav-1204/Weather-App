import Weather from "./componets/weather";
import UserLocation from "./componets/userlocation";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");

  return (
    <>
      <UserLocation city={city} setCity={setCity} />
      <Weather city={city} setCity={setCity} />
    </>
  );
}

export default App;
