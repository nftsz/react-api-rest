import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../services/api";
import type { GalleryFormData } from "../lib/types/types";

const schema = yup.object().shape({
  name: yup.string().required("Título obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
  image_url: yup.string().required("Imagem obrigatória"),
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

        setValue("name", gallery.name);
        setValue("description", gallery.description);
        setValue("image_url", gallery.image_url);
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
    <div className="fixed inset-0 flex items-center justify-center  p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-md w-full max-w-md overflow-hidden"
      >
        <div className="p-6 md:p-8 space-y-5">
          <h1 className="text-2xl font-light text-gray-800 text-center">
            {id ? "Editar Imagem" : "Nova Imagem"}
          </h1>

          <div>
            <input
              {...register("name")}
              placeholder="Título"
              className="w-full px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              {...register("description")}
              placeholder="Descrição"
              rows={4}
              className="w-full px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description?.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("image_url")}
              placeholder="URL da Imagem"
              className="w-full px-4 py-2.5 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition"
            />
            {errors.image_url && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image_url?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded-lg text-sm font-medium transition"
          >
            {id ? "Atualizar Imagem" : "Cadastrar Imagem"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/gallery")}
            className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded-lg text-sm font-medium transition"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default GalleryFormPage;
