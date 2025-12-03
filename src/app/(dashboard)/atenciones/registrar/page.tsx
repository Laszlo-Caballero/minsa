"use client";

import { CardCita } from "@/componentes/ui/card-cita/CardCita";
import { ModalAtencion } from "@/componentes/ui/modal-atencion/ModalAtencion";
import { ENV } from "@/config/env";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@/hooks/useQuery";
import { Cita, ResponseApi } from "@/interfaces/response.interfaces";
import axios from "axios";
import { useState } from "react";

export default function AtencionPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCitaId, setSelectedCitaId] = useState<number | null>(null);

  const { user } = useAuth();
  const {
    isLoading,
    data: citas,
    refetch,
  } = useQuery<ResponseApi<Cita[]>>({
    queryFn: async () => {
      if (!user) return;

      const url = new URL(
        `${ENV.API_URL}/citas/asginadas/${user?.obstetra.IdObstetra}`
      );
      if (search) {
        url.searchParams.append("search", search);
      }
      const res = await axios.get(url.toString());
      return res.data;
    },
    dependencies: [search, user],
  });

  const handleGenerarAtencion = (cita: Cita) => {
    setSelectedCitaId(cita.citaId);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    refetch();
  };

  return (
    <div className="w-full h-full bg-linea flex flex-col p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-xl">Registrar Atención</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 border border-SubtituloGris mb-6">
        <input
          type="text"
          placeholder="Buscar por paciente..."
          className="w-full outline-none text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando citas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {citas?.data?.map((cita) => (
            <CardCita
              key={cita.citaId}
              cita={cita}
              onGenerarAtencion={handleGenerarAtencion}
            />
          ))}
          {citas?.data?.length === 0 && (
            <div className="col-span-full flex justify-center items-center h-32 text-gray-500">
              No hay citas asignadas pendientes.
            </div>
          )}
        </div>
      )}

      <ModalAtencion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        citaId={selectedCitaId}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
