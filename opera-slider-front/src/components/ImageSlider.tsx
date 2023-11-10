import React, { useState, useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AiFillSound, AiOutlineSound } from "react-icons/ai";
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
  const audioElement = useRef<HTMLAudioElement>(null);
  const [isDisabled, setDisabled] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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
      <p className="text">UNMUTE TO GET INTO THE MOOD!</p>
      <div className="image-slider-btns-wrapper">
        <p className="text">HERE ARE SOME IDEAS FOR THIS WEEKEND!</p>

        <div className="image-slider-btns">
          <button onClick={previousImage} disabled={isDisabled}>
            {"<"}
          </button>
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
                      {isMuted ? <AiFillSound /> : <AiOutlineSound />}
                    </button>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          )}
          <button onClick={nextImage} disabled={isDisabled}>
            {">"}
          </button>
        </div>
      </div>
      <audio
        ref={audioElement}
        src={audioSrc}
        controls
        onLoadedData={() => setAudioLoaded(true)}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ImageSlider;
