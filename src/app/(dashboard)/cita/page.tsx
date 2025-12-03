"use client";
import Modal from "@/componentes/ui/modal/Modal";
import { Table } from "@/componentes/ui/table/Table";
import { ENV } from "@/config/env";
import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import { Cita, ResponseApi } from "@/interfaces/response.interfaces";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function CitaPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCitaId, setSelectedCitaId] = useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery<ResponseApi<Cita[]>>({
    queryFn: async () => {
      const url = new URL(`${ENV.API_URL}/citas`);
      if (search) {
        url.searchParams.append("search", search);
      }
      const res = await axios.get(url.toString());
      return res.data;
    },
    dependencies: [search],
  });

  const { mutate: disableCita, isLoading: isDisabling } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${ENV.API_URL}/citas/${id}`);
    },
    onSuccess: () => {
      toast.success("Cita deshabilitada con éxito");
      setIsModalOpen(false);
      refetch();
    },
    onError: () => {
      toast.error("Error al deshabilitar la cita");
    },
  });

  const handleDisableClick = (id: number) => {
    setSelectedCitaId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDisable = () => {
    if (selectedCitaId) {
      disableCita(selectedCitaId);
    }
  };

  const columns = useMemo<ColumnDef<Cita>[]>(
    () => [
      {
        accessorKey: "citaId",
        header: "ID",
      },
      {
        accessorKey: "paciente",
        header: "Paciente",
        cell: ({ row }) =>
          `${row.original.paciente.nombre} ${row.original.paciente.apellidos}`,
      },
      {
        accessorKey: "obstetra",
        header: "Obstetra",
        cell: ({ row }) =>
          `${row.original.obstetra.nombres} ${row.original.obstetra.apellidos}`,
      },
      {
        accessorKey: "programa.nombrePrograma",
        header: "Programa",
      },
      {
        accessorKey: "fecha_cita",
        header: "Fecha",
        cell: ({ row }) => new Date(row.original.fecha_cita).toLocaleString(),
      },
      {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              row.original.estado === "Activo"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {row.original.estado}
          </span>
        ),
      },
      {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex gap-3">
            <Link
              href={`/cita/${row.original.citaId}`}
              className="text-IconoHospital hover:underline font-medium"
            >
              Ver detalles
            </Link>
            {row.original.estado === "Activo" && (
              <button
                onClick={() => handleDisableClick(row.original.citaId)}
                className="text-red-500 hover:text-red-700 hover:underline font-medium"
              >
                Deshabilitar
              </button>
            )}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="w-full h-full bg-linea flex flex-col p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-xl">Citas</h1>
        <Link
          href="/cita/registrar"
          className="bg-IconoHospital text-white px-4 py-2 rounded-xl font-medium hover:bg-emerald-600"
        >
          Nueva Cita
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 border border-SubtituloGris mb-4">
        <input
          type="text"
          placeholder="Buscar por ID de cita"
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
        <Table columns={columns} data={data?.data || []} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Deshabilitar Cita"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">
            ¿Estás seguro de que deseas deshabilitar esta cita? Esta acción
            cambiará el estado a "Inactivo".
          </p>
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDisable}
              disabled={isDisabling}
              className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 disabled:opacity-50"
            >
              {isDisabling ? "Deshabilitando..." : "Confirmar"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
