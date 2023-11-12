import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { ImageSliderProps } from "../../types/types";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";

import "./ImageSlider.css";

function ImageSlider({ slides }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState("slide-right");
  const [audioSrc, setAudioSrc] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioElement = useRef<HTMLAudioElement>(null);

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
      audioElement.current.muted = isMuted;
    }
  }, [audioLoaded, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const previousImage = () => {
    const prevIndex =
      currentImageIndex === 0 ? slides.length - 1 : currentImageIndex - 1;

    setCurrentImageIndex(prevIndex);
    setDirection("slide-left");
    setAudioSrc(slides[prevIndex].audio);
    setAudioLoaded(false);
  };

  const nextImage = () => {
    const nextIndex =
      currentImageIndex === slides.length - 1 ? 0 : currentImageIndex + 1;

    setCurrentImageIndex(nextIndex);
    setDirection("slide-right");
    setAudioSrc(slides[nextIndex].audio);
    setAudioLoaded(false);
  };

  const childFactory =
    (direction: string) =>
    (child: React.FunctionComponentElement<{ classNames: string }>) =>
      React.cloneElement(child, {
        classNames: direction,
      });

  const currentSlide = slides[currentImageIndex];

  return (
    <div className="image-slider">
      <p className="text">UNMUTE BY CLICKING THE RED SPEAKER ICON!</p>
      <div className="image-slider-btns-wrapper">
        <p className="text">HERE ARE SOME IDEAS FOR THIS WEEKEND!</p>
        <div className="image-slider-btns">
          <ArrowLeft
            onClick={previousImage}
            className={`arrow ${isDisabled ? "disabled" : ""}`}
            data-testid="previous"
            fill={isDisabled ? "grey" : "red"}
          />
          {currentSlide !== undefined && (
            <div className="image-wrapper">
              <TransitionGroup childFactory={childFactory(direction)}>
                <CSSTransition
                  key={currentImageIndex}
                  timeout={1000}
                  classNames={direction}
                  onEnter={() => setDisabled(true)}
                  onExited={() => setDisabled(false)}
                >
                  <div
                    style={{
                      backgroundImage: `url(${currentSlide.image})`,
                    }}
                    className="image"
                  >
                    <div className="text-box">
                      <h1>{currentSlide.title}</h1>
                      <h2>{currentSlide.content}</h2>
                    </div>
                    <button onClick={toggleMute} className="mute">
                      {isMuted ? <HiSpeakerXMark /> : <HiSpeakerWave />}
                    </button>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          )}
          <ArrowRight
            data-testid="next"
            onClick={nextImage}
            className={`arrow ${isDisabled ? "disabled" : ""}`}
            fill={"red"}
          />
        </div>
      </div>
      <audio
        ref={audioElement}
        src={audioSrc}
        controls
        onLoadedData={() => setAudioLoaded(true)}
        className="audio"
      />
    </div>
  );
}

export default ImageSlider;
