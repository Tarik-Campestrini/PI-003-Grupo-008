import React, { useState } from "react";
import './style.css'

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login com: ${email}`);
  };
  return (

    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Condomínio Elizabeth</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="/">Login</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </nav>
      </header>

      {/* Formulário de Login */}
      <section className="login-section">
        <h2>Área do Morador</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </section>


      {/* Contato */}
      <section id="contact" className="section">
        <h2>Entre em Contato</h2>
        <p>Telefone: (xx) xxxxxxx | Email: xxxxx@xxxxxx.com</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Condomínio Elizabeth - Todos os direitos reservados.
      </footer>
    </div>

  );
};


export default Index;