import { Programa } from "@/interfaces/response.interfaces";

interface Props {
  programa: Programa;
}

const ProgramaCard: React.FC<Props> = ({ programa }) => {
  return (
    <div className="w-full min-h-min mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        {/* Título y código */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            {programa.nombrePrograma}
          </h2>
          <span className="text-sm bg-blue-100 text-blue-700 font-medium px-2 py-1 rounded">
            {programa.codigo}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-4">{programa.descripcion}</p>

        {/* Detalles */}
        <div className="text-gray-700 text-sm space-y-1">
          <p>
            <span className="font-medium">Duración:</span> {programa.duracion}{" "}
            meses
          </p>
          <p>
            <span className="font-medium">Requisitos:</span>{" "}
            {programa.requisitos}
          </p>
        </div>

        {/* Estado */}
        <div className="mt-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              programa.estado
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {programa.estado ? "Activo" : "Inactivo"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgramaCard;
