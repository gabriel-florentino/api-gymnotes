import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js"; //Conecção BD
import exercisesRoutes from "./routes/exercisesRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js"
import workoutExercisesRoutes from "./routes/workoutExercisesRoutes.js"
import errorHandler from "./middlewares/errorHandler.js";
import { securityMiddlewares, customSanitizeMiddleware} from "./middlewares/security.js"
import logger from './utils/logger.js';
import authRoutes from './routes/authRoutes.js';

import session from "express-session";
import passport from "./config/passaport.js";
import authGoogleRoutes from "./routes/authGoogleRoutes.js";

import { swaggerDocs } from "./config/swagger.js";


const app = express();

dotenv.config();
connectDB(); //Faz a conecção com DB

app.use(express.json());

app.use(customSanitizeMiddleware);
securityMiddlewares(app);

app.use(
  session({
    secret: process.env.JWT_SECRET || "chave-secreta",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use('/exercises', exercisesRoutes);
app.use('/workout', workoutRoutes);
app.use('/go-workout', workoutExercisesRoutes);
app.use('/auth', authRoutes);
app.use('/auth', authGoogleRoutes);

app.use(errorHandler);

  // Capturar erros não tratados (opcional, mas recomendado)
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception: ' + err.message);
    process.exit(1); // ou tente algum recover
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection: ' + reason);
    // depende do caso, pode finalizar o processo ou não
  });

swaggerDocs(app);

app.listen(process.env.PORT, () => {
    logger.info('Servidor iniciado na porta ' + process.env.PORT);
});