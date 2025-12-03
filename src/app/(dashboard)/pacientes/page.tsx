"use client";

import { Table } from "@/componentes/ui/table/Table";
import { ENV } from "@/config/env";
import { useQuery } from "@/hooks/useQuery";
import { Paciente, ResponseApi } from "@/interfaces/response.interfaces";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import Link from "next/link";
import { useMemo, useState } from "react";
import { LuEye } from "react-icons/lu";

export default function PacientesPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery<ResponseApi<Paciente[]>>({
    queryFn: async () => {
      const url = new URL(`${ENV.API_URL}/pacientes`);
      if (search) {
        url.searchParams.append("search", search);
      }
      const res = await axios.get(url.toString());
      return res.data;
    },
    dependencies: [search],
  });

  const columns = useMemo<ColumnDef<Paciente>[]>(
    () => [
      {
        accessorKey: "IdPaciente",
        header: "ID",
      },
      {
        accessorKey: "dni",
        header: "DNI",
      },
      {
        accessorKey: "nombre",
        header: "Nombre",
        cell: ({ row }) => `${row.original.nombre} ${row.original.apellidos}`,
      },
      {
        accessorKey: "telefono",
        header: "Teléfono",
      },
      {
        accessorKey: "correo",
        header: "Correo",
      },
      {
        id: "acciones",
        header: "Acciones",
        cell: ({ row }) => (
          <Link
            href={`/pacientes/${row.original.dni}`}
            className="flex items-center gap-2 text-IconoHospital hover:underline font-medium"
          >
            <LuEye className="w-4 h-4" />
            Ver Perfil
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <div className="w-full h-full bg-linea flex flex-col p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-xl">Pacientes</h1>
        <Link
          href="/pacientes/registrar"
          className="bg-IconoHospital text-white px-4 py-2 rounded-xl font-medium hover:bg-emerald-600"
        >
          Nuevo Paciente
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-4 border border-SubtituloGris mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o DNI..."
          className="w-full outline-none text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando pacientes...</p>
        </div>
      ) : (
        <Table columns={columns} data={data?.data || []} />
      )}
    </div>
  );
}
