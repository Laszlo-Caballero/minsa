"use client";
import Checkbox from "@/componentes/ui/checkbox/Checkbox";
import Input from "@/componentes/ui/input/Input";
import Load from "@/componentes/ui/load/Load";
import { ENV } from "@/config/env";
import { useMutation } from "@/hooks/useMutation";
import { PacienteSchema, PacienteType } from "@/schemas/paciente.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";

export default function Page() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(PacienteSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: PacienteType) => {
      const response = await axios.post(`${ENV.API_URL}/pacientes`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Paciente registrado con éxito");
    },
    onError: () => {
      toast.error("Error al registrar un Paciente");
    },
  });

  return (
    <div className="w-full h-full bg-linea min-h-screen">
      {isLoading && <Load />}

      <div className="flex items-center justify-between bg-white py-5 px-6  border-SubtituloGris ">
        <h1 className="font-semibold text-xl">Registrar Pacientes</h1>
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
          <h2 className="font-semibold text-lg mb-4">Nuevo Paciente</h2>
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
              {...register("nombre")}
              error={errors.nombre?.message}
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
              label="Direccion"
              placeholder="El Porvenir"
              {...register("direccion")}
              error={errors.direccion?.message}
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
