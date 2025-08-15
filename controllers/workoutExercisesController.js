import WorkoutExercise from "../models/workoutExercices.js"; // nome do arquivo certinho
import logger from "../utils/logger.js";

// Criar um novo WorkoutExercise (treino + exercícios)
export const createWorkoutExercise = async (req, res, next) => {
  try {
    const newWorkoutExercise = await WorkoutExercise.create(req.body);
    logger.info(`WorkoutExercise criado: ${newWorkoutExercise._id}`);
    res.status(201).json(newWorkoutExercise);
  } catch (error) {
    logger.error(`Erro ao criar WorkoutExercise: ${error.message}`);
    next(error);
  }
};

// Listar todos os WorkoutExercises, com dados populados
export const getAllWorkoutExercises = async (req, res, next) => {
  try {
    const allWorkoutExercises = await WorkoutExercise.find()
      .populate("workout")
      .populate("exercises.exercise"); // Assumindo que o array é chamado 'exercises' e tem ref 'exercise'
    logger.info(`WorkoutExercises listados`);
    res.status(200).json(allWorkoutExercises);
  } catch (error) {
    logger.error(`Erro ao listar WorkoutExercises: ${error.message}`);
    next(error);
  }
};

// Buscar WorkoutExercise por ID
export const getWorkoutExerciseById = async (req, res, next) => {
  try {
    const workoutExercise = await WorkoutExercise.findById(req.params.id)
      .populate("workout")
      .populate("exercises.exercise");
    if (!workoutExercise) {
      const e = new Error("WorkoutExercise não encontrado");
      e.statusCode = 404;
      throw e;
    }
    logger.info(`WorkoutExercise listado: ${workoutExercise._id}`);
    res.status(200).json(workoutExercise);
  } catch (error) {
    logger.error(`Erro ao buscar WorkoutExercise: ${error.message}`);
    next(error);
  }
};

// Substituir todo o documento WorkoutExercise (PUT)
export const updateWorkoutExercise = async (req, res, next) => {
  try {
    const updatedWorkoutExercise = await WorkoutExercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedWorkoutExercise) {
      const e = new Error("WorkoutExercise não encontrado para update");
      e.statusCode = 404;
      throw e;
    }
    logger.info(`WorkoutExercise atualizado: ${updatedWorkoutExercise._id}`);
    res.status(200).json(updatedWorkoutExercise);
  } catch (error) {
    logger.error(`Erro ao atualizar WorkoutExercise: ${error.message}`);
    next(error);
  }
};

// Atualização parcial (PATCH) — só os campos enviados
export const patchWorkoutExercise = async (req, res, next) => {
  try {
    const patchedWorkoutExercise = await WorkoutExercise.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!patchedWorkoutExercise) {
      const e = new Error("WorkoutExercise não encontrado para patch");
      e.statusCode = 404;
      throw e;
    }
    logger.info(`WorkoutExercise alterado parcialmente: ${patchedWorkoutExercise._id}`);
    res.status(200).json(patchedWorkoutExercise);
  } catch (error) {
    logger.error(`Erro ao alterar parcialmente WorkoutExercise: ${error.message}`);
    next(error);
  }
};

// Deletar WorkoutExercise por ID
export const deleteWorkoutExercise = async (req, res, next) => {
  try {
    const deletedWorkoutExercise = await WorkoutExercise.findByIdAndDelete(req.params.id);
    if (!deletedWorkoutExercise) {
      const e = new Error("WorkoutExercise não encontrado para delete");
      e.statusCode = 404;
      throw e;
    }
    logger.info(`WorkoutExercise deletado: ${deletedWorkoutExercise._id}`);
    res.status(200).json(deletedWorkoutExercise);
  } catch (error) {
    logger.error(`Erro ao deletar WorkoutExercise: ${error.message}`);
    next(error);
  }
};
