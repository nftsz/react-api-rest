import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Gallery } from "../lib/types/types";

function GalleryPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery", page],
    queryFn: () =>
      api.get(`/api/v1/gallery/?page=${page}`).then((res) => res.data),
  });

  if (isLoading)
    return <p className="text-center mt-10">Carregando imagens...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Erro ao carregar imagens.
      </p>
    );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Galeria de Imagens</h1>

      <button
        onClick={() => navigate("/gallery/new")}
        className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Nova Imagem
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.results.map((gallery: Gallery) => (
          <div
            key={gallery.id}
            className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer flex flex-col h-full"
            onClick={() => navigate(`/gallery/${gallery.id}`)}
          >
            <img
              src={gallery.image_url}
              alt={gallery.name}
              className="w-full h-40 object-cover rounded mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">{gallery.name}</h3>

            <p className="text-gray-600 flex-grow overflow-hidden">
              {gallery.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={!data.next}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

export default GalleryPage;
