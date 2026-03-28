import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    image: '/images/hero/year-of-eagle.jpeg',
    title: 'Welcome to Dominion City',
    subtitle: 'A place where lives are transformed, destinies are fulfilled, and leaders are raised.',
    buttons: [
      { text: 'PLAN YOUR VISIT', link: '/contact', primary: true },
      { text: 'WATCH LIVE', link: '/sermons', primary: false, icon: <FaPlay /> },
    ],
  },
  {
    id: 2,
    image: '/images/hero/dr-david-ogbueli.jpeg',
    title: 'With Dr. David Ogbueli',
    subtitle: "Experience the transformative power of God's Word through prophetic teaching.",
    buttons: [
      { text: 'LATEST SERMONS', link: '/sermons', primary: true },
      { text: 'MEET THE MAN OF GOD', link: '/about', primary: false },
    ],
  },
  {
    id: 3,
    image: '/images/hero/congregation.jpeg',
    title: 'Join Our Growing Family',
    subtitle: 'Be part of a vibrant community of believers passionate about God.',
    buttons: [
      { text: 'CONNECT WITH US', link: '/contact', primary: true },
      { text: 'UPCOMING EVENTS', link: '/events', primary: false },
    ],
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div
      className="hero-slider"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        marginTop: 0,
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          <div
            className="slide-bg"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div
            className="slide-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
              zIndex: 1,
            }}
          />
          <div
            className="slide-content"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              width: '90%',
              maxWidth: '800px',
              zIndex: 2,
            }}
          >
            <h1
              style={{
                fontSize: '64px',
                marginBottom: '20px',
                fontFamily: 'var(--font-primary)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                textAlign: 'center',
                lineHeight: '1.2',
              }}
            >
              {slide.title}
            </h1>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '40px',
                opacity: 0.9,
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
                lineHeight: '1.6',
              }}
            >
              {slide.subtitle}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {slide.buttons.map((btn, idx) => (
                <Link
                  key={idx}
                  to={btn.link}
                  className={`btn ${btn.primary ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 36px',
                    borderRadius: '40px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {btn.icon && <span style={{ marginRight: '5px' }}>{btn.icon}</span>}
                  {btn.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '30px',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(65,105,225,0.2)',
          border: '1px solid var(--primary-blue)',
          color: 'var(--primary-blue)',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '30px',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(65,105,225,0.2)',
          border: '1px solid var(--primary-blue)',
          color: 'var(--primary-blue)',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}
      >
        <FaChevronRight />
      </button>

      <div
        className="slider-dots"
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 10,
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: index === currentSlide ? 'var(--primary-blue)' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;