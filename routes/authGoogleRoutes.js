import express from "express";
import passport from "../config/passaport.js";
import { googleCallback, loginFailure } from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Inicia o login via Google
 *     tags: [Auth]
 *     description: Redireciona o usuário para a página de login do Google solicitando acesso ao perfil e email.
 *     responses:
 *       302:
 *         description: Redirecionamento para o Google OAuth.
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback do Google OAuth
 *     tags: [Auth]
 *     description: Recebe o retorno do Google após o login e autentica o usuário na aplicação.
 *     responses:
 *       200:
 *         description: Login via Google bem-sucedido, retorna usuário e token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   description: Dados do usuário autenticado
 *                 token:
 *                   type: string
 *                   description: JWT gerado para o usuário
 *       401:
 *         description: Falha no login via Google.
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/failure" }),
  googleCallback
);

/**
 * @swagger
 * /auth/google/failure:
 *   get:
 *     summary: Falha no login via Google
 *     tags: [Auth]
 *     description: Rota chamada quando ocorre erro na autenticação via Google.
 *     responses:
 *       401:
 *         description: Falha no login via Google.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Falha no login com Google"
 */
router.get("/google/failure", loginFailure);

export default router;
