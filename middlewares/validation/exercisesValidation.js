import { body, validationResult } from "express-validator";

export const exercisesValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nome é obrigatório"),

  body("level")
    .optional()
    .isIn(["easy","medium","difficult"])
    .withMessage("level inválido"),
];

export const validateExercises = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
