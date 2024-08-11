import React from 'react';
import './Contact.css'; // Import the CSS file

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We would love to hear from you! Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.</p>
      
      <div className="contact-details">
        <div className="contact-info">
          <h3>Email Us</h3>
          <p>support@lepide.com</p>
        </div>
        <div className="contact-info">
          <h3>Call Us</h3>
          <p>+1 800 123 4567</p>
        </div>
        <div className="contact-info">
          <h3>Visit Us</h3>
          <p>1234 Lepide St, Suite 100, City, Country</p>
        </div>
      </div>

      <form className="contact-form">
        <h2>Send Us a Message</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Your Name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Your Email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="5" placeholder="Your Message"></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
