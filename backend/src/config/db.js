// ============================================================
// ملف الاتصال بقاعدة البيانات (PostgreSQL)
// كل الموديولات الأخرى تستخدم هذا الملف للتحدث مع قاعدة البيانات
// بدل أن يفتح كل موديول اتصاله الخاص — هذا يمنع الفوضى والتكرار.
// ============================================================

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

pool.on("error", (err) => {
  console.error("Erreur inattendue de la base de données :", err);
});

module.exports = pool;
