import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "@/components/ui/table";

export default function ListaEntregas() {
    const [entregas, setEntregas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedEntrega, setSelectedEntrega] = useState(null);
    const [formData, setFormData] = useState({ descricao: "", status: "pendente", dataEntrega: "", userId: "" });

    useEffect(() => {
        axios.get("/api/entregas")
            .then(response => {
                setEntregas(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar entregas", error);
                setLoading(false);
            });
    }, []);

    const openModal = (type, entrega = null) => {
        setModalType(type);
        setSelectedEntrega(entrega);
        setFormData(entrega ? { descricao: entrega.descricao, status: entrega.status, dataEntrega: entrega.dataEntrega, userId: entrega.userId } : { descricao: "", status: "pendente", dataEntrega: "", userId: "" });
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedEntrega(null);
        setFormData({ descricao: "", status: "pendente", dataEntrega: "", userId: "" });
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6 border border-gray-300">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-center flex-1">Lista de Entregas</h1>
                    <button onClick={() => openModal("cadastrar")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-auto">Cadastrar</button>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="text-center">Carregando...</p>
                    ) : (
                        <Table className="w-full border border-gray-300 rounded-lg">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Nome</th>
                                    <th className="px-4 py-3 text-left">Apartamento</th>
                                    <th className="px-4 py-3 text-left">Bloco</th>
                                    <th className="px-4 py-3 text-left">Telefone</th>
                                    <th className="px-4 py-3 text-left">Descrição</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Data da Entrega</th>
                                    <th className="px-4 py-3 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-gray-50">
                                {entregas.map((entrega) => (
                                    <tr key={entrega._id} className="hover:bg-gray-100">
                                        <td className="px-4 py-3 whitespace-nowrap">{entrega.userId?.nome || "Não informado"}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{entrega.userId?.apartamento || "Não informado"}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{entrega.userId?.bloco || "Não informado"}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{entrega.userId?.telefone || "Não informado"}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{entrega.descricao}</td>
                                        <td className="px-4 py-3 whitespace-nowrap capitalize text-blue-600 font-medium">{entrega.status}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{new Date(entrega.dataEntrega).toLocaleDateString("pt-BR")}</td>
                                        <td className="px-4 py-3 flex gap-2">
                                            <button onClick={() => openModal("editar", entrega)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
                                            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </div>
            </div>
        </main>
    );
}