"use client";
import { ObstetraCard } from "@/componentes/ui/card-obstetra/CardObstetra";
import Checkbox from "@/componentes/ui/checkbox/Checkbox";
import Input from "@/componentes/ui/input/Input";
import Load from "@/componentes/ui/load/Load";
import { ENV } from "@/config/env";
import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import { Obstetra, ResponseApi } from "@/interfaces/response.interfaces";
import { ObstetraSchema, ObstetraType } from "@/schemas/obstetra.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";

export default function page() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(ObstetraSchema),
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: ObstetraType) => {
      const response = await axios.post(`${ENV.API_URL}/obstetras`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Obstetra registrado con éxito");
    },
    onError: () => {
      toast.error("Error al registrar un Obstetra");
    },
  });

  const [search, setSearch] = useState("");
  const { data, isLoading: isLoadObstetra } = useQuery<ResponseApi<Obstetra[]>>(
    {
      queryFn: async () => {
        const url = new URL(`${ENV.API_URL}/obstetras`);
        if (search) {
          url.searchParams.append("search", search);
        }

        const res = await axios.get(url.toString());
        return res.data;
      },
      dependencies: [isLoading, search],
    }
  );
  return (
    <div className="w-full h-full bg-linea flex flex-col overflow-y-auto">
      {isLoading && <Load />}

      <header className="flex sticky top-0 items-center justify-between bg-white py-5 px-6  border-SubtituloGris ">
        <h1 className="font-semibold text-xl">Registrar Obstetras</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50">
            Importar
          </button>
        </div>
      </header>

      <form
        className="grid grid-cols-2 gap-6 p-6 h-full"
        onSubmit={handleSubmit((data) => {
          mutate(data);
        })}
      >
        <div className="bg-white rounded-2xl shadow-sm p-6 ">
          <h2 className="font-semibold text-lg mb-4">Nuevo Obstetra</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="DNI"
              placeholder="Ej: 73123563"
              {...register("dni", { valueAsNumber: true })}
              error={errors.dni?.message}
            />

            <Input
              label="Nombres"
              placeholder="Gian Laszlo"
              {...register("nombres")}
              error={errors.nombres?.message}
            />

            <Input
              label="Apellidos"
              placeholder="De las Casas"
              {...register("apellidos")}
              error={errors.apellidos?.message}
            />

            <Input
              label="Correo"
              placeholder="manuel@hotmail.com"
              {...register("correo")}
              error={errors.correo?.message}
            />

            <Input
              label="Telefono"
              placeholder="934180445"
              {...register("telefono", { valueAsNumber: true })}
              error={errors.telefono?.message}
            />
            <Input
              label="CMP"
              placeholder="8237832"
              {...register("CMP")}
              error={errors.CMP?.message}
            />
            <Input
              label="Especialidad"
              placeholder="Partos"
              {...register("especialidad")}
              error={errors.especialidad?.message}
            />
            <Checkbox
              label="Estado"
              placeholder={watch("estado") ? "Activo" : "Inactivo"}
              value={watch("estado") || false}
              onChange={(checked) => {
                setValue("estado", checked);
              }}
            />
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">
                Fecha de Nacimiento
              </label>
              <DayPicker
                mode="single"
                selected={watch("fecha_nacimiento")}
                onSelect={(date) => {
                  if (date) {
                    setValue("fecha_nacimiento", date);
                  }
                }}
                footer={
                  watch("fecha_nacimiento")
                    ? `Seleccionado: ${watch(
                        "fecha_nacimiento"
                      )?.toLocaleDateString()}`
                    : "Seleccione una fecha."
                }
                className="border border-gray-300 rounded-xl p-2"
              />
              {errors.fecha_nacimiento && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.fecha_nacimiento.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 border border-gray-300 py-2 rounded-xl font-medium hover:bg-gray-50"
              onClick={() => {
                reset();
              }}
              type="button"
            >
              Limpiar
            </button>
            <button className="flex-1 bg-IconoHospital text-white py-2 rounded-xl font-medium hover:bg-emerald-600">
              Crear Obstetra
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 max-h-screen overflow-auto">
          <h2 className="font-semibold text-lg mb-4">Obstetras registrados</h2>
          <div className="flex items-center border border-SubtituloGris rounded-xl px-3 py-2 mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre o código"
              className="w-full outline-none text-sm ml-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-full flex flex-col w-full overflow-y-auto gap-y-2">
            {data?.data.map((obstetra) => (
              <ObstetraCard key={obstetra.IdObstetra} obstetra={obstetra} />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
