import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import AnimatedTitle from './AnimatedTitle';
import './Contact.css';

const Contact = ({ speechEnabled }) => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  // Text-to-speech function for contact info
  const speakContactInfo = (label, value) => {
    window.speechSynthesis.cancel();
    const text = `${label}. ${value}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.9;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(voice =>
      voice.lang.includes('en') && (
        voice.name.includes('Male') ||
        voice.name.includes('David') ||
        voice.name.includes('James') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('Alex') ||
        voice.name.includes('Fred')
      )
    ) || voices.find(voice =>
      voice.lang.includes('en') && !voice.name.includes('Samantha') && !voice.name.includes('Victoria') && !voice.name.includes('Karen')
    ) || voices.find(voice => voice.lang.includes('en'));

    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // EmailJS configuration - You need to set up your own account
    emailjs.sendForm(
      'service_XXXXXXX',  // Replace with your EmailJS Service ID
      'template_XXXXXXX', // Replace with your EmailJS Template ID
      form.current,
      'XXXXXXXXXXXXXX'    // Replace with your EmailJS Public Key
    )
      .then((result) => {
        console.log('Email sent:', result.text);
        alert('✅ Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSending(false);
      })
      .catch((error) => {
        console.error('Email error:', error.text);
        alert('❌ Failed to send message. Please try again or email me directly.');
        setSending(false);
      });
  };

  const handleWhatsApp = () => {
    const { name, email, subject, message } = formData;
    const whatsappMessage = `Hi Deepak!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subject:* ${encodeURIComponent(subject)}%0A%0A*Message:*%0A${encodeURIComponent(message)}`;
    const whatsappUrl = `https://wa.me/917889140393?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="contact">
      <AnimatedTitle text="Contact " highlightText="Me" />
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item" onClick={() => speechEnabled && speakContactInfo('Location', 'Shilanath Jaynagar, Madhubani, Bihar')}>
            <div className="info-icon">📍</div>
            <div className="info-text">
              <h4>Location <span className="speak-icon">🔊</span></h4>
              <p>Shilanath Jaynagar, Madhubani, Bihar</p>
            </div>
          </div>
          <div className="info-item" onClick={() => speechEnabled && speakContactInfo('Email', 'deepaks86509@gmail.com')}>
            <div className="info-icon">📧</div>
            <div className="info-text">
              <h4>Email <span className="speak-icon">🔊</span></h4>
              <p>deepaks86509@gmail.com</p>
            </div>
          </div>
          <div className="info-item" onClick={() => speechEnabled && speakContactInfo('Phone', '+91 7889140393')}>
            <div className="info-icon">📱</div>
            <div className="info-text">
              <h4>Phone <span className="speak-icon">🔊</span></h4>
              <p>+91 7889140393</p>
            </div>
          </div>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/deepak999/" className="social-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/DeepakSingh999" className="social-link" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://x.com/DeepaksSin77660" className="social-link" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
        <form ref={form} className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <div className="form-buttons">
            <button type="submit" className="submit-btn" disabled={sending}>
              {sending ? 'Sending...' : '📧 Send via Email'}
            </button>
            <button type="button" className="whatsapp-btn" onClick={handleWhatsApp}>
              💬 Send via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
