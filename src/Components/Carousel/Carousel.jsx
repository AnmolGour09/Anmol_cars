import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

// Images
import slide_image_1 from "../../assets/img_1.jpg";
import slide_image_2 from "../../assets/img_2.jpg";
import slide_image_3 from "../../assets/img_3.jpg";
import slide_image_4 from "../../assets/img_4.jpg";
import slide_image_5 from "../../assets/img_5.jpg";
import slide_image_6 from "../../assets/img_6.jpg";
import slide_image_7 from "../../assets/img_7.jpg";
import slide_image_8 from "../../assets/img_8.jpg";

function App() {
  const slidesData = [
    { img: slide_image_1, text: "Slide " },
    { img: slide_image_2, text: "Slide " },
    { img: slide_image_3, text: "Slide " },
    { img: slide_image_4, text: "Slide " },
    { img: slide_image_5, text: "Slide " },
    { img: slide_image_6, text: "Slide " },
    { img: slide_image_7, text: "Slide " },
    { img: slide_image_8, text: "Slide " },
  ];

  const slides = [...slidesData, ...slidesData]; // duplicate for loop

  return (
    <div className="carce">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={5}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={800}
        breakpoints={{ 600: { slidesPerView: 3 }, 1024: { slidesPerView: 5 } }}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5 }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="swiper_container"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-[250px] h-[120px]">
            <div className="relative w-full h-full">
              {/* Image */}
              <img
                src={slide.img}
                alt={`slide_${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Text at bottom */}
              <div className="absolute bottom-0 left-0 right-0 pb-[20%] pl-[20%] pr-[50%]">
                <div className="text-xl font-semibold text-white">
                  {slide.text}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;
