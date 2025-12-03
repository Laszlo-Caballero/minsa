import { ENV } from "@/config/env";
import {
  Inicio as InicioResponse,
  ResponseApi,
} from "@/interfaces/response.interfaces";
import { cookies } from "next/headers";
import Link from "next/link";
import { CardMeta } from "@/componentes/ui/card-meta/CardMeta";
import { CardCita } from "@/componentes/ui/card-cita/CardCita";

export default async function Inicio() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${ENV.API_URL}/inicio`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const inicioData: ResponseApi<InicioResponse> = await res.json();

  const data = inicioData.data;

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
        </div>

        <div className="bg-white  border-SubtituloGris rounded-2xl p-5 mb-6">
          <h2 className="font-semibold mb-4 px-1">Atajos rápidos</h2>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/cita/registrar"
              className="flex items-center justify-center gap-2 bg-bgatajos border-SubtituloGris rounded-xl py-4 px-2 text-sm font-medium text-black "
            >
              Registrar Cita
            </Link>

            <Link
              href="/obstetras"
              className="flex items-center justify-center gap-2 bg-bgatajos  border-SubtituloGris rounded-xl py-4 px-2 text-sm font-medium text-black "
            >
              Conocer Obstetras
            </Link>

            <Link
              href="/programa/registrar"
              className="flex items-center justify-center gap-2 bg-bgatajos  border-SubtituloGris rounded-xl py-4 px-2 text-sm font-medium text-black "
            >
              Registrar Programa
            </Link>

            <Link
              href="/pacientes"
              className="flex items-center justify-center gap-2 bg-bgatajos  border-SubtituloGris rounded-xl py-4 px-2 text-sm font-medium text-black"
            >
              Ver Historial
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white  border-SubtituloGris rounded-2xl p-5 ">
            <h3 className="text-black text-sm font-semibold mb-2">
              Panorama general
            </h3>
            <p className="text-4xl font-semibold text-gray-800 leading-tight">
              {data.countCitasEsteMes}
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
              {data.countCitasHoy}
            </p>
            <p className="text-xs text-SubtituloGris mt-2">3 en urgencia</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Citas más próximas */}
          <div className="bg-white  border-SubtituloGris rounded-2xl p-4 col-span-2">
            <h3 className="font-semibold text-base mb-4 text-gray-800">
              Citas más próximas
            </h3>
            <div className="flex flex-col gap-4">
              {data.citas.length > 0 ? (
                data.citas.map((cita) => (
                  <CardCita key={cita.citaId} cita={cita} />
                ))
              ) : (
                <p className="text-sm text-gray-500">No hay citas próximas.</p>
              )}
            </div>
          </div>

          {/* Metas del mes */}
          <div className="bg-white  border-SubtituloGris rounded-2xl p-5">
            <h3 className="font-semibold text-base mb-5 text-gray-800">
              Metas del mes
            </h3>

            {data.metas.length > 0 ? (
              data.metas.map((meta) => (
                <CardMeta
                  key={meta.metaId}
                  title={meta.objetivo}
                  meta={meta.meta_display}
                  value={meta.valor}
                  percentage={meta.porcentaje}
                  color={meta.color || "teal-400"}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">No hay metas disponibles.</p>
            )}

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
