import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeckCleaningQuestions from './DeckCleaningQuestions';
import QuotationForm from './QuotationForm';
import '../css/QuestionsModal.css';

const QuestionsModal = ({ questions = [], homeSize = '', serviceType = '' }) => {
  const [electricDryersQty, setElectricDryersQty] = useState(0);
  const [gasDryersQty, setGasDryersQty] = useState(0);
  const [deckSizes, setDeckSizes] = useState([{ width: '', height: '' }]);
  const [railingQuantities, setRailingQuantities] = useState({ composite: 0, steps: 0, vinyl: 0, paintedWood: 0 });
  const [trackCleaningInput, setTrackCleaningInput] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [showQuotationForm, setShowQuotationForm] = useState(false);
  const [quotationDetails, setQuotationDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const navigate = useNavigate();

  const convertOptions = (options) => {
    return options.map((optionObj) => {
      const optionString = Object.keys(optionObj)
        .filter((key) => !isNaN(key))
        .sort((a, b) => a - b)
        .map((key) => optionObj[key])
        .join('');

      const objectIdIndex = optionString.search(/66[a-zA-Z0-9]{24}/);
      if (objectIdIndex !== -1) {
        return optionString.substring(0, objectIdIndex).trim();
      }

      return optionString.trim();
    });
  };

  const handleDeckSizeChange = (index, field, value) => {
    const updatedDeckSizes = [...deckSizes];
    updatedDeckSizes[index][field] = value;
    setDeckSizes(updatedDeckSizes);
  };

  const handleAddDeckSize = () => {
    setDeckSizes([...deckSizes, { width: '', height: '' }]);
  };

  const handleRemoveDeckSize = (index) => {
    const updatedDeckSizes = deckSizes.filter((_, i) => i !== index);
    setDeckSizes(updatedDeckSizes);
  };

  const handleRailingChange = (type, value) => {
    setRailingQuantities({
      ...railingQuantities,
      [type]: value,
    });
  };

  const handleElectricDryersChange = (e) => {
    setElectricDryersQty(e.target.value);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      electricDryersQty: e.target.value,
    }));
  };

  const handleGasDryersChange = (e) => {
    setGasDryersQty(e.target.value);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      gasDryersQty: e.target.value,
    }));
  };

  const handleTrackCleaningInputChange = (e) => {
    setTrackCleaningInput(e.target.value);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      trackCleaningInput: e.target.value,
    }));
  };

  const handleQuestionChange = (questionIndex, value) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`question-${questionIndex}`]: value,
    }));
  };

  const handleFormSubmit = (formData) => {
    const finalAnswers = {
      ...userAnswers,
      serviceType: serviceType,
      homeSize: homeSize,
    };

    setQuotationDetails({
      ...formData,
      userAnswers: finalAnswers,
    });

    setShowQuotationForm(false);
    setIsVisible(false);
    navigate('/quotation', { state: { details: { ...formData, userAnswers: finalAnswers } } });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="questions-modal">
      <div className="modal-content">
        <button className="modal-close" onClick={() => setIsVisible(false)}>X</button>
        <h2 className="modal-heading">Service Questions</h2>
        <p>Home Size: {homeSize}</p>

        {!showQuotationForm && !quotationDetails ? (
          <form onSubmit={(e) => e.preventDefault()}>
            {serviceType === 'Dryer Vent Cleaning' && (
              <div>
                <h3>Step 1: How many dryers do you need vents cleaned for?</h3>
                <div className="question-item">
                  <h4>Electric Dryers</h4>
                  <label htmlFor="electricDryersQty">Electric Dryers QTY</label>
                  <input
                    type="number"
                    id="electricDryersQty"
                    name="electricDryersQty"
                    value={electricDryersQty}
                    onChange={handleElectricDryersChange}
                    min="0"
                  />
                </div>
                <div className="question-item">
                  <h4>Gas Dryers</h4>
                  <label htmlFor="gasDryersQty">Gas Dryers QTY</label>
                  <input
                    type="number"
                    id="gasDryersQty"
                    name="gasDryersQty"
                    value={gasDryersQty}
                    onChange={handleGasDryersChange}
                    min="0"
                  />
                </div>
                {questions
                  .filter((question) => question.step !== 1)
                  .map((question, index) => (
                    <div key={index} className="question-item">
                      <h3>Step {question.step}: {question.question}</h3>
                      <select
                        id={`question-${index}`}
                        name={`question-${index}`}
                        className="question-select"
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        defaultValue=""
                      >
                        <option value="">Select an option</option>
                        {convertOptions(question.options).map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
              </div>
            )}

            {serviceType === 'Track Cleaning' && (
              <div>
                <h3>Track Cleaning Step #1:</h3>
                <div className="question-item">
                  <label htmlFor="trackCleaningInput">Enter quantity or details:</label>
                  <input
                    type="text"
                    id="trackCleaningInput"
                    name="trackCleaningInput"
                    value={trackCleaningInput}
                    onChange={handleTrackCleaningInputChange}
                    placeholder="Enter quantity or details"
                  />
                </div>
                {questions
                  .filter((question) => question.step !== 1)
                  .map((question, index) => (
                    <div key={index} className="question-item">
                      <h3>Step {question.step}: {question.question}</h3>
                      <select
                        id={`question-${index}`}
                        name={`question-${index}`}
                        className="question-select"
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        defaultValue=""
                      >
                        <option value="">Select an option</option>
                        {convertOptions(question.options).map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
              </div>
            )}

            {serviceType === 'Deck Cleaning' && (
              <DeckCleaningQuestions
                deckSizes={deckSizes}
                handleDeckSizeChange={handleDeckSizeChange}
                handleAddDeckSize={handleAddDeckSize}
                handleRemoveDeckSize={handleRemoveDeckSize}
                railingQuantities={railingQuantities}
                handleRailingChange={handleRailingChange}
                handleRailingMaterialChange={(value) => handleRailingChange('railingMaterial', value)}
                handleDeckFloorMaterialChange={(value) => handleRailingChange('deckFloorMaterial', value)}
                handleRailingTypeChange={(value) => handleRailingChange('railingType', value)}
                handleStairsQuantityChange={(value) => handleRailingChange('stairsQuantity', value)}
              />
            )}

            {serviceType !== 'Dryer Vent Cleaning' && serviceType !== 'Deck Cleaning' && serviceType !== 'Track Cleaning' && (
              <div>
                {questions.map((question, index) => (
                  <div key={index} className="question-item">
                    <h3>Step {question.step}: {question.question}</h3>
                    <label htmlFor={`question-${index}`}>{question.label}</label>
                    <select
                      id={`question-${index}`}
                      name={`question-${index}`}
                      className="question-select"
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      defaultValue=""
                    >
                      <option value="">Select an option</option>
                      {convertOptions(question.options).map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            <button type="button" className="submit-button" onClick={() => setShowQuotationForm(true)}>
              Submit
            </button>
          </form>
        ) : (
          <QuotationForm 
            onSubmit={handleFormSubmit}
            quotationDetails={quotationDetails}
            handleFormClose={() => setShowQuotationForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionsModal;
