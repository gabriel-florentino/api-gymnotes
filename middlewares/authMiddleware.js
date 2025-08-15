import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_supersecreto';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Não autorizado, token ausente' });
  }

  const token = authHeader.split(' ')[1];

  try {
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = { id: decoded.id }; // trocar decoded.userId por decoded.id
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

