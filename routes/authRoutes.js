import express from 'express';
import { usersValidationRulesLogin, usersValidationRulesRegister, validateUsers } from "../middlewares/validation/usersValidation.js";
import { register, login } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     description: Cria um usuário com email, nome e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gabriel
 *               email:
 *                 type: string
 *                 example: gabriel@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário registrado com sucesso
 *                 user:
 *                   type: object
 *                   description: Dados do usuário registrado
 *       401:
 *         description: Senha inválida
 *       409:
 *         description: Usuário já existe
 */
router.post('/register', usersValidationRulesRegister, validateUsers, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Auth]
 *     description: Autentica usuário com email e senha e retorna token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: gabriel@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login bem-sucedido
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 *                   description: JWT do usuário
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/login', usersValidationRulesLogin, validateUsers, login);

export default router;
