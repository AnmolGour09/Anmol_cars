import React, { useEffect, useRef, useState } from "react";
import Carousel from "../../Components/Carousel/Carousel";
import MoviesCarousel from "../../Components/MoviesCarousel/MoviesCarousel";

import Img from "../../assets/why.jpg";
import go from "../../assets/goc.jpg";
import ev from "../../assets/eve.jpg";


import v1 from "../../assets/v1.jpg";
import v2 from "../../assets/v2.jpg";
import v3 from "../../assets/v3.jpg";



// Video
import videoFile from "../../assets/video.mp4";

// Assets
import slideImg1 from "../../assets/slide-icon-1.svg";
import slideImg2 from "../../assets/slide-icon-2.svg";
import slideImg3 from "../../assets/slide-icon-3.svg";

import slideImg4 from "../../assets/slide-icon-4.svg";
import slideImg5 from "../../assets/slide-icon-5.svg";

// Splide imports
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

export default function Index() {
  const heroRef = useRef(null);
  const reeRef = useRef(null);
  const saeRef = useRef(null);
  const taeRef = useRef(null);

  // New state and ref for the text animation
  const aboutRef = useRef(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [heroTextVisible, setHeroTextVisible] = useState(false);

  // New state and ref for the image animation
  const imageRef = useRef(null);
  const [imageVisible, setImageVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHeroTextVisible(true);
    }, 200); // Delay for smoother entry
  }, []);

  // Fade-in animation on load
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.opacity = "0";
      setTimeout(() => {
        heroRef.current.style.transition = "opacity 1s ease-in-out";
        heroRef.current.style.opacity = "1";
      }, 100);
    }
  }, []);

  // Scroll animation for Car Web site
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (reeRef.current) {
        reeRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      if (saeRef.current) {
        saeRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
      if (taeRef.current) {
        taeRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect for the text slide-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  // Effect for the new image slide-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  // Text animation in/out
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay text entry so it follows image
          setImageVisible(true);
          setTimeout(() => setAboutVisible(true), 200); // 200ms delay
        } else {
          // Delay text exit so it follows image
          setAboutVisible(false);
          setTimeout(() => setImageVisible(false), 200); // reverse order
        }
      },
      { threshold: 0.01 }
    );

    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  // for gokart

  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const heading = sectionRef.current.querySelector(".learn-more-line");
          const cards = sectionRef.current.querySelectorAll(".vehicle-card");

          if (entry.isIntersecting) {
            heading.classList.add("active");
            cards.forEach((card) => card.classList.add("active"));
          } else {
            heading.classList.remove("active");
            cards.forEach((card) => card.classList.remove("active"));
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // sponsors

  


  return (
    <div className="w-full">
      {/* Main section */}

      <section
        ref={heroRef}
        className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden hero-section"
        style={{ opacity: 1, transition: "opacity 1s ease-in-out" }}
      >
        <video
          src={videoFile}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
          }}
        ></video>

        <div
          className={`
      absolute text-center text-white transition-all duration-1000 ease-out
      ${
        heroTextVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-full"
      }
    `}
        >
          <h1
            ref={reeRef}
            className="text-[60px] md:text-[130px] font-bold italic"
            style={{
              fontFamily: "cursive",
              transition: "transform 0.3s ease",
              color: "red",
            }}
          >
            Car <span style={{color: "White"}}>Website</span>
          </h1>
          
          <button
            className="absolute"
            ref={taeRef}
            style={{
              fontFamily: "math",
              transition: "transform 0.3s ease",
              color: "White",
              fontSize: "25px",
            }}
          >
            <a href="#Car">Scroll </a>
          </button>
        </div>
      </section>

      <br></br>
      <br></br>
      {/* About Section with Splide AutoScroll */}
      <div
        id="Car"
        className="relative text-center w-full py-[10px] pt-0"
      ></div>

      {/*ADD ANIMATION SECTION*/}
      <div className="home">
        <section className="flex flex-col lg:flex-row items-center gap-10 px-6 lg:px-20 pt-0 bg-black ">
          {/* Image Section */}
          <div
            ref={imageRef}
            className={`
            flex-1 relative overflow-hidden rounded-2xl shadow-2xl
            transition-all duration-1000 ease-out
            ${
              imageVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform -translate-x-full"
            }
          `}
            style={{
              transitionProperty: "transform, opacity",
              transitionDelay: imageVisible ? "0ms" : "0ms",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/30 z-10 group-hover:from-black/40 transition-all duration-500"></div>
            <img
              alt="About us"
              className="w-full h-80 lg:h-96 object-cover"
              loading="lazy"
              src={Img}
            />
          </div>

          {/* Text Section */}
          <div
            ref={aboutRef}
            className={`
            flex-1 text-center lg:text-left
            transition-all duration-1000 ease-out
            ${
              aboutVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform translate-x-full"
            }
          `}
            style={{
              transitionDelay: aboutVisible ? "200ms" : "0ms",
            }}
          >
            <h2 className="about-reev-heading text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-wide font-mono uppercase">
              Dodge Challenger
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed text-white font-light max-w-2xl">
              The highlight of our showroom is the legendary Dodge Challenger SRT Hellcat, a true masterpiece of American muscle engineering. Known for its bold design and unmatched power, the Hellcat is equipped with a supercharged 6.2L HEMI® V8 engine that delivers breathtaking performance on the road. Its aggressive styling, wide body stance, and signature details make it an instant head-turner. Inside, the car combines luxury with performance-focused features, offering advanced technology, premium comfort, and driver-assist systems for both safety and thrill. The Challenger SRT Hellcat is more than just a car—it’s an adrenaline-packed experience that embodies strength, speed, and prestige. With exceptional durability, a strong resale value, and the support of our expert after-sales service, this vehicle stands as the best car in our showroom for those who seek both power and pride. 
            </p>
          </div>
        </section>
        <div
          ref={imageRef}
          className={`
              flex-1 relative overflow-hidden rounded-2xl shadow-2xl
              transition-all duration-1000 ease-out
              ${
                imageVisible
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-full"
              }
            `}
        ></div>
        <div
          ref={aboutRef}
          className={`
              flex-1 text-center lg:text-left
              transition-all duration-1000 ease-out
              ${
                aboutVisible
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform -translate-x-full"
              }
            `}
          style={{
            transitionDelay: aboutVisible ? "200ms" : "0ms",
          }}
        ></div>
      </div>

      {/* why buy from us */}
      <div className="JoinUs">
        <h2 className="learn-more-line">
          <span
            style={{
              fontWeight: "bold",
              lineHeight: "0",
              fontSize: "30px",
            }}
          >
            Why Buy from this showroom ?
          </span>
        </h2>

        <p>
          <br></br>
          Buying a car from our showroom ensures a complete and professional experience where customer satisfaction is the top priority. Our showroom provides end-to-end services including expert consultation to help you choose the right model, flexible financing and loan assistance, hassle-free documentation, and attractive exchange offers for your old vehicle. We also provide test drives to let you personally experience comfort, performance, and safety features before making a decision. After-sales service is another major advantage, as our showroom offers genuine spare parts, skilled technicians, and scheduled maintenance packages to keep your car in top condition. Customers benefit from exclusive warranty coverage, roadside assistance, insurance support, and priority servicing. By purchasing a car from our showroom, you gain not just a vehicle but also long-term reliability, trust, and personalized support, making your ownership journey smooth, secure, and rewarding.
        </p>
      </div>

      {/* Work Section */}

      <div className="whyjoin-section" ref={sectionRef}>
        <div className="whyjoin-grid">
          {/* Whyjoin Cards 1 */}
          <div className="whyjoin-cards">
            <div className="cards-image">
              <img
                src={v1}
                alt="car1"
              />
            </div>
            <div className="cards-content">
              <div className="cards-headers">
                <h3 className="learn-more-line ">
                  <span
                    style={{
                      fontFamily: "cursive",
                      color: "red",
                    }}
                  >
                    BMW{" "}
                  </span>{" "}
                  F30
                </h3>
                <br />
              </div>
              <p className="text-lg lg:text-xl leading-relaxed text-white font-light max-w-2xl">
The BMW F30 3 Series stands out as a modern luxury sedan that blends power with elegance. With its sporty exterior lines and aerodynamic profile, it reflects precision and class. A choice of powerful yet fuel-efficient engines ensures an engaging drive in both city and highway conditions. Inside, premium materials, driver-focused comfort, and advanced technology create a sophisticated experience. Altogether, the F30 offers an excellent mix of innovation, safety, and style, making it a favorite among performance-oriented luxury car buyers.              </p>
            </div>
          </div>

          {/* Whyjoin Cards 2 */}
          <div className="whyjoin-cards">
            <div className="cards-image">
              <img
                src={v2}
                alt="car2"
              />
            </div>
            <div className="cards-content">
              <div className="cards-headers">
                <h3 className="learn-more-line">
                  <span
                    style={{
                      fontFamily: "cursive",
                      color: "red",
                    }}
                  >
                    BMW{" "}
                  </span>{" "}
                  3 GT
                </h3>
                <br />
              </div>
              <p className="text-lg lg:text-xl leading-relaxed text-white font-light max-w-2xl">
                The BMW 3 Series Gran Turismo (3GT) is a luxury car that blends the sportiness of the 3 Series with added space and comfort. It features a stylish coupe-like design with a sloping roofline and a roomy interior, offering extra legroom and luggage space compared to the standard sedan. Powered by efficient petrol and diesel engines, it delivers a smooth yet dynamic driving experience. The 3GT also comes equipped with modern technology, premium interiors, and advanced safety features. It’s a perfect choice for those who want both performance and practicality in a premium car.
              </p>
            </div>
          </div>
          {/* Whyjoin Cards 3 */}
          <div className="whyjoin-cards">
            <div className="cards-image">
              <img
                src={v3}
                alt="car2"
              />
            </div>
            <div className="cards-content">
              <div className="cards-headers">
                <h3 className="learn-more-line">
                  <span
                    style={{
                      fontFamily: "cursive",
                      color: "red",
                    }}
                  >
                  Mercedes{" "}
                  </span>{" "}
                  AMG GT
                </h3>
                <br />
              </div>
              <p className="text-lg lg:text-xl leading-relaxed text-white font-light max-w-2xl">
The Mercedes-AMG GT(S) Supreme Tuning delivers the perfect balance of luxury and extreme performance. With Supreme’s ECU tuning, it gains up to +130 HP and +165 Nm torque, ensuring breathtaking acceleration and race-ready precision. The process is simple and reversible, letting drivers switch seamlessly between stock and tuned modes. Added options such as octane-specific tuning, speed limiter removal, and exhaust burbles make every drive more thrilling. This transforms the AMG GT(S) into a sports car tailored for both excitement and individuality.              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel Section - Autoplay */}
      <div className="Joinme">
        <h2 className="learn-more-line">
          <span
            style={{
              fontWeight: "bold",
              lineHeight: "0",
              fontSize: "30px",
            }}
          >
            OUR FLEET
          </span>
        </h2>
      </div>
      <section className="py-10">
        <Carousel
          slides={[slideImg1, slideImg2, slideImg3]}
          autoplay={true}
          interval={3000}
        />
      </section>

      {/* Gokart */}
      {/* Gokart / OUR FLEET Section */}
      <div className="vehicles-section" ref={sectionRef}>
        <div className="Joinme">
          <h2 className="learn-more-line">
            <span
              style={{
                fontWeight: "bold",
                lineHeight: "0",
                fontSize: "30px",
              }}
            >
              OUR FLEET
            </span>
          </h2>
        </div>

        <div className="vehicles-grid">
          {/* Vehicle Card 1 */}
          <div className="vehicle-card reev-card">
            <div className="header">
              <h3>
                <span
                  style={{
                    fontFamily: "cursive",
                    color: "red",
                  }}
                >
                  MGA 1600 {" "}
                </span>
                Roadster
              </h3>
            </div>
            <div className="card-content">
              <div className="card-image">
                <img
                  src={ev}
                  alt="car"
                />
              </div>
              <div className="card-header">
                <br></br>
                <span className="card-subtitle">Royal Car</span>
              </div>
              <p className="text-lg lg:text-xl leading-relaxed text-white font-light max-w-2xl">
                                The MGA 1600 Roadster is a timeless classic that embodies vintage British sports car charm. Featuring elegant curves and an open-top design, it delivers an authentic roadster experience full of freedom and style. Its 1.6L engine offers lively performance, making it both fun to drive and easy to handle. The lightweight body and responsive steering ensure agility on winding roads. Altogether, the MGA 1600 remains a symbol of elegance, simplicity, and driving passion for enthusiasts worldwide.

              </p>
              <button className="vehicle-cta">
                <span
                  className="about-reev-heading"
                  style={{
                    fontFamily: "cursive",
                    color: "red",
                    fontSize: "19px",
                  }}
                >
                  Learn More{" "}
                </span>{" "}
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Vehicle Card 2 */}
          <div className="vehicle-card reev-card">
            <div className="header">
              <h3>
                <span
                  style={{
                    fontFamily: "cursive",
                    color: "red",
                  }}
                >
                  BMW{" "}
                </span>{" "}
                Car
              </h3>
            </div>
            <div className="card-content">
              <div className="card-image">
                <img
                  src={go}
                  alt="GoKart"
                />
              </div>
              <div className="card-header">
                <br></br>
                <span className="card-subtitle">Limited Stock</span>
              </div>
              <p className="text-lg lg:text-xl leading-relaxed text-white font-light max-w-2xl">
                BMW cars are known for combining dynamic performance with refined luxury. Their sporty design and aerodynamic styling make them stand out on the road. With powerful yet efficient engines, they deliver an engaging driving experience in both city and highway conditions. Inside, premium materials, advanced technology, and driver-focused comfort create a sophisticated cabin. Altogether, BMW represents the perfect balance of innovation, safety, and driving pleasure.
              </p>
              <button className="vehicle-cta">
                <span
                  className="about-reev-heading"
                  style={{
                    fontFamily: "cursive",
                    color: "red",
                    fontSize: "19px",
                  }}
                >
                  Learn More{" "}
                </span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

        
    </div>
  );
}
