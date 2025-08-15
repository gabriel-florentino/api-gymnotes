import  mongoose  from "mongoose";

const exercisesSchema = new mongoose.Schema({
    name: {type: String, 
        required: [true,  "O campo 'name' é obrigatório."],
        trim: true
    },
    level: {type: String, 
        enum:{
            values: ['easy', 'medium', 'difficult'], 
            message: "'{VALUE}' não é um valor válido para level" 
        },
        default: 'medium'
    },
})

export default mongoose.model("exercises", exercisesSchema);