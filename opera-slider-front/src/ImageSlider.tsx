import { useState, useEffect } from "react";

interface Slide {
  title: string;
  content: string;
  image: string;
  audio: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

function ImageSlider({ slides }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (slides.length > 0) {
      setCurrentImageIndex(0);
    }
  }, [slides]);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentSlide = slides[currentImageIndex];

  return (
    <div>
      <button onClick={previousImage}>{"<"}</button>
      {currentSlide !== undefined && (
        <img
          src={currentSlide.image}
          alt={`Image ${currentImageIndex + 1}`}
        ></img>
      )}
      <button onClick={nextImage}>{">"}</button>
    </div>
  );
}

export default ImageSlider;
