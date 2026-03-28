import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'HOME' },
    {
      label: 'ABOUT US',
      dropdown: [
        { path: '/about#story', label: 'Our Story' },
        { path: '/about#beliefs', label: 'Our Beliefs' },
        { path: '/about#pastor', label: 'Our Pastor' },
      ],
    },
    {
      label: 'MINISTRIES',
      dropdown: [
        { path: '/ministries#workforce', label: 'Workforce' },
        { path: '/ministries#youth', label: 'The Edge Youth' },
        { path: '/ministries#women', label: 'Women of Impact' },
        { path: '/ministries#men', label: 'Men of Honour' },
      ],
    },
    { path: '/events', label: 'EVENTS' },
    { path: '/sermons', label: 'SERMONS' },
    { path: '/books', label: 'BOOKS' },  // ← ADDED BOOKS LINK
    { path: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: ${isScrolled ? 'var(--dark-bg)' : 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)'};
          backdrop-filter: blur(10px);
          z-index: 1000;
          padding: 15px 0;
          transition: all 0.4s ease;
        }
        
        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .logo {
          text-decoration: none;
          flex-shrink: 0;
        }
        
        .logo img {
          height: 50px;
          width: auto;
        }
        
        .nav-menu {
          display: flex;
          list-style: none;
          gap: 25px;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        
        .nav-menu li {
          position: relative;
          display: inline-block;
        }
        
        .nav-menu a,
        .dropdown-trigger {
          color: var(--text-light);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 8px 0;
          transition: all 0.3s ease;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
        }
        
        .nav-menu a::before,
        .dropdown-trigger::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-blue);
          transition: all 0.3s ease;
        }
        
        .nav-menu a:hover::before,
        .nav-menu a.active::before,
        .dropdown-trigger:hover::before {
          width: 100%;
        }
        
        .nav-menu a:hover,
        .nav-menu a.active,
        .dropdown-trigger:hover {
          color: var(--primary-blue);
        }
        
        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          min-width: 200px;
          padding: 12px 0;
          border-radius: 8px;
          list-style: none;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(65, 105, 225, 0.2);
          z-index: 100;
        }
        
        .dropdown li {
          display: block;
        }
        
        .dropdown a {
          padding: 10px 20px;
          display: block;
          font-size: 13px;
          text-transform: none;
          letter-spacing: 0.5px;
          color: var(--text-gray);
          white-space: nowrap;
        }
        
        .dropdown a:hover {
          color: var(--primary-blue);
          background: rgba(65, 105, 225, 0.1);
        }
        
        .dropdown a::before {
          display: none;
        }
        
        .give-btn {
          background: var(--primary-blue);
          color: var(--white) !important;
          padding: 8px 20px !important;
          border-radius: 30px;
          font-weight: 600;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .give-btn:hover {
          background: transparent;
          color: var(--primary-blue) !important;
          border-color: var(--primary-blue);
        }
        
        .give-btn::before {
          display: none !important;
        }
        
        .nav-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 24px;
          color: var(--primary-blue);
          cursor: pointer;
        }
        
        /* Theme Toggle Styles */
        .theme-toggle-wrapper {
          display: flex;
          align-items: center;
        }
        
        @media (max-width: 992px) {
          .nav-menu {
            gap: 20px;
          }
          
          .nav-menu a,
          .dropdown-trigger {
            font-size: 12px;
          }
        }
        
        @media (max-width: 768px) {
          .nav-toggle {
            display: block;
          }
          
          .nav-menu {
            position: fixed;
            top: 80px;
            left: ${isMobileMenuOpen ? '0' : '-100%'};
            width: 100%;
            height: calc(100vh - 80px);
            background: var(--dark-bg);
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: 40px 20px;
            transition: left 0.3s ease;
            gap: 20px;
            overflow-y: auto;
          }
          
          .nav-menu li {
            width: 100%;
            text-align: center;
          }
          
          .nav-menu a,
          .dropdown-trigger {
            display: block;
            width: 100%;
            padding: 12px;
            font-size: 14px;
            white-space: normal;
          }
          
          .dropdown {
            position: static;
            background: transparent;
            backdrop-filter: none;
            box-shadow: none;
            display: none;
            padding: 10px 0 0 20px;
            border: none;
            width: 100%;
          }
          
          .dropdown a {
            text-align: center;
            padding: 8px;
            white-space: normal;
          }
          
          .has-dropdown.active .dropdown {
            display: block;
          }
          
          .dropdown-trigger {
            justify-content: center;
          }
          
          .give-btn {
            display: inline-flex;
            width: auto;
            margin-top: 10px;
          }
          
          .logo img {
            height: 40px;
          }
          
          .theme-toggle-wrapper {
            margin: 10px 0;
            justify-content: center;
          }
        }
      `}</style>
      
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <img 
              src="/images/logo.png" 
              alt="Dominion City" 
              style={{ height: '50px', width: 'auto' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span style="color: var(--primary-blue); font-size: 22px; font-weight: bold;">DOMINION CITY</span>';
              }}
            />
          </Link>

          <button className="nav-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link, index) => (
              <li
                key={index}
                className={link.dropdown ? 'has-dropdown' : ''}
                onMouseEnter={() => !isMobileMenuOpen && setActiveDropdown(index)}
                onMouseLeave={() => !isMobileMenuOpen && setActiveDropdown(null)}
              >
                {link.path ? (
                  <NavLink to={link.path} className={({ isActive }) => isActive ? 'active' : ''}>
                    {link.label}
                  </NavLink>
                ) : (
                  <button className="dropdown-trigger" onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}>
                    {link.label}
                  </button>
                )}

                {link.dropdown && (
                  <AnimatePresence>
                    {(activeDropdown === index || (isMobileMenuOpen && activeDropdown === index)) && (
                      <motion.ul
                        className="dropdown"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.dropdown.map((item, idx) => (
                          <li key={idx}>
                            <Link to={item.path}>{item.label}</Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
            
            {/* THEME TOGGLE */}
            <li className="theme-toggle-wrapper">
              <ThemeToggle />
            </li>
            
            {/* GIVE BUTTON */}
            <li>
              <Link to="/give" className="give-btn">
                GIVE <FaHeart />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;