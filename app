import { useState, useEffect } from 'react';

function App() {
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [storeStatus, setStoreStatus] = useState('');

  const checkStoreStatus = () => {
    fetch(`https://localhost:7033/api/Pood/status?dayOfWeek=${dayOfWeek}&currentTime=${currentTime}`)
      .then(response => response.text())
      .then(data => {
        setStoreStatus(data);
      })
      .catch(error => {
        console.error("Päringu viga:", error);
      });
  };

  useEffect(() => {
    checkStoreStatus();
  }, []);

  return (
    <div>
      <label>Nädala päev:
        <input type="text" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} />
      </label>
      <br />
      <label>Kellaaeg:
        <input type="text" value={currentTime} onChange={(e) => setCurrentTime(e.target.value)} />
      </label>
      <br />
      <button onClick={checkStoreStatus}>Kontrolli staatus</button>
      <p>Kaupluse staatus: {storeStatus}</p>
    </div>
  );
}

export default App;
