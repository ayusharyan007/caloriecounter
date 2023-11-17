// CalorieCalculator.js
import React, { useState } from 'react';
import './CalorieCalculator.css';
import foodData from './foodData.json';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalCalories, setTotalCalories] = useState(0);

  const handleSearchTermChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setSelectedFood(null); // Reset selectedFood when the user types to allow for a new selection
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setSearchTerm('');
  };

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value, 10);
    setQuantity(quantity);
  };

  const calculateCalories = () => {
    if (selectedFood) {
      const caloriesPerServing = selectedFood.calories;
      const totalCalories = quantity * caloriesPerServing;
      setTotalCalories(totalCalories);
    }
  };

  // Filter food items based on the search term
  const filteredFood = foodData.filter(
    (food) => food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="calorie-calculator">
      <h2>Calorie Calculator</h2>
      <div className="input-group">
        <label htmlFor="foodSearch">Search for Food:</label>
        <input
          type="text"
          id="foodSearch"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Type to search..."
        />
      </div>
      {filteredFood.length > 0 && searchTerm && (
        <div className="search-results">
          {filteredFood.map((food) => (
            <div
              key={food.id}
              className="search-result"
              onClick={() => handleFoodSelect(food)}
            >
              {food.name}
            </div>
          ))}
        </div>
      )}
      <div className="input-group">
        <label htmlFor="quantityInput">Quantity:</label>
        <input
          type="number"
          id="quantityInput"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <button onClick={calculateCalories}>Calculate Calories</button>
      {totalCalories > 0 && (
        <div className="result">
          <p>Total Calories: {totalCalories}</p>
        </div>
      )}
    </div>
  );
};

export default App;
