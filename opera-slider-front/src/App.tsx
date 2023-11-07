import { useState, useEffect } from "react";
import "./App.css";
import ImageSlider from "./ImageSlider";

function App() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/slides")
      .then((response) => response.json())
      .then((data) => {
        setSlides(data.slides);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <ImageSlider slides={slides} />
    </div>
  );
}

export default App;
