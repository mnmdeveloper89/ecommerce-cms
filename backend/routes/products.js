const express = require('express');
const multer = require('multer');
const { nanoid } = require('nanoid');
const db = require('../models/productModel');
const router = express.Router();
const path = require('path');

// Podešavanje za slike
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// GET svi proizvodi
router.get('/', async (req, res) => {
  await db.read();
  res.json(db.data.products);
});

// POST novi proizvod
router.post('/', upload.single('image'), async (req, res) => {
  const { name, description, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  const product = {
    id: nanoid(),
    name,
    description,
    category,
    image: imageUrl
  };

  await db.read();
  db.data.products.push(product);
  await db.write();

  res.status(201).json(product);
});

// PUT ažuriranje proizvoda
router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  await db.read();
  const product = db.data.products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Proizvod nije pronađen' });

  product.name = name || product.name;
  product.description = description || product.description;
  product.category = category || product.category;
  if (imageUrl) product.image = imageUrl;

  await db.write();
  res.json(product);
});

// DELETE proizvod
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.read();
  db.data.products = db.data.products.filter(p => p.id !== id);
  await db.write();
  res.json({ message: 'Proizvod obrisan' });
});

module.exports = router;