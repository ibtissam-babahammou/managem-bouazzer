// ============================================================
// api/index.js
// Ce petit fichier permet à Vercel de faire fonctionner notre
// serveur Express existant, sans modifier aucun fichier déjà
// construit (server.js, routes, controllers, models restent
// exactement les mêmes).
// ============================================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Le serveur fonctionne correctement." });
});

app.use("/api/auth", require("../src/routes/auth.routes"));
app.use("/api/users", require("../src/routes/users.routes"));
app.use("/api/addresses", require("../src/routes/addresses.routes"));
app.use("/api/orders", require("../src/routes/orders.routes"));
app.use("/api/visits", require("../src/routes/visits.routes"));
app.use("/api/contact", require("../src/routes/contactMessages.routes"));
app.use("/api/faqs", require("../src/routes/faq.routes"));
app.use("/api/wishlist", require("../src/routes/wishlist.routes"));
app.use("/api/upload", require("../src/routes/upload.routes"));
app.use("/api/inventory", require("../src/routes/inventory.routes"));
app.use("/api/categories", require("../src/routes/categories.routes"));
app.use("/api/products", require("../src/routes/products.routes"));
app.use("/api/cart", require("../src/routes/cart.routes"));

// Vercel exécute cette application directement (pas de app.listen ici)
module.exports = app;
