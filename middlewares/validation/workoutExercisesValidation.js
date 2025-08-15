import { body, validationResult } from "express-validator";

export const workoutExerciseValidationRules = [
  body("workout")
    .notEmpty()
    .withMessage("workout (ID do treino) é obrigatório")
    .isMongoId()
    .withMessage("workout deve ser um ID Mongo válido"),

  body("exercises")
    .isArray({ min: 1 })
    .withMessage("exercises deve ser um array com pelo menos um exercício"),

  // validação para cada exercício dentro do array
  body("exercises.*.exercise")
    .notEmpty()
    .withMessage("exercise (ID do exercício) é obrigatório")
    .isMongoId()
    .withMessage("exercise deve ser um ID Mongo válido"),

  body("exercises.*.sets")
    .notEmpty()
    .withMessage("sets é obrigatório")
    .isInt({ min: 1 })
    .withMessage("sets deve ser um inteiro maior que zero"),

  body("exercises.*.reps")
    .notEmpty()
    .withMessage("reps é obrigatório")
    .isInt({ min: 1 })
    .withMessage("reps deve ser um inteiro maior que zero"),

  body("exercises.*.weight")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("weight deve ser um número maior ou igual a zero"),

  body("exercises.*.unitWeight")
    .optional()
    .isIn(["kg", "g", "lb"])
    .withMessage("unitWeight inválido"),
];

export const workoutExercisePatchValidationRules = [
  body("workout")
    .optional()
    .isMongoId()
    .withMessage("workout deve ser um ID Mongo válido"),

  body("exercises")
    .optional()
    .isArray()
    .withMessage("exercises deve ser um array"),

  body("exercises.*.exercise")
    .optional()
    .isMongoId()
    .withMessage("exercise deve ser um ID Mongo válido"),

  body("exercises.*.sets")
    .optional()
    .isInt({ min: 1 })
    .withMessage("sets deve ser inteiro maior que zero"),

  body("exercises.*.reps")
    .optional()
    .isInt({ min: 1 })
    .withMessage("reps deve ser inteiro maior que zero"),

  body("exercises.*.weight")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("weight deve ser número maior ou igual a zero"),

  body("exercises.*.unitWeight")
    .optional()
    .isIn(["kg", "g", "lb"])
    .withMessage("unitWeight inválido"),
];


export const validateWorkoutExercise = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
