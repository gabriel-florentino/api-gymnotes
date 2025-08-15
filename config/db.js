import mongoose from "mongoose"
import logger from "../utils/logger.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info("Conectado ao banco de dados");
    } catch (error) {
        logger.info("Erro ao conectar ao banco de dados: ", error.message);
        process.exit(1);
    };
};

export default connectDB;