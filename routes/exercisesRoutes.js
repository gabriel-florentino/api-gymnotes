import express from "express";
import {exercisesValidationRules, validateExercises } from "../middlewares/validation/exercisesValidation.js";
import {validateObjectId} from "../middlewares/validateObjectId.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
    createExercise, 
    allExercises, 
    exercise,
    changeExercise, 
    deleteExercise,
    changeParcialExercise
} from "../controllers/exercisesController.js";

const router = express.Router();

// Protege todas as rotas com autenticação
router.use(protect);

/**
 * @swagger
 * /exercises:
 *   post:
 *     summary: Cria um novo exercício
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Supino
 *               level:
 *                 type: string
 *                 enum: [easy, medium, difficult]
 *                 example: medium
 *     responses:
 *       201:
 *         description: Exercício criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post("/", exercisesValidationRules, validateExercises, createExercise);

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Lista todos os exercícios
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de exercícios
 */
router.get("/", allExercises);

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Busca um exercício pelo ID
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do exercício
 *     responses:
 *       200:
 *         description: Exercício encontrado
 *       404:
 *         description: Exercício não encontrado
 */
router.get("/:id", validateObjectId, exercise);

/**
 * @swagger
 * /exercises/{id}:
 *   put:
 *     summary: Substitui totalmente um exercício
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do exercício
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               level:
 *                 type: string
 *                 enum: [easy, medium, difficult]
 *     responses:
 *       200:
 *         description: Exercício atualizado com sucesso
 */
router.put("/:id", validateObjectId, exercisesValidationRules, validateExercises, changeExercise);

/**
 * @swagger
 * /exercises/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um exercício
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do exercício
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               level:
 *                 type: string
 *                 enum: [easy, medium, difficult]
 *     responses:
 *       200:
 *         description: Exercício atualizado parcialmente com sucesso
 */
router.patch("/:id", validateObjectId, exercisesValidationRules, validateExercises, changeParcialExercise);

/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     summary: Deleta um exercício pelo ID
 *     tags: [Exercises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do exercício
 *     responses:
 *       200:
 *         description: Exercício deletado com sucesso
 *       404:
 *         description: Exercício não encontrado
 */
router.delete("/:id", validateObjectId, deleteExercise);

export default router;
