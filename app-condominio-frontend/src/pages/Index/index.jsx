import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento após login
import Input from "../../components/Input";
import Button from "../../components/Button";
import Nav from "../../components/Menu";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para exibir mensagens de erro
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Resetando erro antes de tentar o login

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazena o token e redireciona para o dashboard
        localStorage.setItem("token", data.token);
        alert("Login bem-sucedido!");
        navigate("/home"); // Altere para a página desejada após login
      } else {
        setError(data.message || "Erro ao fazer login!");
      }
    } catch (error) {
      console.error(error);
      setError("Erro na conexão com o servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <><Nav /><main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Área do Morador</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          {/* E-mail */}
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required />

          {/* Senha */}
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required />

          {/* Mensagem de erro */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Botão de login */}
          <Button
            Text="Entrar"
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded p-2 w-full transition duration-300" />
        </form>

        {/* Link para cadastro */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Ainda não tem conta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </main></>
  );
};

export default Index;
