import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { nome, email, password, bloco, apartamento, telefone } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "E-mail já cadastrado!" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({ nome, email, password: hashedPassword, bloco, apartamento, telefone });

    await newUser.save();
    return res.status(201).json({ message: "Usuário criado com sucesso!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        bloco: user.bloco,
        apartamento: user.apartamento,
        telefone: user.telefone,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
};
