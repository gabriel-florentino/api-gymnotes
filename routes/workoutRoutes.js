import express from "express";
import { workoutValidationRules, patchWorkoutValidationRules, validateWorkout } from "../middlewares/validation/workoutValidation.js"
import { validateObjectId } from "../middlewares/validateObjectId.js"
import { protect } from "../middlewares/authMiddleware.js";
import {
    createWorkout, 
    allWorkout, 
    workouts,
    changeWorkout, 
    deleteWorkout,
    changeParcialWorkout
} from "../controllers/workoutController.js"

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Endpoints para gerenciar treinos
 */

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Cria um novo treino
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       201:
 *         description: Treino criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Erro de validação
 */
router.post("/", workoutValidationRules, validateWorkout, createWorkout);

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Lista todos os treinos
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de treinos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Workout'
 */
router.get("/", allWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Busca um treino pelo ID
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do treino
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Treino encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Treino não encontrado
 */
router.get("/:id", validateObjectId, workouts);

/**
 * @swagger
 * /workouts/{id}:
 *   put:
 *     summary: Atualiza todo o treino
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do treino
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: Treino atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Treino não encontrado
 */
router.put("/:id", validateObjectId, workoutValidationRules, validateWorkout, changeWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   patch:
 *     summary: Atualiza parcialmente o treino
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do treino
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutPatch'
 *     responses:
 *       200:
 *         description: Treino atualizado parcialmente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Treino não encontrado
 */
router.patch("/:id", validateObjectId, patchWorkoutValidationRules, validateWorkout, changeParcialWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Deleta um treino
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do treino
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Treino deletado com sucesso
 *       404:
 *         description: Treino não encontrado
 */
router.delete("/:id", validateObjectId, deleteWorkout);

export default router;
