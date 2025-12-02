import { Paciente } from "@/interfaces/response.interfaces";

interface Props {
  paciente: Paciente;
}

export function CardPaciente({ paciente }: Props) {
  const fechaNacimiento = new Date(
    paciente.fecha_nacimiento
  ).toLocaleDateString();

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md p-6 min-h-min flex flex-col overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {paciente.nombre} {paciente.apellidos}
      </h2>

      <div className="space-y-1 text-gray-700 text-sm">
        <p>
          <span className="font-medium">DNI:</span> {paciente.dni}
        </p>
        <p>
          <span className="font-medium">Fecha de nacimiento:</span>{" "}
          {fechaNacimiento}
        </p>
        <p>
          <span className="font-medium">Correo:</span> {paciente.correo}
        </p>
        <p>
          <span className="font-medium">Teléfono:</span> {paciente.telefono}
        </p>
        <p>
          <span className="font-medium">Dirección:</span> {paciente.direccion}
        </p>
      </div>
    </div>
  );
}
