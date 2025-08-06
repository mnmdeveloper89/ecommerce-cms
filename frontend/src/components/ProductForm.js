import { useState } from 'react';
import api from '../api';

export default function ProductForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', description: '', category: '', image: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('category', form.category);
    data.append('image', form.image);

    await api.post('/products', data);
    onSuccess();
    setForm({ name: '', description: '', category: '', image: null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add product</h3>
      <input
        type="text"
        placeholder="Title"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      /><br />
      <textarea
        placeholder="Text"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        required
      /><br />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        required
      /><br />
      <input
        type="file"
        onChange={e => setForm({ ...form, image: e.target.files[0] })}
        required
      /><br />
      <button type="submit">Add</button>
    </form>
  );
}
