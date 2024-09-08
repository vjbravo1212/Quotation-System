import React from 'react';

const DeckCleaningQuestions = ({
  deckSizes,
  handleDeckSizeChange,
  handleAddDeckSize,
  handleRemoveDeckSize,
  railingQuantities,
  handleRailingChange,
  railingMaterial,
  handleRailingMaterialChange,
  deckFloorMaterial,
  handleDeckFloorMaterialChange,
  railingType,
  handleRailingTypeChange,
  stairsQuantity,
  handleStairsQuantityChange
}) => (
  <>
    <div className="question-item">
      <h3>Step 1: What size is your deck/patio(s)?</h3>
      {deckSizes.map((size, i) => (
        <div key={i} className="deck-size-input">
          <input
            type="number"
            value={size.width}
            onChange={(e) => handleDeckSizeChange(i, 'width', e.target.value)}
            placeholder="Width (feet)"
          />
          <span>X</span>
          <input
            type="number"
            value={size.height}
            onChange={(e) => handleDeckSizeChange(i, 'height', e.target.value)}
            placeholder="Height (feet)"
          />
          {deckSizes.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveDeckSize(i)}
              className="remove-button"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddDeckSize} className="add-button">
        Add Another Area
      </button>
    </div>

    <div className="question-item">
      <h3>Step 2: Railing Details</h3>
      <div className="quantity-input">
        <label>How many linear feet of railing do you have?</label>
        <input
          type="number"
          value={railingQuantities.linearFeet}
          onChange={(e) => handleRailingChange('linearFeet', e.target.value)}
          placeholder="Enter quantity"
        />
        <span>QTY</span>
      </div>
      <div className="quantity-input">
        <label>How many steps of deck stairs do you have?</label>
        <input
          type="number"
          value={stairsQuantity}
          onChange={(e) => handleStairsQuantityChange(e.target.value)}
          placeholder="Enter quantity"
        />
        <span>QTY</span>
      </div>
    </div>

    <div className="question-item">
      <h3>Step 3: Tell us how many linear feet you have of the applicable railings</h3>
      <div className="quantity-input">
        <label>Composite Railings (linear feet)</label>
        <input
          type="number"
          value={railingQuantities.composite}
          onChange={(e) => handleRailingChange('composite', e.target.value)}
          placeholder="Enter quantity"
        />
        <span>QTY</span>
      </div>
      <div className="quantity-input">
        <label>Vinyl Railings (linear feet)</label>
        <input
          type="number"
          value={railingQuantities.vinyl}
          onChange={(e) => handleRailingChange('vinyl', e.target.value)}
          placeholder="Enter quantity"
        />
        <span>QTY</span>
      </div>
      <div className="quantity-input">
        <label>Painted Wood Railings (linear feet)</label>
        <input
          type="number"
          value={railingQuantities.paintedWood}
          onChange={(e) => handleRailingChange('paintedWood', e.target.value)}
          placeholder="Enter quantity"
        />
        <span>QTY</span>
      </div>
    </div>

    <div className="question-item">
      <h3>Step 4: Are your railings made of IPE, Cedar, or Pine?</h3>
      <select
        value={railingMaterial}
        onChange={(e) => handleRailingMaterialChange(e.target.value)}
      >
        <option value="">Select an option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>

    <div className="question-item">
      <h3>Step 5: What is your deck floor made of?</h3>
      <select
        value={deckFloorMaterial}
        onChange={(e) => handleDeckFloorMaterialChange(e.target.value)}
      >
        <option value="">Select an option</option>
        <option value="0">IPE</option>
        <option value="1">Composite</option>
        <option value="2">Pine</option>
        <option value="3">Cedar</option>
        <option value="4">Stone</option>
        <option value="5">Vinyl</option>
        <option value="6">Brick</option>
      </select>
    </div>

    <div className="question-item">
      <h3>Step 6: What is your railing made of?</h3>
      <select
        value={railingType}
        onChange={(e) => handleRailingTypeChange(e.target.value)}
      >
        <option value="">Select an option</option>
        <option value="Pine">Pine</option>
        <option value="IPE">IPE</option>
        <option value="Cedar">Cedar</option>
        <option value="Vinyl">Vinyl</option>
      </select>
    </div>
  </>
);

export default DeckCleaningQuestions;
