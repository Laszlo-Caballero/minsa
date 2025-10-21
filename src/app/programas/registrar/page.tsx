import React from "react";

export default function Page() {
  return (
    <div className="w-full h-full bg-linea min-h-screen">
      <div className="flex items-center justify-between bg-white py-5 px-6  border-SubtituloGris ">
        <h1 className="font-semibold text-xl">Registrar Programas</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50">
            Importar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 p-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 ">
          <h2 className="font-semibold text-lg mb-4">Nuevo programa</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-SubtituloGris">
                Nombre del programa
              </label>
              <input
                className="w-full border border-SubtituloGris rounded-xl px-3 py-2 mt-1"
                placeholder="Ej: Control Prenatal Integral"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-SubtituloGris">
                Código
              </label>
              <input
                className="w-full border border-SubtituloGris rounded-xl px-3 py-2 mt-1"
                placeholder="Ej: PRG-CP-2025"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-SubtituloGris">
                Duración (semanas)
              </label>
              <input
                className="w-full border border-SubtituloGris rounded-xl px-3 py-2 mt-1"
                placeholder="Ej: 24"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-SubtituloGris">
                Estado
              </label>
              <input
                className="w-full border border-SubtituloGris rounded-xl px-3 py-2 mt-1"
                placeholder="Ej: Activo"
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-SubtituloGris">
                Descripción
              </label>
              <input
                className="w-full border border-SubtituloGris rounded-xl px-3 py-2 mt-1"
                placeholder="Ej: Seguimiento integral de gestación con educación y controles periódicos."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-SubtituloGris">
                Responsable
              </label>
              <input
                className="w-full border border-SubtituloGris rounded-xl px-3 py-2 mt-1"
                placeholder="Ej: Lic. Paula Díaz"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-SubtituloGris">
                Requisitos
              </label>
              <input
                className="w-full border border-SubtituloGris rounded-xl px-3 py-2 mt-1"
                placeholder="Ej: DNI, Historia clínica"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="flex-1 border border-gray-300 py-2 rounded-xl font-medium hover:bg-gray-50">
              Limpiar
            </button>
            <button className="flex-1 bg-IconoHospital text-white py-2 rounded-xl font-medium hover:bg-emerald-600">
              Crear programa
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="font-semibold text-lg mb-4">Programas registrados</h2>
          <div className="flex items-center border border-SubtituloGris rounded-xl px-3 py-2 mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre o código"
              className="w-full outline-none text-sm ml-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
