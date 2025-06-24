import "./about.scss";

function About() {
  return (
    <div className="aboutPage">
      <div className="container">
        <h1>About StayNest</h1>
        <div className="content">
          <div className="textSection">
            <h2>Our Story</h2>
            <p>
              StayNest has been a trusted name in real estate since its founding. We pride ourselves on connecting people with their perfect homes and investment properties.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              Our mission is to make property hunting and renting as seamless as possible. We believe everyone deserves to find their ideal living space without hassle.
            </p>

            <h2>Why Choose Us</h2>
            <ul>
              <li>Extensive property listings across multiple cities</li>
              <li>Verified property information</li>
              <li>Professional and dedicated support team</li>
              <li>Easy-to-use platform</li>
              <li>Secure transactions</li>
            </ul>
          </div>
          
          <div className="statsSection">
            <div className="stat">
              <h3>16+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat">
              <h3>200+</h3>
              <p>Properties Listed</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Expert Agents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 