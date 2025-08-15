import express from "express";
import { workoutExerciseValidationRules, workoutExercisePatchValidationRules, validateWorkoutExercise } from "../middlewares/validation/workoutExercisesValidation.js";
import {validateObjectId} from "../middlewares/validateObjectId.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createWorkoutExercise,
  getAllWorkoutExercises,
  getWorkoutExerciseById,
  updateWorkoutExercise,
  patchWorkoutExercise,
  deleteWorkoutExercise
} from "../controllers/workoutExercisesController.js";

const router = express.Router();

// Todas as rotas protegidas por JWT
router.use(protect);

/**
 * @swagger
 * /workout-exercises:
 *   post:
 *     summary: Cria uma associação treino + exercícios
 *     tags: [WorkoutExercises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - workout
 *               - exercises
 *             properties:
 *               workout:
 *                 type: string
 *                 description: ID do treino
 *               exercises:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     exercise:
 *                       type: string
 *                       description: ID do exercício
 *                     sets:
 *                       type: number
 *                     reps:
 *                       type: number
 *                     weight:
 *                       type: number
 *                     unitWeight:
 *                       type: string
 *                       enum: [kg, g, lb]
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 */
router.post("/", workoutExerciseValidationRules, validateWorkoutExercise, createWorkoutExercise);

/**
 * @swagger
 * /workout-exercises:
 *   get:
 *     summary: Lista todas as associações treino + exercícios
 *     tags: [WorkoutExercises]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de associações
 */
router.get("/", getAllWorkoutExercises);

/**
 * @swagger
 * /workout-exercises/{id}:
 *   get:
 *     summary: Busca uma associação pelo ID
 *     tags: [WorkoutExercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da associação
 *     responses:
 *       200:
 *         description: Associação encontrada
 *       404:
 *         description: Associação não encontrada
 */
router.get("/:id", validateObjectId, getWorkoutExerciseById);

/**
 * @swagger
 * /workout-exercises/{id}:
 *   put:
 *     summary: Substitui toda a associação
 *     tags: [WorkoutExercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da associação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutExercise'
 *     responses:
 *       200:
 *         description: Associação atualizada
 */
router.put("/:id", validateObjectId, workoutExerciseValidationRules, validateWorkoutExercise, updateWorkoutExercise);

/**
 * @swagger
 * /workout-exercises/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma associação
 *     tags: [WorkoutExercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da associação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutExercisePartial'
 *     responses:
 *       200:
 *         description: Associação atualizada parcialmente
 */
router.patch("/:id", validateObjectId, workoutExercisePatchValidationRules, validateWorkoutExercise, patchWorkoutExercise);

/**
 * @swagger
 * /workout-exercises/{id}:
 *   delete:
 *     summary: Deleta uma associação pelo ID
 *     tags: [WorkoutExercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da associação
 *     responses:
 *       200:
 *         description: Associação deletada com sucesso
 *       404:
 *         description: Associação não encontrada
 */
router.delete("/:id", validateObjectId, deleteWorkoutExercise);

export default router;
