import Image from "next/image";

export default function Inicio() {
  return (
    <div className="w-full h-full bg-linea">
      <div className="flex items-center justify-between bg-white py-5 px-6  border-SubtituloGris ">
        <h1 className="font-semibold text-xl">Inicio</h1>
        <div className="flex gap-3"></div>
      </div>
      <div className="py-5 px-8">
        <div className="bg-white  border-SubtituloGris rounded-2xl p-5 mb-5 flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-lg">Bienvenido(a)</h1>
            <p className="text-SubtituloGris text-sm">
              Gestiona tu día con acceso rápido a citas, metas mensuales e
              información clave.
            </p>
          </div>
          <div className="flex gap-2">
            <button className=" bg-bgatajos text-black font-semibold px-4 py-2 rounded-xl text-sm hover:bg-gray-50 transition ">
              Nueva cita
            </button>
            <button className="bg-bgatajos font-semibold text-black px-4 py-2 rounded-xl text-sm hover:bg-gray-50 transition ">
              Ver historial
            </button>
          </div>
        </div>

        <div className="bg-white  border-SubtituloGris rounded-2xl p-5 mb-6">
          <h2 className="font-semibold mb-4 px-1">Atajos rápidos</h2>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-bgatajos border-SubtituloGris rounded-xl py-4 px-2 text-sm font-medium text-black ">
              Registrar Cita
            </button>

            <button className="flex items-center justify-center gap-2 bg-bgatajos  border-SubtituloGris rounded-xl py-4 px-2 text-sm font-medium text-black ">
              Conocer Obstetras
            </button>

            <button className="flex items-center justify-center gap-2 bg-bgatajos  border-SubtituloGris rounded-xl py-4 px-2 text-sm font-medium text-black ">
              Registrar Programa
            </button>

            <button className="flex items-center justify-center gap-2 bg-bgatajos  border-SubtituloGris rounded-xl py-4 px-2 text-sm font-medium text-black">
              Ver Historial
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white  border-SubtituloGris rounded-2xl p-5 ">
            <h3 className="text-black text-sm font-semibold mb-2">
              Panorama general
            </h3>
            <p className="text-4xl font-semibold text-gray-800 leading-tight">
              126
            </p>
            <p className="text-xs text-SubtituloGris mt-2">
              Pacientes atendidos este mes
            </p>
          </div>
          <div className="bg-white border-SubtituloGris rounded-2xl p-5 ">
            <h3 className="text-black text-sm font-semibold mb-2">
              Citas de hoy
            </h3>
            <p className="text-4xl font-semibold text-gray-800 leading-tight">
              18
            </p>
            <p className="text-xs text-SubtituloGris mt-2">3 en urgencia</p>
          </div>
          <div className="bg-white  border-SubtituloGris rounded-2xl p-5 ">
            <h3 className="text-black text-sm font-semibold mb-2">
              Tasa de atención
            </h3>
            <p className="text-4xl font-semibold text-gray-800 leading-tight">
              84%
            </p>
            <p className="text-xs text-SubtituloGris mt-2">Meta 90%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Citas más próximas */}
          <div className="bg-white  border-SubtituloGris rounded-2xl p-4 col-span-2">
            <h3 className="font-semibold text-base mb-4 text-gray-800">
              Citas más próximas
            </h3>
          </div>

          {/* Metas del mes */}
          <div className="bg-white  border-SubtituloGris rounded-2xl p-5">
            <h3 className="font-semibold text-base mb-5 text-gray-800">
              Metas del mes
            </h3>

            {/* Atendidas */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 font-medium">Atendidas</p>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">
                    Meta 300
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-800">242</p>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-1.5 bg-teal-400 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            {/* Pendientes */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 font-medium">
                    Pendientes
                  </p>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">
                    Meta &lt; 30
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-800">28</p>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-1.5 bg-teal-400 rounded-full"
                  style={{ width: "93%" }}
                ></div>
              </div>
            </div>

            {/* Canceladas */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 font-medium">
                    Canceladas
                  </p>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">
                    Meta &lt; 10
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-800">12</p>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-1.5 bg-teal-400 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            {/* Nuevos programas */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 font-medium">
                    Nuevos programas
                  </p>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">
                    Meta 8
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-800">5</p>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-1.5 bg-teal-400 rounded-full"
                  style={{ width: "62%" }}
                ></div>
              </div>
            </div>

            {/* Leyenda */}
            <div className="flex justify-start gap-3 text-xs">
              <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600">
                Bien
              </span>
              <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600">
                A mejorar
              </span>
              <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-600">
                Crítico
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
