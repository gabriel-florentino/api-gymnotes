import logger from "../utils/logger.js";

export default (err, req, res, next) => {
  logger.error(`Erro: ${err.message} - URL: ${req.originalUrl} - Method: ${req.method}`);

  // Se já tiver um status no erro, usa, senão 500 (erro interno)
  const statusCode = err.statusCode || 500;

  // Mensagem customizada ou genérica
  const message = err.message || "Erro interno no servidor";

  // Se for erro de validação sdo mongoose, por exemplo
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Erro de validação",
      details: err.errors // objeto com campos e mensagens
    });
  }

  // Erro de cast inválido no mongoose (ex: id errado)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      error: `ID inválido: ${err.value}`
    });
  }


  // Erros customizados (ex: criado com `const e = new Error("msg"); e.statusCode = 404; throw e;`)
  return res.status(statusCode).json({
    error: message
  });
};
