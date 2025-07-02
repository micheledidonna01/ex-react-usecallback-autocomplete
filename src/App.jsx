import { useState, useEffect, useMemo, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
function debounce(callback, delay){
  let timer;
  return(value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}
function App() {

  const [valueInput, setValueInput] = useState('');
  const [products, setProducts] = useState([]);


  const getProducts = async (value) => {
    try {
      const prendi = await fetch(`http://localhost:3333/products?search=${value}`,);
      const productsPromise = await prendi.json();
      setProducts(productsPromise);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }

  }

  const getProductsCallback = useCallback(debounce((value) => {
    getProducts(value);
  }, 300), []);
   
  const isInName = products.filter(p => {
    if (p.name.toLowerCase().trim().startsWith(valueInput.toLowerCase().trim())){
      return p.name;

    }
  });
  console.log(isInName);
  console.log(products);


  useEffect(() => {
    getProductsCallback(valueInput);
    
  }, [valueInput]);




  return (
    <>
      

      <div className="p-3">
        <input 
        type="text" 
        value={valueInput} 
        onChange={e => setValueInput(e.target.value)}
        placeholder="cerca..."
        />
        
        { valueInput && 
          <div className="list-group">
            {products.map((p, index) => <li className="list-group-item list-group-item-action ist-group-item-secondary p-3 mt-3" key={index}>{p.name}</li>)}
        </div>
        }
      </div>

      {/* <div className="p-2">
        {products.map(product => (
          <div key={product.id} >
            <h2>{product.name}</h2>
            <h3>{product.brand}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            
          </div>
        ))}
      </div> */}
    </>
  )
}

export default App
