import { useState, useEffect } from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import "./Slider.css";

function App() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/slides`)
      .then((response) => response.json())
      .then((data) => {
        setSlides(data.slides);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <p className="text">WELCOME TO MY IMAGE SLIDER! </p>
      <ImageSlider slides={slides} />
      <p className="music">
        Acknowledgment to https://icons8.com/music/ for their watermarked tunes
      </p>
    </div>
  );
}

export default App;
