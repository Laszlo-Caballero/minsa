"use client";
import Checkbox from "@/componentes/ui/checkbox/Checkbox";
import Input from "@/componentes/ui/input/Input";
import Load from "@/componentes/ui/load/Load";
import { ENV } from "@/config/env";
import { useMutation } from "@/hooks/useMutation";
import { ProgramaSchema, ProgramType } from "@/schemas/programa.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(ProgramaSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: ProgramType) => {
      const response = await axios.post(`${ENV.API_URL}/programas`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Programa registrado con éxito");
    },
    onError: () => {
      toast.error("Error al registrar el programa");
    },
  });

  return (
    <div className="w-full h-full bg-linea min-h-screen">
      {isLoading && <Load />}

      <div className="flex items-center justify-between bg-white py-5 px-6  border-SubtituloGris ">
        <h1 className="font-semibold text-xl">Registrar Programas</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50">
            Importar
          </button>
        </div>
      </div>

      <form
        className="grid grid-cols-2 gap-6 p-6"
        onSubmit={handleSubmit((data) => {
          mutate(data);
        })}
      >
        <div className="bg-white rounded-2xl shadow-sm p-6 ">
          <h2 className="font-semibold text-lg mb-4">Nuevo Programa</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nombre del Programa"
              placeholder="Ej: Control Prenatal Integral"
              {...register("nombrePrograma")}
              error={errors.nombrePrograma?.message}
            />

            <Input
              label="Código"
              placeholder="Ej: PRG-CP-2025"
              {...register("codigo")}
              error={errors.codigo?.message}
            />

            <Input
              label="Duración (semanas)"
              placeholder="Ej: 24"
              {...register("duracion", {
                valueAsNumber: true,
              })}
              error={errors.duracion?.message}
            />

            <Checkbox
              label="Estado"
              placeholder={watch("estado") ? "Activo" : "Inactivo"}
              value={watch("estado") || false}
              onChange={(checked) => {
                setValue("estado", checked);
              }}
            />

            <Input
              label="Descripción"
              placeholder="Ej: Seguimiento integral de gestación con educación y controles periódicos."
              {...register("descripcion")}
              error={errors.descripcion?.message}
            />

            <Input
              label="Requisitos"
              placeholder="Ej: DNI, Historia clínica"
              {...register("requisitos")}
              error={errors.requisitos?.message}
            />
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
      </form>
    </div>
  );
}
