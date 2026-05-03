import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../lib/context/AuthContext";
import type { LoginFormInputs } from "../lib/types/types";

const schema = yup.object().shape({
  username: yup.string().required("Usuário obrigatório"),
  password: yup
    .string()
    .min(5, "Mínimo 5 caracteres")
    .required("Senha obrigatória"),
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.username, data.password);
      navigate("/gallery/");
    } catch (error) {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Bem Vindo(a)</h1>

            <p className="text-gray-500 text-sm">
              Faça login para acessar sua galeria
            </p>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuário
            </label>

            <input
              {...register("username")}
              placeholder="Digite seu usuário"
              className="text-gray-700 w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <p className="text-red-500 text-sm mt-2">
              {errors.username?.message}
            </p>
          </div>

          <div className="mb-7">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>

            <input
              {...register("password")}
              type="password"
              placeholder="Digite sua senha"
              className="text-gray-700 w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <p className="text-red-500 text-sm mt-2">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition duration-200 shadow-md"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-gray-400 mt-6">
            Galeria de Imagens
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
