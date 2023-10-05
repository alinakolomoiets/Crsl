import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [products, setProduct] = useState([]);
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  const isActiveRef = useRef();
  const [isUsd, setUsd] = useState(false);

  useEffect(() => {
    fetch("https://localhost:7024/Products")
      .then(res => res.json())
      .then(json => setProduct(json));
  }, []);

  function kustuta(index) {
    fetch("https://localhost:7024/Products/kustuta/" + index)
      .then(res => res.json())
      .then(json => setProduct(json));
  }
  function tellida(sum) {
    try{
        const response = await fetch(`https://localhost:7024/Payment/${sum}/${index}`);
        if (response.ok){
          let payLink = await response.text();

          payLink = payLink.replace(/^"|"$/g, '');
          window.open(payLink, '_blank');
        }else{
          console.error('Error payment.');
        }
        }catch (error){
          console.error('Error payment:', error);
        }
  }
  function lisa() {
    fetch(`https://localhost:7024/Products/lisa/${Number(idRef.current.value)}/${nameRef.current.value}/${(priceRef.current.value)}/${(isActiveRef.current.checked)}/${stockRef.current.value}`, {"method": "POST"})
      .then(res => res.json())
      .then(json => setProduct(json));
  }
  function dollariteks() {
    const kurss = 1.1;
    setUsd(true);
    fetch("https://localhost:7024/Products/hind-dollaritesse/" + kurss)
      .then(res => res.json())
      .then(json => setProduct(json));
  }

  function eurodeks() {
    const kurss = 0.9091;
    setUsd(false);
    fetch("https://localhost:7024/Products/hind-dollaritesse/" + kurss)
      .then(res => res.json())
      .then(json => setProduct(json));
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
      <br/>
      {isUsd === false && <button onClick={() => dollariteks()}>Muuda dollariteks</button>}
      {isUsd === true && <button onClick={() => eurodeks()}>Muuda eurodeks</button>}
      {products.map((product, index) => 
        <table>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Delete</th>
          </tr>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.stock}</td>
          <td><button onClick={() => kustuta(index)}>x</button></td>
          <td><button onClick={() => tellida(product.price)}>Pay</button></td>
        </table>)}
    </div>
  );
}

export default App;
