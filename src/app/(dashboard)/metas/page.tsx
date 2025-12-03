"use client";

import { ModalMeta } from "@/componentes/ui/modal-meta/ModalMeta";
import Modal from "@/componentes/ui/modal/Modal";
import { Table } from "@/componentes/ui/table/Table";
import { ENV } from "@/config/env";
import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import { Meta, ResponseApi } from "@/interfaces/response.interfaces";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo, useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";

export default function MetasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState<Meta | null>(null);
  const [metaToDelete, setMetaToDelete] = useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery<ResponseApi<Meta[]>>({
    queryFn: async () => {
      const res = await axios.get(`${ENV.API_URL}/metas`);
      return res.data;
    },
    dependencies: [],
  });

  const { mutate: deleteMeta, isLoading: isDeleting } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${ENV.API_URL}/metas/${id}`);
    },
    onSuccess: () => {
      toast.success("Meta eliminada con éxito");
      setIsDeleteModalOpen(false);
      refetch();
    },
    onError: () => {
      toast.error("Error al eliminar la meta");
    },
  });

  const handleEdit = (meta: Meta) => {
    setSelectedMeta(meta);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedMeta(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setMetaToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (metaToDelete) {
      deleteMeta(metaToDelete);
    }
  };

  const handleSuccess = () => {
    refetch();
  };

  const columns = useMemo<ColumnDef<Meta>[]>(
    () => [
      {
        accessorKey: "metaId",
        header: "ID",
      },
      {
        accessorKey: "objetivo",
        header: "Objetivo",
      },
      {
        accessorKey: "descripcion",
        header: "Descripción",
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
            <button
              onClick={() => handleEdit(row.original)}
              className="text-IconoHospital hover:text-emerald-700 transition-colors"
            >
              <LuPencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDeleteClick(row.original.metaId)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <LuTrash2 className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="w-full h-full bg-linea flex flex-col p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-xl">Metas</h1>
        <button
          onClick={handleCreate}
          className="bg-IconoHospital text-white px-4 py-2 rounded-xl font-medium hover:bg-emerald-600"
        >
          Nueva Meta
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Cargando metas...</p>
        </div>
      ) : (
        <Table columns={columns} data={data?.data || []} />
      )}

      <ModalMeta
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        metaToEdit={selectedMeta}
        onSuccess={handleSuccess}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar Meta"
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">
            ¿Estás seguro de que deseas eliminar esta meta? Esta acción no se
            puede deshacer.
          </p>
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 disabled:opacity-50"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
