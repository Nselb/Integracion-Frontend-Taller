import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(0)

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/product')
      setProducts(response.data)
    } catch (error) {
    }
  }
  useEffect(() => {
    getProducts()
  },[])
  const purchaseProduct = async (id) =>
  {
    try {
      setError(false);
      const response = await axios.patch(`http://localhost:3000/api/product/purchase/${id}`);
      const updatedProducts = [...products];
      const index = updatedProducts.findIndex(product => product.id === id);
      if (index !== -1) {
        updatedProducts[index] = response.data;
      }
      setProducts(updatedProducts);
    } catch (error) {
      setError(true);
      setSelectedProduct(id);
    }
  }
  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Cantidad: {product.quantity}
            <button onClick={() => purchaseProduct(product.id)}>Comprar</button>
            {error && selectedProduct === product.id?<span>Producto sin stock</span>:<></>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
