/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/auth"; // Importando o contexto de autenticação

export default function Register() {
  const [error, setError] = useState("");
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const initialValues = {
    nome: "",
    email: "",
    password: "",
    bloco: "",
    apartamento: "",
    telefone: ""
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("O campo Nome é obrigatório"),
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O campo E-mail é obrigatório"),
    password: Yup.string().required("O campo Senha é obrigatório"),
  });

  async function handleSubmit(values, { resetForm }) {
    setFormSubmitting(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const result = await response.json();

      if  (response.status === 201) {
        alert(result.message);
        navigate("/");
      } else {
        renderError(result.message);
        resetForm();
      }
      setFormSubmitting(false);
    } catch (error) {
      setFormSubmitting(false);
      renderError("Erro ao criar conta, tente mais tarde!");
    }
  }

  function renderError(msg) {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 3000);
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            noValidate
            className="flex flex-col gap-2 p-4 border rounded border-zinc-300 min-w-[300px] bg-white"
          >
            {/* Nome */}
            <Field name="nome" type="text" placeholder="Nome" className="border border-gray-300 rounded p-2" />
            <ErrorMessage name="nome" component="span" className="text-red-500 text-sm" />

            {/* E-mail */}
            <Field name="email" type="email" placeholder="E-mail" className="border border-gray-300 rounded p-2" />
            <ErrorMessage name="email" component="span" className="text-red-500 text-sm" />

            {/* Senha */}
            <Field name="password" type="password" placeholder="Senha" className="border border-gray-300 rounded p-2" />
            <ErrorMessage name="password" component="span" className="text-red-500 text-sm" />

            {/* Bloco */}
            <Field name="bloco" type="text" placeholder="Bloco" className="border border-gray-300 rounded p-2" />
            <ErrorMessage name="bloco" component="span" className="text-red-500 text-sm" />

            {/* Apartamento */}
            <Field name="apartamento" type="text" placeholder="Apartamento" className="border border-gray-300 rounded p-2" />
            <ErrorMessage name="apartamento" component="span" className="text-red-500 text-sm" />

            {/* Telefone */}
            <Field name="telefone" type="text" placeholder="Telefone" className="border border-gray-300 rounded p-2" />
            <ErrorMessage name="telefone" component="span" className="text-red-500 text-sm" />

            {/* Botão de inscrição */}
            <Button
              type="submit"
              Text={isSubmitting ? "Carregando..." : "Inscrever-se"} 
              disabled={isSubmitting}
              className="bg-blue-500 text-white rounded p-2 cursor-pointer"
            />

            {/* Mensagem de erro geral */}
            {error && <span className="text-red-500 text-sm text-center">{error}</span>}

            <span className="text-xs text-zinc-500">
              Já possui uma conta?
              <strong className="text-zinc-700">
                <Link to="/login"> Entrar</Link>
              </strong>
            </span>
          </Form>
        )}
      </Formik>
    </main>
  );
}
