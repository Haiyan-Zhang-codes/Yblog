import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostImages = ({ picturePaths }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <Slider {...settings}>
      {picturePaths.map((pictruePath, index) => (
        <div key={index}>
          <img
            src={pictruePath}
            alt={`Slide ${index + 1}`}
            width="100%"
            height="auto"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default PostImages;
