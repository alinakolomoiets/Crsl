import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [tooted, setTooted] = useState([]);
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const isActiveRef = useRef();
  const stockRef = useRef();

  useEffect(() => {
    fetch("https://localhost:7024/api/Products")
      .then(res => res.json())
      .then(json => setTooted(json));
  }, []);

  function kustuta(index) {                             ////////////////////////
    fetch("https://localhost:7024/api/Products/kustuta/" + index, {"method": "DELETE"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }

  function lisa() {
    const uusToode = {
      "id": Number(idRef.current.value),
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "stock": Number(stockRef.current.value),
      "isActive": isActiveRef.current.checked
    }
    fetch("https://localhost:7024/api/Products/lisa", {"method": "POST", "body": JSON.stringify(uusToode)})
      .then(res => res.json())
      .then(json => setTooted(json));
  }

  function dollariteks() {
    const kurss = 1.1;                                      ////////////////////////
    fetch("https://localhost:7024/api/Products/hind-dollaritesse/" + kurss, {"method": "PATCH"})
      .then(res => res.json())
      .then(json => setTooted(json));
  }
  return (
    <div className="App">
      <label>ID</label> <br />
      <input ref={idRef} type="number" /> <br />
      <label>name</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>price</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>stock</label> <br />
      <input ref={stockRef} type="number" /> <br />
      <label>isActive</label> <br />
      <input ref={isActiveRef} type="checkbox" /> <br />
      <button onClick={() => lisa()}>Lisa</button>
      <button onClick={() => dollariteks()}>Muuda dollariteks</button>
      {tooted.map((toode, index) => 
        <div>
          <div>{toode.id}</div>
          <div>{toode.name}</div>
          <div>{toode.price.toFixed(2)}</div>
          <button onClick={() => kustuta(index)}>x</button>
        </div>)}
    </div>
  );
}

export default App;