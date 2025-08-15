import mongoose from "mongoose";

const validCores = ['abs', 'arms', 'back', 'chest', 'legs', 'shoulders', 'biceps', 'triceps', 'glutes', 'core'];

const workoutSchema = new mongoose.Schema({
  core: {
    type: String,
    required: [true, "O campo core é obrigatório"],
    enum: {
      values: validCores,
      message: "'{VALUE}' não é um valor válido para Núcleo do treino."
    }
  },
  coreTwo: {
    type: String,
    enum: {
      values: validCores,
      message: "'{VALUE}' não é um valor válido para Núcleo do treino."
    }
  },
  startTime: {
    type: Date,
    required: [true, "Data e hora de início são obrigatórias"]
  },
  endTime: {type: Date,},
});

export default mongoose.model("workout", workoutSchema);
