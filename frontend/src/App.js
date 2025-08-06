import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { useState } from 'react';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <h1>Admin Panel - CMS</h1>
      <ProductForm onSuccess={() => setRefresh(refresh + 1)} />
      <ProductList key={refresh} />
    </div>
  );
}

export default App;
