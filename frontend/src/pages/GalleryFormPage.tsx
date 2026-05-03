import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../services/api";

type GalleryFormData = {
  title: string;
  description: string;
  image: string;
};

const schema = yup.object().shape({
  title: yup.string().required("Título obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
  image: yup.string().required("Imagem obrigatória"),
});

function GalleryFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GalleryFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      api.get(`/api/v1/gallery/${id}/`).then((res) => {
        const gallery = res.data;

        setValue("title", gallery.title);
        setValue("description", gallery.description);
        setValue("image", gallery.image);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: GalleryFormData) => {
    try {
      if (id) {
        await api.put(`/api/v1/gallery/${id}/`, data);
      } else {
        await api.post("/api/v1/gallery/", data);
      }

      navigate("/gallery");
    } catch (error) {
      alert(`Erro ao salvar imagem: ${error}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {id ? "Editar Imagem" : "Nova Imagem"}
        </h1>

        <input
          {...register("title")}
          placeholder="Título"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <p className="text-red-500 text-sm mb-2">{errors.title?.message}</p>

        <textarea
          {...register("description")}
          placeholder="Descrição"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <p className="text-red-500 text-sm mb-2">
          {errors.description?.message}
        </p>

        <input
          {...register("image")}
          placeholder="Imagem"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <p className="text-red-500 text-sm mb-4">{errors.image?.message}</p>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          {id ? "Atualizar Imagem" : "Cadastrar Imagem"}
        </button>
      </form>
    </div>
  );
}

export default GalleryFormPage;
