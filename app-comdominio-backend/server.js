import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./src/models/User.js";

const app = express();
app.use(cors());
app.use(express.json()); // Para processar JSON no corpo da requisição

// Conectar ao MongoDB
mongoose.connect("mongodb+srv://root:root2023@app-condominio.az6qe.mongodb.net/app_condominio?retryWrites=true&w=majority&appName=app-condominio"
, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Rota de registro
app.post("/api/auth/register", async (req, res) => {
  try {
    const { nome, email, password, bloco, apartamento, telefone } = req.body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(409).json({ message: "E-mail já cadastrado!" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
      nome,
      email,
      password: hashedPassword,
      bloco,
      apartamento,
      telefone,
    });

    await newUser.save();
    return res.status(201).json({ message: "Usuário criado com sucesso!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

// Rota de login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    // Compara a senha enviada com a senha armazenada no banco
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta!" });
    }

    // Caso o login seja bem-sucedido, retorna os dados do usuário (exceto a senha)
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
});

// ROTA PARA BUSCAR USUÁRIOS
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "nome email bloco apartamento"); // Pegando apenas os campos necessários
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});

// ROTA PARA ATUALIZAR USUÁRIOS
app.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, bloco, apartamento } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { nome, email, telefone, bloco, apartamento },
      { new: true } // Retorna o usuário atualizado
    );

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
});

// ROTA PARA DELETAR USUÁRIO
app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o usuário existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Deleta o usuário
    await User.findByIdAndDelete(id);

    res.json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});


// Iniciar servidor na porta 5000
app.listen(5000, () => {
  console.log("Backend rodando na porta 5000");
});
