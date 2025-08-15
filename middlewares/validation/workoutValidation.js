import { body, validationResult } from "express-validator";

export const workoutValidationRules = [
  body("core")
    .notEmpty()
    .withMessage("O campo core é obrigatório")
    .isIn(['abs', 'arms', 'back', 'chest', 'legs', 'shoulders', 'biceps', 'triceps', 'glutes', 'core'])
    .withMessage("core inválido"),

  body("coreTwo")
    .optional()
    .isIn(['abs', 'arms', 'back', 'chest', 'legs', 'shoulders', 'biceps', 'triceps', 'glutes', 'core'])
    .withMessage("coreTwo inválido"),

  body("startTime")
    .notEmpty()
    .withMessage("startTime é obrigatório")
    .isISO8601()
    .withMessage("startTime deve ser uma data válida"),

  body("endTime")
    .optional()
    .isISO8601()
    .withMessage("endTime deve ser uma data válida"),
];

export const patchWorkoutValidationRules = [
  body("core")
    .optional()
    .isIn(['abs', 'arms', 'back', 'chest', 'legs', 'shoulders', 'biceps', 'triceps', 'glutes', 'core'])
    .withMessage("core inválido"),

  body("coreTwo")
    .optional()
    .isIn(['abs', 'arms', 'back', 'chest', 'legs', 'shoulders', 'biceps', 'triceps', 'glutes', 'core'])
    .withMessage("coreTwo inválido"),

  body("startTime")
    .optional()
    .isISO8601()
    .withMessage("startTime deve ser uma data válida"),

  body("endTime")
    .optional()
    .isISO8601()
    .withMessage("endTime deve ser uma data válida"),
];

export const validateWorkout = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
