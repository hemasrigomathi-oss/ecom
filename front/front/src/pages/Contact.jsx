import { useState } from "react";
import "./contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    alert("Thank you! Your message has been sent.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>

        <div className="contact-container contact-hero-content">
          <p className="contact-label">GET IN TOUCH</p>

          <h1>
            Let's Start
            <br />
            A Conversation
          </h1>

          <p>
            Have a question about your order, products or
            shopping experience? We're here to help.
          </p>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-container">

          <div className="contact-grid">

            <div className="contact-information">

              <p className="contact-label">CONTACT US</p>

              <h2>
                We'd Love To
                <br />
                Hear From You
              </h2>

              <p className="contact-description">
                Whether you need help with an order, have a
                question about a product or simply want to
                share your feedback, feel free to reach out.
              </p>

              <div className="contact-details">

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    @
                  </div>

                  <div>
                    <span>EMAIL</span>
                    <strong>support@shoppy.com</strong>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    +
                  </div>

                  <div>
                    <span>PHONE</span>
                    <strong>+91 98765 43210</strong>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    ◉
                  </div>

                  <div>
                    <span>LOCATION</span>
                    <strong>Coimbatore, Tamil Nadu</strong>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    ◷
                  </div>

                  <div>
                    <span>WORKING HOURS</span>
                    <strong>Mon — Sat / 9:00 AM — 6:00 PM</strong>
                  </div>
                </div>

              </div>

              <div className="contact-note">
                <span>QUICK SUPPORT</span>
                <strong>
                  We're here whenever
                  <br />
                  you need us.
                </strong>
              </div>

            </div>

            <div className="contact-form-wrapper">

              <div className="contact-form-heading">
                <p>WRITE TO US</p>
                <h3>Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="contact-form-row">

                  <div className="contact-form-group">
                    <label>Name</label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <div className="contact-form-group">
                  <label>Subject</label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form-group">
                  <label>Message</label>

                  <textarea
                    name="message"
                    rows="6"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                >
                  Send Message
                  <span>→</span>
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

      <section className="contact-banner">
        <div className="contact-banner-overlay"></div>

        <div className="contact-container contact-banner-content">

          <div>
            <p className="contact-label">SHOPPING SUPPORT</p>

            <h2>
              Questions?
              <br />
              We're Listening.
            </h2>
          </div>

          <div className="contact-banner-text">
            <p>
              Your experience matters to us. Reach out and
              we'll help you find the right solution.
            </p>

            <span>SHAPPY • CUSTOMER CARE</span>
          </div>

        </div>
      </section>

      <section className="contact-bottom">
        <div className="contact-container">

          <div className="contact-bottom-grid">

            <div>
              <p className="contact-label">VISIT US</p>

              <h2>
                Find Your Way
                <br />
                To Us
              </h2>

              <p>
                Coimbatore, Tamil Nadu
                <br />
                India
              </p>
            </div>

            <div className="contact-map">
              <div className="contact-map-overlay">
                <span>SHAPPY</span>
                <strong>COIMBATORE</strong>
                <small>TAMIL NADU • INDIA</small>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Contact;