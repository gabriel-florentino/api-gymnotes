import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gym Notes API",
      version: "1.0.0",
      description: "API para gerenciar treinos, exercícios e autenticação de usuários",
    },
    servers: [{ url: process.env.BACKEND_URL }],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["name", "email"],
          properties: {
            _id: { type: "string", example: "64d2c6f3f3f3f3f3f3f3f3f3" },
            name: { type: "string", example: "Gabriel" },
            email: { type: "string", example: "gabriel@email.com" },
            password: { type: "string", example: "hashedpassword" },
          },
        },
        Exercise: {
          type: "object",
          required: ["name", "level"],
          properties: {
            _id: { type: "string", example: "64d2c6f3f3f3f3f3f3f3f3f4" },
            name: { type: "string", example: "Supino" },
            level: { type: "string", enum: ["easy", "medium", "difficult"], example: "medium" },
          },
        },
        Workout: {
          type: "object",
          required: ["core", "startTime"],
          properties: {
            _id: { type: "string", example: "64d2c6f3f3f3f3f3f3f3f3f5" },
            core: { 
              type: "string", 
              enum: ['abs','arms','back','chest','legs','shoulders','biceps','triceps','glutes','core'], 
              example: "chest",
              description: "Núcleo principal do treino"
            },
            coreTwo: { 
              type: "string", 
              enum: ['abs','arms','back','chest','legs','shoulders','biceps','triceps','glutes','core'], 
              example: "triceps",
              description: "Núcleo secundário do treino (opcional)"
            },
            startTime: { type: "string", format: "date-time", example: "2025-08-13T09:00:00.000Z", description: "Data e hora de início do treino" },
            endTime: { type: "string", format: "date-time", example: "2025-08-13T10:30:00.000Z", description: "Data e hora de término do treino (opcional)" },
          },
        },
        WorkoutExercise: {
          type: "object",
          required: ["workout", "exercises"],
          properties: {
            _id: { type: "string", example: "64d2c6f3f3f3f3f3f3f3f3f5" },
            workout: { type: "string", example: "64d2c6f3f3f3f3f3f3f3f3f6" },
            exercises: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  exercise: { type: "string", example: "64d2c6f3f3f3f3f3f3f3f3f7" },
                  sets: { type: "integer", example: 3 },
                  reps: { type: "integer", example: 12 },
                  weight: { type: "number", example: 50 },
                  unitWeight: { type: "string", enum: ["kg","g","lb"], example: "kg" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
