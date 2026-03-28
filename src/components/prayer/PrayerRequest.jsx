import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandsPraying, FaLock, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

const PrayerRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prayer: '',
    isPrivate: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email notification
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: 'prayer@dominioncity.org',
          from_name: formData.name,
          from_email: formData.email,
          prayer_request: formData.prayer,
          is_private: formData.isPrivate ? 'Yes' : 'No'
        },
        'YOUR_PUBLIC_KEY'
      );

      toast.success('Prayer request submitted! Our prayer team will pray for you.');
      setFormData({ name: '', email: '', prayer: '', isPrivate: true });
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="prayer-section">
      <div className="container">
        <div className="prayer-grid">
          <motion.div
            className="prayer-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaHandsPraying className="prayer-icon" />
            <h2>Prayer Request</h2>
            <p>Our prayer team is ready to stand with you in faith. Submit your prayer request and let us agree with you in prayer.</p>
            <div className="prayer-promise">
              <FaLock />
              <span>Your request is confidential and will be handled with care</span>
            </div>
            <div className="prayer-schedule">
              <h4>Prayer Schedule</h4>
              <p>Monday - Friday: 5:00 AM (Corporate Prayer)</p>
              <p>Wednesday: 6:00 PM (Digging Deep)</p>
              <p>24/7 Prayer Line: <strong>+234 123 456 7890</strong></p>
            </div>
          </motion.div>

          <motion.form
            className="prayer-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3>Submit Your Request</h3>
            
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email (for response)"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="prayer"
                rows="5"
                placeholder="What would you like us to pray about?"
                value={formData.prayer}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleChange}
                />
                Keep this request private (only prayer team can see)
              </label>
            </div>
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Prayer Request'}
            </button>
          </motion.form>
        </div>
      </div>

      <style jsx>{`
        .prayer-section {
          padding: 80px 0;
          background: var(--dark-bg);
        }
        
        .prayer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
        }
        
        .prayer-info {
          text-align: center;
        }
        
        .prayer-icon {
          font-size: 64px;
          color: var(--primary-blue);
          margin-bottom: 20px;
        }
        
        .prayer-info h2 {
          font-size: 36px;
          margin-bottom: 20px;
        }
        
        .prayer-promise {
          background: rgba(65, 105, 225, 0.1);
          padding: 15px;
          border-radius: 10px;
          margin: 30px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .prayer-schedule {
          background: rgba(255,255,255,0.05);
          padding: 20px;
          border-radius: 15px;
          text-align: left;
        }
        
        .prayer-schedule h4 {
          color: var(--primary-blue);
          margin-bottom: 15px;
        }
        
        .prayer-form {
          background: rgba(255,255,255,0.05);
          padding: 40px;
          border-radius: 20px;
        }
        
        .prayer-form h3 {
          font-size: 24px;
          margin-bottom: 25px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 15px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(65, 105, 225, 0.3);
          border-radius: 10px;
          color: var(--text-light);
          font-family: inherit;
        }
        
        .checkbox label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .prayer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default PrayerRequest;