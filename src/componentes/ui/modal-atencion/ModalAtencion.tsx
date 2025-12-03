import Modal from "@/componentes/ui/modal/Modal";
import Textarea from "@/componentes/ui/textarea/Textarea";
import { ENV } from "@/config/env";
import { useMutation } from "@/hooks/useMutation";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  citaId: number | null;
  onSuccess: () => void;
}

export function ModalAtencion({ isOpen, onClose, citaId, onSuccess }: Props) {
  const [diagnostico, setDiagnostico] = useState("");
  const [notaClinica, setNotaClinica] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.post(`${ENV.API_URL}/atencion`, {
        citaId,
        diagnostico,
        nota_clinica: notaClinica,
      });
    },
    onSuccess: () => {
      toast.success("Atención generada con éxito");
      onClose();
      onSuccess();
      setDiagnostico("");
      setNotaClinica("");
      setErrors([]);
    },
  });

  const handleSubmit = () => {
    if (!citaId) return;
    mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Generar Atención">
      <div className="flex flex-col gap-4">
        {errors.length > 0 && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            <ul className="list-disc list-inside">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <Textarea
          label="Diagnóstico"
          placeholder="Ingrese el diagnóstico..."
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
        />

        <Textarea
          label="Nota Clínica"
          placeholder="Ingrese la nota clínica..."
          value={notaClinica}
          onChange={(e) => setNotaClinica(e.target.value)}
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
