import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "nome email bloco apartamento");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, bloco, apartamento } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { nome, email, telefone, bloco, apartamento },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};
