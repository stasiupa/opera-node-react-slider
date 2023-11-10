export interface Slide {
  title: string;
  content: string;
  image: string;
  audio: string;
}

export interface ImageSliderProps {
  slides: Slide[];
}