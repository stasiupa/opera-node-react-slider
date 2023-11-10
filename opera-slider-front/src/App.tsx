import { useState, useEffect } from "react";

import ImageSlider from "./components/ImageSlider";

import "./App.css";

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
    <div className="App">
      <p className="text">WELCOME TO MY IMAGE SLIDER! </p>
      <ImageSlider slides={slides} />
      <p style={{ fontStyle: "italic" }}>
        Acknowledgment to https://icons8.com/music/ for their watermarked tunes
      </p>
    </div>
  );
}

export default App;
