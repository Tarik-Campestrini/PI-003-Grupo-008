// Faz a importação das bibliotecas
import mongoose from "mongoose"; 

// Define o esquema do usuário na tabela do BD
const userSchema = new mongoose.Schema({
  nome: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true }, 
  bloco: { type: String, required: true }, 
  apartamento: {type: String, required: true}, 
  telefone: {type: String, required: true} 
});

// Cria um modelo de usuário baseado no esquema do BD
const User = mongoose.model("User", userSchema);

// Exporta o modelo para ser utilizado 
export default User; 