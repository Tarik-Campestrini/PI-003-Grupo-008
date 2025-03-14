import React, { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null); // Estado para armazenar o usuário em edição

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para deletar usuário
  const deleteUser = async (userId) => {
    try {
      if (!userId) {
        console.error("Erro: ID do usuário não encontrado!");
        alert("Erro ao deletar: ID do usuário não encontrado.");
        return;
      }
  
      console.log("Deletando usuário com ID:", userId);
  
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao deletar usuário");
      }
  
      alert("Usuário deletado com sucesso!");
      window.location.reload(); // Atualiza a página para refletir a exclusão
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert("Erro ao excluir usuário.");
    }
  };

  // Função para abrir o modal de edição
  const openEditModal = (user) => {
    setEditingUser(user);
  };

  // Função para salvar a edição
  const saveEdit = async () => {
    try {
      if (!editingUser || !editingUser._id) {
        console.error("Erro: ID do usuário não encontrado!");
        alert("Erro ao editar: ID do usuário não encontrado.");
        return;
      }
  
      console.log("Enviando atualização para o usuário com ID:", editingUser._id);
  
      const response = await fetch(`http://localhost:5000/api/users/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: editingUser.nome,
          email: editingUser.email,
          telefone: editingUser.telefone,
          bloco: editingUser.bloco,
          apartamento: editingUser.apartamento,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar usuário");
      }
  
      alert("Usuário atualizado com sucesso!");
      window.location.reload(); // Atualiza a página para refletir os dados atualizados
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      alert("Erro ao atualizar usuário.");
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Usuários Cadastrados</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 p-3">Nome</th>
                <th className="border border-gray-300 p-3">E-mail</th>
                <th className="border border-gray-300 p-3">Telefone</th>
                <th className="border border-gray-300 p-3">Bloco</th>
                <th className="border border-gray-300 p-3">Apartamento</th>
                <th className="border border-gray-300 p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="bg-gray-50 hover:bg-gray-200">
                    <td className="border border-gray-300 p-3">{user.nome}</td>
                    <td className="border border-gray-300 p-3">{user.email}</td>
                    <td className="border border-gray-300 p-3">{user.telefone || "Não informado"}</td>
                    <td className="border border-gray-300 p-3">{user.bloco}</td>
                    <td className="border border-gray-300 p-3">{user.apartamento}</td>
                    <td className="border border-gray-300 p-3 flex justify-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border border-gray-300 p-3 text-center">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de edição */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
            <label className="block mb-2">Nome:</label>
            <input
              type="text"
              value={editingUser.nome}
              onChange={(e) => setEditingUser({ ...editingUser, nome: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded mb-2"
            />
            <label className="block mb-2">E-mail:</label>
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded mb-2"
            />
            <label className="block mb-2">Telefone:</label>
            <input
              type="text"
              value={editingUser.telefone || ""}
              onChange={(e) => setEditingUser({ ...editingUser, telefone: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded mb-2"
            />
            <label className="block mb-2">Bloco:</label>
            <input
              type="text"
              value={editingUser.bloco}
              onChange={(e) => setEditingUser({ ...editingUser, bloco: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded mb-2"
            />
            <label className="block mb-2">Apartamento:</label>
            <input
              type="text"
              value={editingUser.apartamento}
              onChange={(e) => setEditingUser({ ...editingUser, apartamento: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
