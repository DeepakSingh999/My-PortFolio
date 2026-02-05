import React, { useState } from 'react';
import './Certificate.css';

const Certificate = ({ onBack }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: 1,
      title: 'Data Structure and Algorithms with C++',
      issuer: 'Code Help',
      mentor: 'Love Babbar',
      date: 'December 2025',
      credentialId: '3VCCYASR',
      image: '/images/dsa-cert.png',
      color: '#6366f1',
    },
    {
      id: 2,
      title: 'Data Structure and Algorithms with Java',
      issuer: 'Apna College',
      mentor: 'Shradha Khapra',
      date: '2025',
      credentialId: '',
      image: '/images/apna-cert.jpeg',
      color: '#10b981',
    },
    {
      id: 3,
      title: 'Technology Job Simulation',
      issuer: 'Deloitte',
      mentor: 'Forage',
      date: 'August 2025',
      credentialId: 'MGGMR2o7wPMFXhWqb',
      image: '/images/deloitte-cert.jpeg',
      color: '#86bc25',
    },
  ];

  const openModal = (cert) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  return (
    <section className="certificate">
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
      )}
      <h2 className="section-title">My <span className="highlight">Certificates</span></h2>
      <p className="section-subtitle">Professional certifications and achievements</p>
      
      <div className="certificate-grid">
        {certificates.map((cert) => (
          <div key={cert.id} className="cert-card" style={{'--accent-color': cert.color}}>
            <div className="cert-card-header">
              <div className="cert-icon-wrapper">
                <img src={cert.image} alt={cert.title} />
              </div>
              <div className="cert-badge">Verified</div>
            </div>
            <div className="cert-card-body">
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-issuer">
                <span className="issuer-name">{cert.issuer}</span>
                <span className="issuer-divider">•</span>
                <span className="mentor-name">{cert.mentor}</span>
              </div>
              <div className="cert-details">
                <div className="cert-detail-item">
                  <span className="detail-icon">📅</span>
                  <span>{cert.date}</span>
                </div>
                <div className="cert-detail-item">
                  <span className="detail-icon">🔐</span>
                  <span className="credential-id">{cert.credentialId}</span>
                </div>
              </div>
            </div>
            <div className="cert-card-footer">
              <button 
                className="cert-btn" 
                onClick={() => cert.profileUrl ? window.open(cert.profileUrl, '_blank') : openModal(cert)}
              >
                <span>{cert.profileUrl ? 'View Profile' : 'View Certificate'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCert && (
        <div className="cert-modal-overlay" onClick={closeModal}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-header" style={{'--accent-color': selectedCert.color}}>
              <h3>{selectedCert.title}</h3>
              <p>{selectedCert.issuer} • {selectedCert.mentor}</p>
            </div>
            <div className="modal-body">
              <img src={selectedCert.image} alt={selectedCert.title} />
            </div>
            <div className="modal-footer">
              <div className="modal-info">
                <span>📅 {selectedCert.date}</span>
                <span>🔐 {selectedCert.credentialId}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificate;
