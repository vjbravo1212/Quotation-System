import React, { useState } from 'react';
import '../css/FormContent.css';

const FormContent = ({ onBack, onNext, selectedServices }) => {
  const [source, setSource] = useState('');
  const [homeSize, setHomeSize] = useState('');

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleHomeSizeChange = (e) => {
    setHomeSize(e.target.value);
  };

  const handleSubmit = () => {
    if (!homeSize || !source) {
      alert("Please fill in all fields.");
      return;
    }

    
    onNext({ homeSize, selectedServices, source });
  };

  return (
    <div className="form-content">
      <h2 className="form-heading">General Information</h2>

      <label htmlFor="source">Where did you hear about us?</label>
      <select
        id="source"
        name="source"
        className="form-select"
        value={source}
        onChange={handleSourceChange}
      >
        <option value="">Please Select *</option>
        <option value="2302">Angie's List</option>
        <option value="9366">Facebook</option>
        <option value="2297">Google</option>
        <option value="18851">Google Ad</option>
        <option value="9367">Nextdoor App</option>
        <option value="2467">Postcard</option>
        <option value="8737">Previous Customer</option>
        <option value="2301">Referral</option>
        <option value="19128">Yard Sign</option>
      </select>

      <fieldset className="home-size">
        <h1 style={{marginBottom:"10px"}}>Home Size</h1>
        <label>
          <input
            type="radio"
            name="homeSize"
            value="Small"
            checked={homeSize === 'Small'}
            onChange={handleHomeSizeChange}
          />
          Small Home
        </label>
        <label>
          <input
            type="radio"
            name="homeSize"
            value="Medium"
            checked={homeSize === 'Medium'}
            onChange={handleHomeSizeChange}
          />
          Medium Home
        </label>
        <label>
          <input
            type="radio"
            name="homeSize"
            value="Large"
            checked={homeSize === 'Large'}
            onChange={handleHomeSizeChange}
          />
          Large Home
        </label>
        <label>
          <input
            type="radio"
            name="homeSize"
            value="XL"
            checked={homeSize === 'XL'}
            onChange={handleHomeSizeChange}
          />
          XL Home
        </label>
        <label>
          <input
            type="radio"
            name="homeSize"
            value="XXL"
            checked={homeSize === 'XXL'}
            onChange={handleHomeSizeChange}
          />
          XXL Home
        </label>
      </fieldset>

      <div className="form-buttons">
        <button onClick={onBack} className="btn-back">Back</button>
        <button onClick={handleSubmit} className="btn-next">Next</button>
      </div>
    </div>
  );
};

export default FormContent;
