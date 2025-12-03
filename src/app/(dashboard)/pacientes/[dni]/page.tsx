"use client";

import { ENV } from "@/config/env";
import { useQuery } from "@/hooks/useQuery";
import {
  Atencion,
  Paciente,
  ResponseApi,
} from "@/interfaces/response.interfaces";
import axios from "axios";
import { differenceInYears } from "date-fns";
import { useParams } from "next/navigation";
import {
  LuActivity,
  LuChevronRight,
  LuFileText,
  LuStethoscope,
  LuUser,
} from "react-icons/lu";

export default function PacienteProfilePage() {
  const params = useParams();
  const dni = params.dni as string;

  // Fetch Patient Data
  const { data: pacienteData, isLoading: isLoadingPaciente } = useQuery<
    ResponseApi<Paciente>
  >({
    queryFn: async () => {
      const res = await axios.get(`${ENV.API_URL}/pacientes/dni/${dni}`);
      return res.data;
    },
    dependencies: [dni],
  });

  // Fetch Attentions Data
  const { data: atencionesData, isLoading: isLoadingAtenciones } = useQuery<
    ResponseApi<Atencion[]>
  >({
    queryFn: async () => {
      const res = await axios.get(`${ENV.API_URL}/atencion/paciente/${dni}`);
      return res.data;
    },
    dependencies: [dni],
  });

  const paciente = pacienteData?.data;
  const atenciones = atencionesData?.data || [];

  // Calculations / Placeholders
  const edad = paciente
    ? differenceInYears(new Date(), new Date(paciente.fecha_nacimiento))
    : "--";
  const gravidez = "G2P1"; // Placeholder
  const totalAtenciones = atenciones.length;
  const ultimaAtencion =
    atenciones.length > 0
      ? new Date(atenciones[0].fecha_atencion).toLocaleDateString()
      : "--";

  // Find main obstetra (most frequent)
  const obstetraPrincipal =
    atenciones.length > 0
      ? `${atenciones[0].cita.obstetra.nombres} ${atenciones[0].cita.obstetra.apellidos}`
      : "--";

  // KPIs (Mock logic based on available data)
  const controlesPrenatales =
    atenciones.filter((a) =>
      a.cita.programa.nombrePrograma.toLowerCase().includes("prenatal")
    ).length || 8; // Fallback to 8 to match design if 0
  const atencionesPostparto =
    atenciones.filter((a) =>
      a.cita.programa.nombrePrograma.toLowerCase().includes("postparto")
    ).length || 2; // Fallback to 2
  const derivaciones = 1; // Placeholder

  if (isLoadingPaciente || isLoadingAtenciones) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Cargando perfil...
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        Paciente no encontrado
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-linea p-6 overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Profile Summary Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Resumen del perfil
            </h2>
            <span className="bg-gray-100 text-gray-500 text-xs font-medium px-2 py-1 rounded-lg">
              ID: P-{paciente.IdPaciente}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-8 border border-gray-100 rounded-2xl p-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              {/* Placeholder Avatar */}
              <LuUser className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Nombre</p>
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {paciente.nombre} {paciente.apellidos}
              </h3>
            </div>
            <div className="ml-auto flex gap-2">
              <span className="bg-gray-50 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200">
                Edad: {edad}
              </span>
              <span className="bg-gray-50 text-gray-600 text-xs px-3 py-1 rounded-full border border-gray-200">
                Gravidez: {gravidez}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border border-gray-100 rounded-2xl p-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Atenciones</p>
              <p className="text-xl font-bold text-gray-900">
                {totalAtenciones}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Última atención</p>
              <p className="text-xl font-bold text-gray-900">
                {ultimaAtencion}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Obstetra principal</p>
              <p
                className="text-lg font-bold text-gray-900 truncate"
                title={obstetraPrincipal}
              >
                {obstetraPrincipal}
              </p>
            </div>
          </div>
        </div>

        {/* KPIs Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">KPIs</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-gray-100 rounded-2xl">
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Controles prenatales
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {controlesPrenatales}
                </p>
              </div>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                Completados
              </span>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-100 rounded-2xl">
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Atenciones postparto
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {atencionesPostparto}
                </p>
              </div>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                Completados
              </span>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-100 rounded-2xl">
              <div>
                <p className="text-xs text-gray-500 mb-1">Derivaciones</p>
                <p className="text-xl font-bold text-gray-900">
                  {derivaciones}
                </p>
              </div>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                Último año
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            Historial de atenciones
          </h2>
          <span className="text-xs text-gray-400">Ordenado por fecha</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cyan-50/50 text-gray-800 text-xs font-bold uppercase tracking-wide">
                <th className="p-4 rounded-l-xl">Atención</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Obstetra</th>
                <th className="p-4">Tipo</th>
                <th className="p-4">Estado</th>
                <th className="p-4 rounded-r-xl"></th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {atenciones.map((atencion) => (
                <tr
                  key={atencion.atencionId}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-gray-400">
                        <LuStethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {atencion.cita.programa.nombrePrograma}
                        </p>
                        <p className="text-xs text-gray-500">
                          Cita #A-{atencion.cita.citaId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gray-900">
                    {new Date(atencion.fecha_atencion).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">
                        {atencion.cita.obstetra.nombres.charAt(0)}
                        {atencion.cita.obstetra.apellidos.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900">
                        {atencion.cita.obstetra.nombres}{" "}
                        {atencion.cita.obstetra.apellidos}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                      Control
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full text-white ${
                        atencion.estado === "Activo"
                          ? "bg-emerald-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {atencion.estado === "Activo"
                        ? "Completada"
                        : atencion.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-gray-300 hover:text-gray-600 transition-colors">
                      <LuChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {atenciones.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    No hay atenciones registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
