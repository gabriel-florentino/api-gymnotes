import helmet from "helmet"; // Protege headers HTTP
import cors from "cors"; // Controle de acesso por domínio
import rateLimit from "express-rate-limit"; // Limita requisições por IP
//import mongoSanitize from "express-mongo-sanitize"; // Evita injeção de Mongo
import morgan from "morgan"; // Logs de requisições HTTP
import xss from "xss";
import logger from '../utils/logger.js';
/**
 * Este middleware centraliza a segurança.
 * É chamado no server.js passando `app` como parâmetro.
 */

const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") return;

  Object.keys(obj).forEach((key) => {
    // Remove keys com operadores do Mongo
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
      return;
    }

    const val = obj[key];

    if (typeof val === "string") {
      // Escapa strings para evitar XSS
      obj[key] = xss(val);
    } else if (Array.isArray(val)) {
      obj[key] = val.map((v) => (typeof v === "string" ? xss(v) : v));
    } else if (val && typeof val === "object") {
      // Recursão para objetos aninhados
      sanitizeObject(val);
    }
  });
};

export const customSanitizeMiddleware = (req, res, next) => {
  try {
    sanitizeObject(req.body);
    sanitizeObject(req.query);
    sanitizeObject(req.params);
  } catch (error) {
    // Só loga, não quebra a aplicação
    console.error("Sanitize error:", error);
  }
  next();
};

export const securityMiddlewares = (app) => {
  // Protege headers
  app.use(helmet());

  // Configura CORS (libera tudo ou restringe pelo FRONTEND_URL)
  app.use("/auth/register", cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST"]
  }));

  app.use("/auth/login", cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST"]
  }));

  app.use("/exercises", cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"]
  }));

  app.use("/workout", cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"]
  }));

  // Log simples de requisições
  const stream = {
    write: (message) => logger.info(message.trim()),
  };
  app.use(morgan('combined', { stream }));

  // Limita requisições (100 por IP a cada 15 minutos)
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Muitas requisições. Tente mais tarde."
  }));
};
