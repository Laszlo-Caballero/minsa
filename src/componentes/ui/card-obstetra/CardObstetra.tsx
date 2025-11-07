import { Obstetra } from "@/interfaces/response.interfaces";

interface Props {
  obstetra: Obstetra;
}

export function ObstetraCard ({ obstetra }: Props) {
  const fechaNacimiento = new Date(obstetra.fecha_nacimiento).toLocaleDateString();

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {obstetra.nombres} {obstetra.apellidos}
        </h2>
        <p className="text-gray-500 text-sm mb-4">CMP: {obstetra.CMP}</p>

        <div className="space-y-1 text-gray-700 text-sm">
          <p><span className="font-medium">DNI:</span> {obstetra.dni}</p>
          <p><span className="font-medium">Fecha de nacimiento:</span> {fechaNacimiento}</p>
          <p><span className="font-medium">Especialidad:</span> {obstetra.especialidad}</p>
          <p><span className="font-medium">Correo:</span> {obstetra.correo}</p>
          <p><span className="font-medium">Teléfono:</span> {obstetra.telefono}</p>
        </div>

        <div className="mt-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              obstetra.estado
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {obstetra.estado ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
    </div>
  );
};
