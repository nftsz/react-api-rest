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
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Imagem - lado esquerdo */}
          {gallery.image_url && (
            <div className="md:w-2/5 bg-gray-100">
              <div className="aspect-square w-full">
                <img
                  src={gallery.image_url}
                  alt={gallery.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Conteúdo - lado direito */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl text-gray-700 font-bold mb-4">
                {gallery.name}
              </h1>

              <p className="text-gray-700 leading-relaxed mb-6">
                {gallery.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate(`/gallery/${gallery.id}/edit`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition text-sm font-medium"
              >
                Editar Imagem
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded transition text-sm font-medium"
              >
                Excluir Imagem
              </button>

              <button
                onClick={() => navigate("/gallery")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded transition text-sm font-medium"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryDetailPage;
