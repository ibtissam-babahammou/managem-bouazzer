// ============================================================
// Contrôleur : Authentification (inscription / connexion)
// ============================================================

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const SALT_ROUNDS = 10;

function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

async function register(req, res) {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res
        .status(409)
        .json({ message: "Un compte existe déjà avec cet e-mail." });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userModel.createUser({
      fullName,
      email,
      phone,
      passwordHash,
    });

    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "E-mail et mot de passe requis." });
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Identifiants incorrects." });
    }

    const token = generateToken(user);
    const { password_hash, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
}

module.exports = {
  register,
  login,
};
