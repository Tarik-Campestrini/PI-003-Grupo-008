// Faz a importação 
import User from "../models/User.js"; 

// Função Buscar todos os usuários do Banco de Dados
export const getUsers = async (req, res) => {
  try {
    // Busca apenas os campos necessários
    const users = await User.find({}, "nome email bloco apartamento"); 
    res.json(users);
  } catch (error) {

    // Retorna um erro 500 caso falha
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

// Função para atualizar um usuário pelo ID
export const updateUser = async (req, res) => {

  // Tray/Catch para tratar erros
  try {

    // Pega a informações do usuario no Frontend
    const { id } = req.params;
    const { nome, email, telefone, bloco, apartamento } = req.body;

    // Faz a atualização do usuario no Banco de Dados
    const user = await User.findByIdAndUpdate(
      id,
      { nome, email, telefone, bloco, apartamento },
      { new: true }
    );

    // Retorna um erro 404 caso não encontre o usuario
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Retorna um erro 500 caso a atualização apresente falha
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

// Função para deletar um usuário
export const deleteUser = async (req, res) => {

  // Tray/Catch para tratar erros
  try {

    // Pega a informações do usuario no Frontend
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      // Retorna um erro 404 caso não encontre o usuario
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Deleta usuario do Banco de dados
    await User.findByIdAndDelete(id);
    res.json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    // Retorna um erro caso não delete o usuario
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};
