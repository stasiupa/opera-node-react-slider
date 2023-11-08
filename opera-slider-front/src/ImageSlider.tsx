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
  const [audioSrc, setAudioSrc] = useState(""); // Store the audio source

  useEffect(() => {
    if (slides.length > 0) {
      setCurrentImageIndex(0);
      setAudioSrc(slides[0].audio); // Set initial audio source
    }
  }, [slides]);

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
    setDirection("slide-left");
    setAudioSrc(slides[currentImageIndex].audio); // Update audio source
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
    setDirection("slide-right");
    setAudioSrc(slides[currentImageIndex].audio); // Update audio source
  };

  const changeMusic = (newAudioSrc: string) => {
    setAudioSrc(newAudioSrc); // Update audio source based on user input
  };

  const currentSlide = slides[currentImageIndex];

  const childFactory =
    (direction: string) =>
    (child: React.FunctionComponentElement<{ classNames: string }>) =>
      React.cloneElement(child, {
        classNames: direction,
      });
  // console.log(slides[currentImageIndex].audio);
  // console.log(slides[currentImageIndex].title);
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
      <button onClick={() => changeMusic("your-new-audio-src.mp3")}>
        Change Music
      </button>
      <audio src={audioSrc} controls autoPlay loop />
    </div>
  );
}

export default ImageSlider;
