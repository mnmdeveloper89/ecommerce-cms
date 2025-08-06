import { useEffect, useState } from 'react';
import api from '../api';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>List products</h2>
      {products.map(p => (
        <div key={p.id} style={{ border: '1px solid #ccc', padding: 10, margin: 10 }}>
          <h4>{p.name}</h4>
          <p>{p.description}</p>
          <img src={`http://localhost:3000${p.image}`} alt={p.name} width={100} />
          <p>Category: {p.category}</p>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
