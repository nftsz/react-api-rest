import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function GalleryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: gallery,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gallery", id],
    queryFn: () => api.get(`/api/v1/gallery/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir esta imagem?")) {
      try {
        await api.delete(`/api/v1/gallery/${id}/`);
        navigate("/gallery");
      } catch (error) {
        alert(`Erro ao excluir imagem: ${error}`);
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Carregando imagem...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Erro ao carregar imagem.</p>
    );

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded p-8 space-y-6 text-center">
        <h1 className="text-3xl font-bold">Detalhes da Imagem</h1>

        {gallery.image && (
          <div className="flex justify-center">
            <img
              src={gallery.image}
              alt={gallery.title}
              className="w-full max-w-lg h-auto object-contain rounded"
            />
          </div>
        )}

        <h2 className="text-2xl font-semibold">{gallery.title}</h2>

        <p className="text-gray-700">{gallery.description}</p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => navigate(`/gallery/${gallery.id}/edit`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Editar Imagem
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Excluir Imagem
          </button>

          <button
            onClick={() => navigate("/gallery")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryDetailPage;
