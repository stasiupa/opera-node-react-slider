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

  return (
    <div className="image-slider">
      div.image-slider
      <div className="image-slider-btns-wrapper">
        div.image-sldier-btns
        <div className="image-slider-btns">
          <button onClick={previousImage}>{"<"}</button>
          {currentSlide !== undefined && (
            <div className="image-wrapper">
              <TransitionGroup childFactory={childFactory(direction)}>
                <CSSTransition
                  key={currentImageIndex}
                  timeout={1000}
                  classNames={direction}
                >
                  <div
                    style={{
                      backgroundImage: `url(${currentSlide.image})`,
                    }}
                    className="image"
                  ></div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          )}
          <button onClick={nextImage}>{">"}</button>
        </div>
      </div>
      <audio ref={audioElement} src={audioSrc} controls />
    </div>
  );
}

export default ImageSlider;
