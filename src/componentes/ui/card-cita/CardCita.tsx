"use client";
import { Cita } from "@/interfaces/response.interfaces";
import { LuCalendarClock, LuPlus } from "react-icons/lu";
import { format, isToday } from "date-fns";

interface Props {
  cita: Cita;
  onGenerarAtencion?: (cita: Cita) => void;
}

export function CardCita({ cita, onGenerarAtencion }: Props) {
  const fecha = new Date(cita.fecha_cita);
  const esHoy = isToday(fecha);
  const fechaFormateada = esHoy
    ? `Hoy ${format(fecha, "HH:mm")}`
    : format(fecha, "dd/MM/yyyy HH:mm");

  // Placeholder for missing location data
  const consultorio = "Consultorio 1";

  return (
    <div className="w-full bg-white rounded-xl border border-blue-500/30 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-1">
          <LuCalendarClock className="w-7 h-7 text-gray-900" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            {fechaFormateada} <span className="text-gray-900 font-bold">—</span>{" "}
            {cita.motivo}
          </h3>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            CIT-{cita.citaId} • Paciente: {cita.paciente.nombre}{" "}
            {cita.paciente.apellidos} • {consultorio}
          </p>
        </div>
      </div>

      <button
        onClick={() => onGenerarAtencion?.(cita)}
        className="flex items-center gap-3 px-6 py-3 bg-cyan-50/80 text-gray-900 rounded-2xl hover:bg-cyan-100 transition-colors font-medium text-sm"
      >
        <LuPlus className="w-5 h-5" />
        <span className="text-left leading-tight">
          Generar
          <br />
          atención
        </span>
      </button>
    </div>
  );
}
