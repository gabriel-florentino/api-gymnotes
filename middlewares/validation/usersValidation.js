import { body, validationResult } from "express-validator";

export const usersValidationRulesRegister = [
  body('name').
  notEmpty().
  withMessage('Nome é obrigatório'),

  body('email').
  isEmail().
  withMessage('Email inválido'),

  body('password').
  isLength({ min: 4 }).
  notEmpty().
  withMessage('Senha deve ter no mínimo 4 caracteres')
]

export const usersValidationRulesLogin = [
  body('email').
  isEmail().
  withMessage('Email inválido'),

  body('password').
  isLength({ min: 4 }).
  notEmpty().
  withMessage('Senha deve ter no mínimo 4 caracteres')
]


export const validateUsers = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
