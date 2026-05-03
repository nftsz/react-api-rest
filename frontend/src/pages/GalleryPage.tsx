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
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-base font-bold text-white-800">Galeria de Imagens</h1>
        
        <button
          onClick={() => navigate("/gallery/new")}
          className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full text-sm transition duration-300"
        >
          + Nova Imagem
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.results.map((gallery: Gallery) => (
          <div
            key={gallery.id}
            className="group cursor-pointer"
            onClick={() => navigate(`/gallery/${gallery.id}`)}
          >
            {/* imagem quadrada */}
            <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={gallery.image_url}
                alt={gallery.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            
            {/* Conteúdo do card */}
            <div className="mt-3">
              <h3 className="text-xl font-medium text-white-900 truncate">
                {gallery.name}
              </h3>
              
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {gallery.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação minimalista */}
      <div className="flex justify-center items-center gap-3 mt-12">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Anterior
        </button>
        
        <span className="text-sm text-gray-600">
          Página {page}
        </span>
        
        <button
          onClick={() => setPage(page + 1)}
          disabled={!data.next}
          className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

export default GalleryPage;
