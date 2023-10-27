import React, { useState } from 'react';
import './App.css';

function App() {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [storeStatus, setStoreStatus] = useState('');
  const [error, setError] = useState(null);

  const checkStoreStatus = async () => {
    try {
      const response = await fetch(`https://localhost:7033/store-status?timeOfDay=${timeOfDay}`);
      if (response.ok) {
        const data = await response.json();
        setStoreStatus(data.Status);
      } else {
        setError('Viga kaupluse staatuse saamisel.');
      }
    } catch (error) {
      setError('Viga API päringu ajal: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Kontrollida poe staatust</h1>
      <div>
        <label>Sisestage kellaaeg: </label>
        <input
          type="time"
          value={timeOfDay}
          onChange={e => setTimeOfDay(e.target.value)}
        />
        <button onClick={checkStoreStatus}>Kontrolli staatus</button>
      </div>
      {error && <p>{error}</p>}
      {storeStatus && <p>Kaupluse staatus: {storeStatus}</p>}
    </div>
  );
}

export default App;
