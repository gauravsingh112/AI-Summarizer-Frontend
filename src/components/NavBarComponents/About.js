import React from 'react';
import './About.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <h1>Protect Your Data. Prevent Threats.</h1>
      <p>
        Lepide combines identity and data security into a single solution to help you prevent your unstructured data from getting breached.
        Analyze user behavior, understand permissions, remediate areas of risk, and stop threats in real-time.
      </p>

      <h2>Lepide Addresses a Wide Variety of Use Cases:</h2>
      <div className="use-cases">
        <div className="use-case">
          <h3>Data Classification</h3>
        </div>
        <div className="use-case">
          <h3>AI Security</h3>
        </div>
        <div className="use-case">
          <h3>DSPM</h3>
        </div>
        <div className="use-case">
          <h3>Handling Data Breaches</h3>
        </div>
        <div className="use-case">
          <h3>Data Loss Prevention</h3>
        </div>
        <div className="use-case">
          <h3>Ransomware Protection</h3>
        </div>
        <div className="use-case">
          <h3>Data Access Governance</h3>
        </div>
        <div className="use-case">
          <h3>Cloud Security</h3>
        </div>
        <div className="use-case">
          <h3>Compliance Management</h3>
        </div>
        <div className="use-case">
          <h3>Active Directory Security</h3>
        </div>
      </div>
    </div>
  );
};

export default About;
