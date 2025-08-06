const express = require('express');
const app = express();
const productsRoute = require('./routes/products');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productsRoute);

const PORT = 5000; // ← PROMJENA OVDE
app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`);
});

const fs = require('fs');

// Kreiraj uploads folder ako ne postoji
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
