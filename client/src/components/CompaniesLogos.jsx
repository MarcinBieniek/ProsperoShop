import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

// Komponent dla niestandardowej strzałki "do przodu"
const NextArrow = ({ onClick }) => {
  return (
    <div className="absolute right-5 text-3xl" onClick={onClick}>
      <MdKeyboardArrowRight />
    </div>
  );
};

// Komponent dla niestandardowej strzałki "do tyłu"
const PrevArrow = ({ onClick }) => {
  return (
    <div className="absolute left-5 text-3xl" onClick={onClick}>
      <MdKeyboardArrowLeft />
    </div>
  );
};

const CompanyCarousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const logos = [
    "/logo/wisniowski.png",
    "/logo/somfy.png",
    "/logo/bft.png",
    "/logo/sommer.png",
    "/logo/novoferm.png"
  ];

  return (
    <div className='py-5'>
      <div className="relative container h-[100px] border-y-2 border-gray-200">
        <Slider {...settings} className='flex items-center w-full h-full pr-20'>
          {logos.map((logo, index) => (
            <div key={index} className='flex items-center h-full pl-40 justify-center'>
              <img src={logo} alt={`Logo ${index + 1}`} className='h-16 object-contain'  />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CompanyCarousel;
