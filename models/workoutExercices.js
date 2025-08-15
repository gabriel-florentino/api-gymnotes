import mongoose from "mongoose";

const workoutExerciseSchema = new mongoose.Schema({
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workout",
    required: true,
  },
  exercises: [
    {
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exercises",
        required: true,
      },
      sets: {
        type: Number,
        required: true,
        min: [1, "O número de séries deve ser pelo menos 1"],
      },
      reps: {
        type: Number,
        required: true,
        min: [1, "O número de repetições deve ser pelo menos 1"],
      },
      weight: {
        type: Number,
        min: [0, "Peso não pode ser negativo"],
      },
      unitWeight: {
        type: String,
        enum: ["kg", "g", "lb"],
        default: "kg",
      },
    }
  ],
});

export default mongoose.model("workoutExercise", workoutExerciseSchema);