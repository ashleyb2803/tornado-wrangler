import React, { useState } from 'react';
import './ResourcePage.css';

const ResourcePage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };


  const PhoneIcon = () => (
    <svg className="card-title-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const MapPinIcon = () => (
    <svg className="assistance-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const AlertTriangleIcon = () => (
    <svg className="emergency-alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  );

  const HeartIcon = () => (
    <svg className="assistance-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  const HomeIcon = () => (
    <svg className="assistance-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  const UsersIcon = () => (
    <svg className="assistance-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg className="accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const ChevronUpIcon = () => (
    <svg className="accordion-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );

  const ExternalLinkIcon = () => (
    <svg className="external-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', description: 'Police, Fire, Medical Emergency' },
    { name: 'National Weather Service', number: '1-800-362-6430', description: 'Weather Warnings & Updates' },
    { name: 'Red Cross Disaster Relief', number: '1-800-733-2767', description: '24/7 Disaster Assistance' },
    { name: 'FEMA Helpline', number: '1-800-621-3362', description: 'Federal Emergency Management' },
    { name: 'Salvation Army', number: '1-800-725-2769', description: 'Emergency Assistance' }
  ];

  const organizations = [
    {
      name: 'American Red Cross',
      website: 'redcross.org',
      services: ['Emergency shelter', 'Food and water', 'Medical assistance', 'Family reunification'],
      description: 'Provides immediate emergency assistance, shelter, and disaster relief services.'
    },
    {
      name: 'FEMA (Federal Emergency Management Agency)',
      website: 'fema.gov',
      services: ['Disaster assistance', 'Housing assistance', 'Financial aid', 'Recovery planning'],
      description: 'Federal agency providing disaster relief and emergency management.'
    },
    {
      name: 'Salvation Army',
      website: 'salvationarmyusa.org',
      services: ['Emergency shelter', 'Food services', 'Emotional support', 'Cleanup assistance'],
      description: 'Provides comprehensive disaster relief and community support services.'
    },
    {
      name: 'United Way',
      website: '211.org',
      services: ['Resource referrals', 'Financial assistance', 'Volunteer coordination', 'Local support'],
      description: 'Connects people with local resources and assistance programs. Dial 2-1-1 for help.'
    },
    {
      name: 'National Voluntary Organizations Active in Disaster (NVOAD)',
      website: 'nvoad.org',
      services: ['Coordinated relief', 'Volunteer management', 'Resource sharing', 'Recovery support'],
      description: 'Coordinates disaster relief efforts among various organizations.'
    }
  ];

  const safetyTips = [
    {
      title: 'Before a Tornado',
      tips: [
        'Know the difference between a tornado watch and warning',
        'Identify a safe room in your home (basement, interior room on lowest floor)',
        'Keep emergency supplies readily available',
        'Have a battery-powered weather radio',
        'Practice your tornado drill with family members'
      ]
    },
    {
      title: 'During a Tornado',
      tips: [
        'Go to your safe room immediately',
        'Get under a sturdy table or desk',
        'Cover your head and neck with your arms',
        'Stay away from windows and doors',
        'If outside, lie flat in a low area and cover your head'
      ]
    },
    {
      title: 'After a Tornado',
      tips: [
        'Check for injuries and give first aid if trained',
        'Watch for hazards like broken glass and downed power lines',
        'Document damage with photos for insurance',
        'Contact family and friends to let them know you\'re safe',
        'Listen to emergency officials for instructions'
      ]
    }
  ];

  const assistanceTypes = [
    {
      icon: <HomeIcon />,
      title: 'Housing Assistance',
      description: 'Temporary shelter, hotel vouchers, and housing repair assistance'
    },
    {
      icon: <HeartIcon />,
      title: 'Medical Support',
      description: 'Emergency medical care, prescription assistance, and mental health support'
    },
    {
      icon: <UsersIcon />,
      title: 'Family Services',
      description: 'Child care, elder care, and family reunification services'
    },
    {
      icon: <MapPinIcon />,
      title: 'Financial Aid',
      description: 'Disaster assistance grants, low-interest loans, and insurance support'
    }
  ];

  return (
    <div className="resources-page">
      <div className="resources-container">
        {/* Header */}
        <div className="resources-header">
          <h1 className="resources-title">Tornado Emergency Resources</h1>
          <p className="resources-subtitle">
            Essential information, contacts, and resources for tornado preparedness and recovery
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="emergency-alert">
          <div className="emergency-alert-content">
            <AlertTriangleIcon />
            <div className="emergency-alert-text">
              <h3 className="emergency-alert-title">Emergency Situation?</h3>
              <p className="emergency-alert-description">
                If you are in immediate danger, call <strong>911</strong> immediately. 
                For non-emergency assistance, use the resources below.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="card">
          <h2 className="card-title">
            <PhoneIcon />
            Emergency Contacts
          </h2>
          <div className="contacts-grid">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="contact-card">
                <h3 className="contact-name">{contact.name}</h3>
                <p className="contact-number">{contact.number}</p>
                <p className="contact-description">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Types of Assistance */}
        <div className="card">
          <h2 className="card-title">Types of Assistance Available</h2>
          <div className="assistance-grid">
            {assistanceTypes.map((type, index) => (
              <div key={index} className="assistance-item">
                {type.icon}
                <div>
                  <h3 className="assistance-title">{type.title}</h3>
                  <p className="assistance-description">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relief Organizations */}
        <div className="card">
          <h2 className="card-title">Relief Organizations</h2>
          <div className="organizations-list">
            {organizations.map((org, index) => (
              <div key={index} className="organization-card">
                <div className="organization-header">
                  <h3 className="organization-name">{org.name}</h3>
                  <ExternalLinkIcon />
                </div>
                <p className="organization-description">{org.description}</p>
                <div className="services-section">
                  <p className="services-label">Services provided:</p>
                  <div className="services-tags">
                    {org.services.map((service, serviceIndex) => (
                      <span key={serviceIndex} className="service-tag">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                   <p className="organization-website">
                       Website: <a href={`https://${org.website}`} target="_blank" rel="noopener noreferrer">{org.website}</a>
                   </p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Information */}
        <div className="card">
          <h2 className="card-title">Tornado Safety Information</h2>
          <div className="safety-accordion">
            {safetyTips.map((section, index) => (
              <div key={index} className="accordion-item">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="accordion-button"
                >
                  <h3 className="accordion-title">{section.title}</h3>
                  <div>
                    {expandedSection === section.title ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                </button>
                {expandedSection === section.title && (
                  <div className="accordion-content">
                    <ul className="tips-list">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="tip-item">
                          <span className="tip-bullet"></span>
                          <span className="tip-text">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="card">
          <h2 className="card-title">Additional Resources</h2>
          <div className="additional-resources-grid">
            <div>
              <h3 className="resource-section-title">Insurance & Financial</h3>
              <ul className="resource-list">
                <li className="resource-item">• Contact your insurance company immediately</li>
                <li className="resource-item">• Keep receipts for all expenses</li>
                <li className="resource-item">• Apply for FEMA assistance online at DisasterAssistance.gov</li>
                <li className="resource-item">• Contact your bank about loan modifications</li>
              </ul>
            </div>
            <div>
              <h3 className="resource-section-title">Mental Health Support</h3>
              <ul className="resource-list">
                <li className="resource-item">• SAMHSA Disaster Distress Helpline: 1-800-985-5990</li>
                <li className="resource-item">• Crisis Text Line: Text HOME to 741741</li>
                <li className="resource-item">• National Suicide Prevention Lifeline: 988</li>
                <li className="resource-item">• Local mental health services through 2-1-1</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="resources-footer">
          <p>Stay safe and stay informed. Remember: When thunder roars, go indoors!</p>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;