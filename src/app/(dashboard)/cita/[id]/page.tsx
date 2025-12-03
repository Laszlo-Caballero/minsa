import { ObstetraCard } from "@/componentes/ui/card-obstetra/CardObstetra";
import { CardPaciente } from "@/componentes/ui/card-paciente/CardPaciente";
import ProgramaCard from "@/componentes/ui/card-programa/CardPrograma";
import { ENV } from "@/config/env";
import { Cita, ResponseApi } from "@/interfaces/response.interfaces";
import Link from "next/link";

export default async function CitaDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${ENV.API_URL}/citas/${id}`);
  const data: ResponseApi<Cita> = await res.json();
  const cita: Cita | null = data.data || null;

  if (!cita) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 mb-4">No se encontró la cita.</p>
        <Link
          href="/cita"
          className="text-IconoHospital hover:underline font-medium"
        >
          Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-linea flex flex-col p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-xl">
          Detalles de la Cita #{cita.citaId}
        </h1>
        <Link
          href="/cita"
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          Volver
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Información General */}
        <div className="bg-white rounded-2xl shadow-sm p-6 col-span-1 md:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-semibold text-lg text-gray-800">
                Información General
              </h2>
              <p className="text-sm text-gray-500">
                Fecha: {new Date(cita.fecha_cita).toLocaleString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                cita.estado === "Activo"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {cita.estado}
            </span>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Motivo</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
              {cita.motivo}
            </p>
          </div>
        </div>

        {/* Paciente */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-gray-800 ml-1">Paciente</h2>
          <CardPaciente paciente={cita.paciente} />
        </div>

        {/* Obstetra */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-gray-800 ml-1">Obstetra</h2>
          <ObstetraCard obstetra={cita.obstetra} />
        </div>

        {/* Programa */}
        <div className="space-y-4 col-span-1 md:col-span-2">
          <h2 className="font-semibold text-lg text-gray-800 ml-1">Programa</h2>
          <div className="w-full md:w-1/2">
            <ProgramaCard programa={cita.programa} />
          </div>
        </div>
      </div>
    </div>
  );
}
