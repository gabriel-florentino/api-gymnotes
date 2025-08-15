import jwt from "jsonwebtoken";
import { registerUser, loginUser, loginWithGoogle } from "../services/authServices.js";

// Registro normal
export async function register(req, res, next) {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ message: "Usuário registrado com sucesso", user, token });
  } catch (err) {
    next(err);
  }
}

// Login normal
export async function login(req, res, next) {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({ message: "Login bem-sucedido", user, token });
  } catch (err) {
    next(err);
  }
}

// Callback do login via Google
export const googleCallback = async (req, res, next) => {
  try {
    const googleProfile = req.user; // usuário autenticado pelo Passport
    const { user, token } = await loginWithGoogle(googleProfile);
    res.status(200).json({ message: "Login via Google bem-sucedido", user, token });
  } catch (err) {
    next(err);
  }
};

// Falha no login via Google
export const loginFailure = (req, res) => {
  res.status(401).json({ message: "Falha no login com Google" });
};
