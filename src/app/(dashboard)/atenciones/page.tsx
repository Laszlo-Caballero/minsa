"use client";

import { Table } from "@/componentes/ui/table/Table";
import { ENV } from "@/config/env";
import { useQuery } from "@/hooks/useQuery";
import { Atencion, ResponseApi } from "@/interfaces/response.interfaces";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo, useState } from "react";

export default function AtencionesPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery<ResponseApi<Atencion[]>>({
    queryFn: async () => {
      const url = new URL(`${ENV.API_URL}/atencion`);
      if (search) {
        url.searchParams.append("search", search);
      }
      const res = await axios.get(url.toString());
      return res.data;
    },
    dependencies: [search],
  });

  const columns = useMemo<ColumnDef<Atencion>[]>(
    () => [
      {
        accessorKey: "atencionId",
        header: "ID",
      },
      {
        accessorKey: "fecha_atencion",
        header: "Fecha",
        cell: ({ row }) =>
          new Date(row.original.fecha_atencion).toLocaleString(),
      },
      {
        accessorKey: "cita.paciente",
        header: "Paciente",
        cell: ({ row }) =>
          `${row.original.cita.paciente.nombre} ${row.original.cita.paciente.apellidos}`,
      },
      {
        accessorKey: "diagnostico",
        header: "Diagnóstico",
        cell: ({ row }) => (
          <span
            className="truncate max-w-xs block"
            title={row.original.diagnostico}
          >
            {row.original.diagnostico}
          </span>
        ),
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
    ],
    []
  );

  return (
    <div className="w-full h-full bg-linea flex flex-col p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-xl">Historial de Atenciones</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 border border-SubtituloGris mb-4">
        <input
          type="text"
          placeholder="Buscar por diagnóstico o paciente..."
          className="w-full outline-none text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando atenciones...</p>
        </div>
      ) : (
        <Table columns={columns} data={data?.data || []} />
      )}
    </div>
  );
}
