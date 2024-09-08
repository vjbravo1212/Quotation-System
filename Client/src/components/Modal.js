import React, { useState } from 'react';
import '../css/Modal.css';
import FormContent from './FormContent';
import QuestionsModal from '../components/QuestionModal';

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const images = importAll(require.context('../images', false, /\.(jpg|jpeg|png|gif)$/));

const Modal = ({ isOpen, onClose, services }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [view, setView] = useState('services');
  const [questions, setQuestions] = useState([]);
  const [homeSize, setHomeSize] = useState('');

  if (!isOpen) return null;

  const handleServiceSelect = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleNext = () => setView('form');
  const handleBack = () => setView('services');

  const handleFormSubmit = async (data) => {
    setHomeSize(data.homeSize);

    try {
      const selectedServiceNames = selectedServices
        .map(service => service.service_name.replace(/\s+/g, '_'))
        .join(',');
      const encodedServiceNames = encodeURIComponent(selectedServiceNames);

      const response = await fetch(`https://quotation-system.onrender.com/api/services/questions?homeSize=${data.homeSize}&service=${encodedServiceNames}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const fetchedQuestions = await response.json();
      setQuestions(fetchedQuestions);
      setView('questions');
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Failed to fetch questions. Please try again.');
    }
  };

  const getServiceType = () => {
    return selectedServices[0] ? selectedServices[0].service_name : '';
  };

  const handleQuestionsSubmit = (event) => {
    event.preventDefault();
    alert('Questions submitted!');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>

        {view === 'services' ? (
          <>
            <h2>Our Services</h2>
            <div className="services-grid">
              {services.length > 0 ? (
                services.map((service) => (
                  <div
                    className={`service-item ${selectedServices.includes(service) ? 'selected' : ''}`}
                    key={service._id}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <img 
                      src={images[`${service.service_name}.png`] || 'fallback.png'}
                      alt={service.service_name}
                      className="service-image"
                    />
                    <p className="service-name">{service.service_name}</p>
                  </div>
                ))
              ) : (
                <p>No services available</p>
              )}
            </div>
            {selectedServices.length > 0 && (
              <button className="next-button" onClick={handleNext}>Next</button>
            )}
          </>
        ) : view === 'form' ? (
          <FormContent 
            onBack={handleBack} 
            onNext={handleFormSubmit}
            selectedServices={selectedServices}
          />
        ) : (
          <QuestionsModal 
            questions={questions}
            homeSize={homeSize}
            setQuestions={setQuestions}
            setHomeSize={setHomeSize}
            onSubmit={handleQuestionsSubmit}
            serviceType={getServiceType()}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
