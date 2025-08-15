import Workout from "../models/workout.js";
import logger from "../utils/logger.js";


export const createWorkout = async (req, res, next) => {
  try {
    const newWorkout = await Workout.create(req.body);
    logger.info(`Treino criado: ${newWorkout._id}`);
    res.status(201).json(newWorkout);
  } catch (error) {
    logger.error(`Erro ao criar Treino: ${error.message}`);
    next(error);
  }
};

export const allWorkout = async (req, res, next) => {
  try {
    const allWorkouts = await Workout.find();
    logger.info(`Treinos listados`);
    res.status(201).json(allWorkouts);
  } catch (error) {
    logger.error(`Erro ao listar treinos: ${error.message}`);
    next(error);
  }
};

export const workouts = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);
    logger.info(`Treino listado: ${workout._id}`);
    res.status(201).json(workout);
  } catch (error) {
    logger.error(`Erro ao listar treino: ${error.message}`);
    next(error);
  }
};

export const changeWorkout = async (req, res, next) => {
  try {
    const changeWorkout = await Workout.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    logger.info(`Treino alterado: ${changeWorkout._id}`);
    res.status(201).json(changeWorkout);
  } catch (error) {
    logger.error(`Erro ao alterar treino: ${error.message}`);
    next(error);
  }
};

export const deleteWorkout = async (req, res, next) => {
    try {
        const deleteWorkout = await Workout.findByIdAndDelete(req.params.id);
        logger.info(`Treino deletado: ${deleteWorkout._id}`);
        res.status(201).json(deleteWorkout);
    } catch (error) {
      logger.error(`Erro ao deletar treino: ${error.message}`);
        next(error); 
    }
};

export const changeParcialWorkout = async (req, res, next) => {
  try {
    const changeParcialWorkout = await Workout.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    logger.info(`Treino alterado parcialmente: ${changeParcialWorkout._id}`);
    res.status(201).json(changeParcialWorkout);
  } catch (error) {
    logger.error(`Erro ao alterar parcialmente o treino: ${error.message}`);
    next(error);
  }
};