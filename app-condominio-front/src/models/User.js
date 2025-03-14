import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: { type: Number, unique: true }, // ID auto-incrementável
    nome: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bloco: { type: String, required: true },
    apartamento: { type: String, required: true },
    telefone: { type: String, required: true },
  },
  { timestamps: true }
);

// Aplicando o auto-incremento no campo "id"
userSchema.plugin(AutoIncrement, { inc_field: "id" });

const User = mongoose.model("User", userSchema);

export default User;