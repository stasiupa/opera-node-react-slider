import React, { useState, useEffect, useRef } from "react";
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
  const [audioSrc, setAudioSrc] = useState("");
  const audioElement = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (slides.length > 0) {
      setCurrentImageIndex(0);
      setAudioSrc(slides[0].audio);
    }
  }, [slides]);

  useEffect(() => {
    if (audioElement.current) {
      audioElement.current.load();
      audioElement.current.play();
    }
  });

  const previousImage = () => {
    const prevIndex =
      currentImageIndex === 0 ? slides.length - 1 : currentImageIndex - 1;

    setCurrentImageIndex(prevIndex);
    setDirection("slide-left");
    setAudioSrc(slides[prevIndex].audio);
  };

  const nextImage = () => {
    const nextIndex =
      currentImageIndex === slides.length - 1 ? 0 : currentImageIndex + 1;

    setCurrentImageIndex(nextIndex);
    setDirection("slide-right");
    setAudioSrc(slides[nextIndex].audio);
  };

  const currentSlide = slides[currentImageIndex];

  const childFactory =
    (direction: string) =>
    (child: React.FunctionComponentElement<{ classNames: string }>) =>
      React.cloneElement(child, {
        classNames: direction,
      });

  if (currentSlide) {
    console.log(currentSlide.audio);
    console.log(currentSlide.title);
  }

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
      <audio ref={audioElement} src={audioSrc} controls />{" "}
    </div>
  );
}

export default ImageSlider;
