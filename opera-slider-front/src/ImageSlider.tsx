import React, { useState, useEffect } from "react";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./ImageSlider.css";

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
  const [direction, setDirection] = useState("slide-right");

  useEffect(() => {
    if (slides.length > 0) {
      setCurrentImageIndex(0);
    }
  }, [slides]);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
    setDirection("slide-left");
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
    setDirection("slide-right");
  };

  const currentSlide = slides[currentImageIndex];

  const childFactory =
    (direction: string) =>
    (child: React.FunctionComponentElement<{ classNames: string }>) =>
      React.cloneElement(child, {
        classNames: direction,
      });

  return (
    <div className="image-slider">
      <button onClick={previousImage}>{"<"}</button>
      {currentSlide !== undefined && (
        <div className="image-wrapper">
          <TransitionGroup childFactory={childFactory(direction)}>
            <CSSTransition
              key={currentImageIndex}
              timeout={1000}
              classNames={direction}
            >
              <img
                src={currentSlide.image}
                alt={`Image ${currentImageIndex + 1}`}
                loading="lazy"
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
      )}
      <button onClick={nextImage}>{">"}</button>
    </div>
  );
}

export default ImageSlider;
