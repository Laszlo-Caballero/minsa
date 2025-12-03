import Modal from "@/componentes/ui/modal/Modal";
import Textarea from "@/componentes/ui/textarea/Textarea";
import { ENV } from "@/config/env";
import { useMutation } from "@/hooks/useMutation";
import { Meta } from "@/interfaces/response.interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  metaToEdit?: Meta | null;
  onSuccess: () => void;
}

export function ModalMeta({ isOpen, onClose, metaToEdit, onSuccess }: Props) {
  const [objetivo, setObjetivo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (metaToEdit) {
      setObjetivo(metaToEdit.objetivo);
      setDescripcion(metaToEdit.descripcion);
    } else {
      setObjetivo("");
      setDescripcion("");
    }
  }, [metaToEdit, isOpen]);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const data = { objetivo, descripcion };
      if (metaToEdit) {
        await axios.put(`${ENV.API_URL}/metas/${metaToEdit.metaId}`, data);
      } else {
        await axios.post(`${ENV.API_URL}/metas`, data);
      }
    },
    onSuccess: () => {
      toast.success(
        metaToEdit ? "Meta actualizada con éxito" : "Meta creada con éxito"
      );
      onClose();
      onSuccess();
      setObjetivo("");
      setDescripcion("");
    },
    onError: () => {
      toast.error(
        metaToEdit ? "Error al actualizar la meta" : "Error al crear la meta"
      );
    },
  });

  const handleSubmit = () => {
    if (!objetivo || !descripcion) {
      toast.error("Por favor complete todos los campos");
      return;
    }
    mutate();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={metaToEdit ? "Editar Meta" : "Nueva Meta"}
    >
      <div className="flex flex-col gap-4">
        <Textarea
          label="Objetivo"
          placeholder="Ingrese el objetivo..."
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
        />

        <Textarea
          label="Descripción"
          placeholder="Ingrese la descripción..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl bg-IconoHospital text-white font-medium hover:bg-emerald-600 disabled:opacity-50"
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
