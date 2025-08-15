import mongoose from "mongoose";

/**
 * Este middleware checa se o `:id` que vem na URL é um ObjectId válido do MongoDB.
 * - Se não for válido, retorna 400 sem nem chamar o banco.
 * - Se for válido, chama next() para seguir.
 */
export const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  next();
};
