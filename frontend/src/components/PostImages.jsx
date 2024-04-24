import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, useMediaQuery } from "@mui/material";





const PostImages = ({ picturePaths }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
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
    
    <Box  width={isNonMobileScreens? "32rem": "100%"}>
      <Slider {...settings}>
        {picturePaths && 
          picturePaths.map((pictruePath, index) => (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={pictruePath}
                alt={`Slide ${index + 1}`}
                style={{
                  maxWidth:  "100%",
                  maxHeight: "auto",
                  borderRadius: "0.75rem",
                  marginTop: "0.75rem",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
      </Slider>
    </Box>
  );
};

export default PostImages;
