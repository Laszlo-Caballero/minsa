"use client";
import React, { useState } from "react";
import { FaRegHospital } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import ReCAPTCHA from "react-google-recaptcha";
import { ENV } from "@/config/env";
import Load from "@/componentes/ui/load/Load";
import axios from "axios";
import { toast } from "sonner";
import { useMutation } from "@/hooks/useMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/login.schema";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [isValidCaptcha, setIsValidCaptcha] = useState(false);
  const { login } = useAuth();

  const { isLoading, mutate } = useMutation<unknown, { token: string }>({
    mutationFn: async (data) => {
      const res = await axios.post(
        `${ENV.API_URL}/users/validar-captcha`,
        data
      );

      return res.data;
    },
    onSuccess: () => {
      toast.success("Captcha validado correctamente");
      setIsValidCaptcha(true);
    },
    onError: () => {
      toast.error("Error al validar el captcha");
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <div className="bg-bglogin flex items-center flex-col justify-center w-full h-screen">
      <form
        className="bg-white shadow-xl border rounded-xl border-linea px-6 py-6"
        onSubmit={handleSubmit((data) => {
          if (!isValidCaptcha) {
            toast.error("Por favor, valida el captcha");

            return;
          }

          login(data);
        })}
      >
        <div className="flex gap-2 justify-center py-2 ">
          <FaRegHospital className="text-IconoHospital size-8" />
          <p className="text-TituloNegro font-semibold text-[20px] ">
            Acceso al Sistema
          </p>
        </div>
        <p className=" flex justify-center py-4 text-SubtituloGris font-Inter text-[13px]">
          Ingresa con tu usuario y contraseña para continuar.
        </p>
        <div>
          <p className=" text-SubtituloGris font-Inter text-[13px]">Usuario</p>
          <div className="w-full items-center py-1 px-2 gap-2 flex border rounded-md outline-none text-SubtituloGris">
            <CiUser className="size-5" />
            <input
              className="w-full outline-none"
              type="text"
              {...register("username")}
            ></input>
          </div>
          {errors.username && (
            <p className="text-red-500 text-[10px]">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="py-3">
          <p className=" text-SubtituloGris font-Inter text-[13px]">
            Contraseña
          </p>
          <div className="w-full items-center py-1 px-2 gap-2 flex border rounded-md outline-none text-SubtituloGris">
            <GiPadlock className="size-5" />
            <input
              className="w-full outline-none"
              type="text"
              {...register("password")}
            ></input>
          </div>
          {errors.password && (
            <p className="text-red-500 text-[10px]">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <p className=" text-SubtituloGris font-Inter text-[13px]">Captcha</p>
          <div className="flex justify-center py-3">
            <ReCAPTCHA
              sitekey={ENV.CLIENT_KEY || ""}
              onChange={(token) => {
                if (!token) return;
                mutate({ token });
              }}
              onExpired={() => {
                setIsValidCaptcha(false);
              }}
            />
          </div>
          <p className="flex justify-center text-SubtituloGris font-Inter text-[13px]">
            Esto ayuda a proteger tu cuenta frente a accesos automatizados.
          </p>
        </div>
        <div className="flex justify-center items-center gap-2 py-3">
          <p className=" text-SubtituloGris font-Inter text-[13px] px-2">
            ¿Olvidaste tu contraseña?
          </p>
          <button className="flex border border-IconoHospital rounded-2xl py-3 px-5 bg-IconoHospital">
            <IoExitOutline className="text-white size-5" />
            <p className="text-white px-2">Iniciar Sesion</p>
          </button>
        </div>
      </form>

      {isLoading && <Load />}
    </div>
  );
}
