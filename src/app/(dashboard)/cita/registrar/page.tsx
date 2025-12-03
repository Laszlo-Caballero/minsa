"use client";
import Input from "@/componentes/ui/input/Input";
import Load from "@/componentes/ui/load/Load";
import Select from "@/componentes/ui/select/Select";
import Textarea from "@/componentes/ui/textarea/Textarea";
import { ENV } from "@/config/env";
import { useMutation } from "@/hooks/useMutation";
import { useQuery } from "@/hooks/useQuery";
import {
  Obstetra,
  Paciente,
  Programa,
  ResponseApi,
} from "@/interfaces/response.interfaces";
import { CitaSchema, CitaType } from "@/schemas/cita.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegistrarCita() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CitaSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: CitaType) => {
      const response = await axios.post(`${ENV.API_URL}/citas`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Cita registrada con éxito");
      reset();
    },
    onError: () => {
      toast.error("Error al registrar la cita");
    },
  });

  const { data: pacientes } = useQuery<ResponseApi<Paciente[]>>({
    queryFn: async () => {
      const res = await axios.get(`${ENV.API_URL}/pacientes`);
      return res.data;
    },
  });

  const { data: programas } = useQuery<ResponseApi<Programa[]>>({
    queryFn: async () => {
      const res = await axios.get(`${ENV.API_URL}/programas`);
      return res.data;
    },
  });

  const { data: obstetras } = useQuery<ResponseApi<Obstetra[]>>({
    queryFn: async () => {
      const res = await axios.get(`${ENV.API_URL}/obstetras`);
      return res.data;
    },
  });

  return (
    <div className="w-full h-full bg-linea flex flex-col overflow-y-auto">
      {isLoading && <Load />}

      <header className="flex sticky top-0 items-center justify-between bg-white py-5 px-6  border-SubtituloGris ">
        <h1 className="font-semibold text-xl">Registrar Cita</h1>
      </header>

      <form
        className="grid grid-cols-2 gap-6 p-6 h-full"
        onSubmit={handleSubmit((data) => {
          mutate(data);
        })}
      >
        <div className="bg-white rounded-2xl shadow-sm p-6 col-span-2">
          <h2 className="font-semibold text-lg mb-4">Nueva Cita</h2>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Paciente"
              placeholder="Seleccione un paciente"
              options={
                pacientes?.data.map((p) => ({
                  value: p.IdPaciente,
                  label: `${p.nombre} ${p.apellidos}`,
                })) || []
              }
              {...register("pacienteId")}
              error={errors.pacienteId?.message as string}
            />

            <Select
              label="Programa"
              placeholder="Seleccione un programa"
              options={
                programas?.data.map((p) => ({
                  value: p.programaId,
                  label: p.nombrePrograma,
                })) || []
              }
              {...register("programaId")}
              error={errors.programaId?.message as string}
            />

            <Select
              label="Obstetra"
              placeholder="Seleccione un obstetra"
              options={
                obstetras?.data.map((o) => ({
                  value: o.IdObstetra,
                  label: `${o.nombres} ${o.apellidos}`,
                })) || []
              }
              {...register("obstetraId")}
              error={errors.obstetraId?.message as string}
            />

            <Input
              label="Fecha y Hora"
              type="datetime-local"
              placeholder=""
              {...register("fecha_cita")}
              error={errors.fecha_cita?.message as string}
            />

            <div className="col-span-2">
              <Textarea
                label="Motivo"
                placeholder="Ingrese el motivo de la cita"
                {...register("motivo")}
                error={errors.motivo?.message as string}
              />
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
              Registrar Cita
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
