/* eslint-disable no-unused-vars */
import User from "@/models/User";
import bcrypt from "bcryptjs";
import conect from "@/utils/db";

export async function POST(req) {
  try {
    const { nome, email, password, bloco, apartamento, telefone } = await req.json();

    await conect();

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return new Response(
        JSON.stringify({ message: "E-mail já cadastrado!", status: 409 }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
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

    return new Response(
      JSON.stringify({ message: "Usuário criado com sucesso!", status: 201 }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

    

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao cadastrar usuário", status: 500 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
