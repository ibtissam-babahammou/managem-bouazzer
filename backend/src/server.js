// ============================================================
// نقطة انطلاق السيرفر (Backend) — Bou-Azzer Minerals
// ============================================================
// هذا الملف هو "المايسترو": يجمع كل الموديولات (routes) ويشغّل
// السيرفر. لن نضيف منطق أعمال هنا مباشرة — فقط ربط الموديولات.
// ============================================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------- Middlewares généraux --------
app.use(cors());
app.use(express.json());

// -------- Route de vérification (health check) --------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Le serveur fonctionne correctement." });
});

// ============================================================
// Les routes des modules seront ajoutées ici, une par une,
// au fur et à mesure que chaque module est construit et testé.
// ============================================================
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/addresses", require("./routes/addresses.routes"));
app.use("/api/orders", require("./routes/orders.routes"));
app.use("/api/visits", require("./routes/visits.routes"));
app.use("/api/contact", require("./routes/contactMessages.routes"));
app.use("/api/faqs", require("./routes/faq.routes"));
app.use("/api/wishlist", require("./routes/wishlist.routes"));
app.use("/api/upload", require("./routes/upload.routes"));
app.use("/api/inventory", require("./routes/inventory.routes"));
app.use("/api/categories", require("./routes/categories.routes"));
app.use("/api/products", require("./routes/products.routes"));
app.use("/api/cart", require("./routes/cart.routes"));

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
