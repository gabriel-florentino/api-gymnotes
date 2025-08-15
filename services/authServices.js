import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

import dotenv from "dotenv";
dotenv.config();
/**
 * Gera token JWT
 */
function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

/**
 * Registro de usuário normal
 */
export async function registerUser({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Usuário já existe");
    error.statusCode = 409; // conflito
    throw error;
  }

  if (!password || password.length < 5) {
    const error = new Error("Senha inválida");
    error.statusCode = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  const token = generateToken(user);
  return { user, token };
}

/**
 * Login de usuário normal
 */
export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (!user.password) {
    const error = new Error("Este usuário usa login via Google");
    error.statusCode = 401;
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    const error = new Error("Senha inválida");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user);
  return { user, token };
}

/**
 * Login ou registro via Google
 * @param {Object} googleProfile - dados retornados do Google (email, nome, id)
 */
export async function loginWithGoogle({ email, name, googleId }) {
  let user = await User.findOne({ email });

  if (!user) {
    // Cria novo usuário sem senha
    user = new User({
      name,
      email,
      googleId,
      password: undefined,
    });
    await user.save();
  } else if (!user.googleId) {
    // Marca usuário existente como Google
    user.googleId = googleId;
    await user.save();
  }

  const token = generateToken(user);
  return { user, token };
}
