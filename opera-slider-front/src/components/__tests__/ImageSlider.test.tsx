import { render, fireEvent } from "@testing-library/react";
import ImageSlider from "../ImageSlider";

describe("ImageSlider", () => {
  const mockSlides = [
    {
      title: "Slide 1",
      content: "Content 1",
      image: "image1.png",
      audio: "audio1.mp3",
    },
    {
      title: "Slide 2",
      content: "Content 2",
      image: "image2.png",
      audio: "audio2.mp3",
    },
  ];

  it("renders without crashing", () => {
    const component = render(<ImageSlider slides={mockSlides} />);

    expect(component).toBeTruthy();
  });

  it("renders no slides when given an empty array", () => {
    const { container } = render(<ImageSlider slides={[]} />);

    // Use container to query for elements by class name and check if none are found
    expect(container.querySelector(".image")).toBeNull();
  });

  it("renders the first slide initially", () => {
    const { container } = render(<ImageSlider slides={mockSlides} />);

    expect(container.querySelector(".image")).toBeInTheDocument();
  });

  it("navigates to the next slide when the next button is clicked", async () => {
    const { getByText, container } = render(
      <ImageSlider slides={mockSlides} />
    );

    fireEvent.click(getByText(">"));

    expect(container.querySelector(".image")).toBeInTheDocument();
  });

  it("navigates to the previous slide when the previous button is clicked", async () => {
    const { getByText, container } = render(
      <ImageSlider slides={mockSlides} />
    );

    fireEvent.click(getByText(">"));
    fireEvent.click(getByText("<"));

    expect(container.querySelector(".image")).toBeInTheDocument();
  });

  it("updates the audio source when navigating slides", () => {
    const { getByText, container } = render(
      <ImageSlider slides={mockSlides} />
    );
    fireEvent.click(getByText(">"));
    const audio = container.querySelector("audio");
    expect(audio).toHaveAttribute("src", mockSlides[1].audio);
  });
});
