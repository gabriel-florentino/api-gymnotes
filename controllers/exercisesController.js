import exercises from "../models/exercises.js";
import logger from "../utils/logger.js";


export const createExercise = async (req, res, next) => {
  try {
    const newExercise = await exercises.create(req.body);
    logger.info(`Exercício criado: ${newExercise._id}`);
    res.status(201).json(newExercise);
  } catch (error) {
    logger.error(`Erro ao criar exercício: ${error.message}`);
    next(error);
  }
};

export const allExercises = async (req, res, next) => {
  try {
    const allExercises = await exercises.find();
    logger.info(`Exercícios listados`);
    res.status(201).json(allExercises);
  } catch (error) {
    logger.error(`Erro ao listar exercícios: ${error.message}`);
    next(error);
  }
};

export const exercise = async (req, res, next) => {
  try {
    const exercise = await exercises.findById(req.params.id);
    logger.info(`Exercício listado: ${exercise._id}`);
    res.status(201).json(exercise);
  } catch (error) {
    logger.error(`Erro ao listar exercício: ${error.message}`);
    next(error);
  }
};

export const changeExercise = async (req, res, next) => {
  try {
    const changeExercise = await exercises.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    logger.info(`Exercício alterado: ${changeExercise._id}`);
    res.status(201).json(changeExercise);
  } catch (error) {
    logger.error(`Erro ao alterar exercício: ${error.message}`);
    next(error);
  }
};

export const deleteExercise = async (req, res, next) => {
    try {
        const deleteExercise = await exercises.findByIdAndDelete(req.params.id);
        logger.info(`Exercício alterado: ${deleteExercise._id}`);
        res.status(201).json(deleteExercise);
    } catch (error) {
      logger.error(`Erro ao deletar exercício: ${error.message}`);
        next(error); 
    }
};

export const changeParcialExercise = async (req, res, next) => {
  try {
    const changeExercise = await exercises.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    logger.info(`Exercício alterado parcialmente: ${changeExercise._id}`);
    res.status(201).json(changeExercise);
  } catch (error) {
    logger.error(`Erro ao alterar parcialmente o exercício: ${error.message}`);
    next(error);
  }
};