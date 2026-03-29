import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './MarqueeGrid.css';

const marqueeImages = [
  { 
    src: '/images/grid/Sunday-service-.jpeg', 
    label: 'Sunday Service',
    //  description: 'Sunday Service',
    category: 'Free Transportaion'
  },
  { 
    src: '/images/grid/Sunday-service.jpeg', 
    label: 'Sunday Service',
    description: '29th March, 2026',
    category: 'Making the most of Time and Seasons'
  },
  { 
    src: '/images/grid/mpa1.jpeg', 
    label: 'Dr. David Ogbueli',
    description: 'Sunday Service',
    category: 'Activating the riches of God"s redemption.'
  },
  { 
    src: '/images/grid/ss1.jpeg', 
    // label: '',
    description: 'We are happy to have you!',
    category: 'Welcome to Church!'
  },
  { 
    src: '/images/grid/ss2.jpeg', 
    // // label: 'The Edge Youth',
    //  description: 'Sunday Service',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/ss3.jpeg', 
    // // label: 'Baptism Service',
    // description: 'Free Transportation',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/ss4.jpeg', 
    // // label: 'Prayer Meeting',
    //  description: 'Sunday Service',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/ss7.jpeg', 
    // // label: 'Children\'s Ministry',
    // description: 'Free Transportation',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/mpa2.jpeg', 
    // // label: 'Women of Impact',
    //  description: 'Sunday Service',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/praiz12.jpeg', 
    label: 'Enter his gate with thanksgiving...',
    // description: '',
    category: 'PRAISE'
  },
  { 
    src: '/images/grid/praiz14.jpeg', 
    label: '...and into his court with praise.',
    // description: '',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/praiz15.jpeg', 
    // // label: 'Community Impact',
    // description: 'Free Transportation',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/praiz5.jpeg', 
    // label: 'The Edge Youth',
    //  description: 'Sunday Service',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/praiz16.jpeg', 
    // // label: 'Baptism Service',
    // description: 'Free Transportation',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/mpa3.jpeg', 
    // // label: 'Prayer Meeting',
    //  description: 'Sunday Service',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/wor10.jpeg', 
    label: 'We bow before you Lord...',
    // description: '',
    category: 'WORSHIP'
  },
  { 
    src: '/images/grid/wor17.jpeg', 
    label: '...and we honour you...',
    //  description: '',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/wor2.jpeg', 
    label: '... with lifted hands...',
    // description: '',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/wor15.jpeg', 
    label: '...worship you...',
    // description: '',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/wor9.jpeg', 
    // // label: 'Community Impact',
    // description: 'Free Transportation',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/mpa4.jpeg', 
    // // label: 'The Edge Youth',
    //  description: 'Sunday Service',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/word1.jpeg', 
    label: 'Activating the riches of God"s redemption.',
    description: 'I am rich in Christ!',
    category: 'WORD'
  },
  { 
    src: '/images/grid/word2.jpeg', 
    // // label: 'Prayer Meeting',
    //  description: 'Sunday Service',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/word4.jpeg', 
    // label: 'Children\'s Ministry',
    // description: 'Free Transportation',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/word5.jpeg', 
    // // label: 'Women of Impact',
    //  description: 'Sunday Service',
    // category: '29th March, 2026'
  },
  { 
    src: '/images/grid/word7.jpeg', 
    // // label: 'Men of Honour',
    // description: 'Free Transportation',
    // category: '29th March, 2026'
  },
];

const MarqueeGrid = () => {
  const trackRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId;
    let position = 0;

    const animate = () => {
      if (!isHovered) {
        position -= speed;
        if (Math.abs(position) >= track.scrollWidth / 2) {
          position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, speed]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className="marquee-grid-section" ref={sectionRef}>
      <div className="container">
        <motion.div 
          className="marquee-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-subtitle">Our Community</span>
          <h2>Moments That Matter</h2>
          <p>Experience the vibrant life of Dominion City through our moments</p>
        </motion.div>
      </div>

      <div className="marquee-container">
        <div
          className="marquee-track"
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((item, index) => (
            <div key={index} className="marquee-item-wrapper">
              <div className="marquee-item">
                <img src={item.src} alt={item.label} loading="lazy" />
              </div>
              <div className="marquee-caption">
                <span className="marquee-category">{item.category}</span>
                <h4>{item.label}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-controls">
        <button className="control-btn" onClick={() => setSpeed(0.3)} title="Slow">🐢</button>
        <button className="control-btn active" onClick={() => setSpeed(0.5)} title="Normal">●</button>
        <button className="control-btn" onClick={() => setSpeed(0.8)} title="Fast">🐇</button>
      </div>
    </section>
  );
};

export default MarqueeGrid;