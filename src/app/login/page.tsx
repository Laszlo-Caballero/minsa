"use client";
import React from "react";
import { FaRegHospital } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import ReCAPTCHA from "react-google-recaptcha";

export default function page() {
  return (
    <div className="bg-bglogin flex items-center flex-col justify-center w-full h-screen ">
      <div className="bg-white shadow-xl border rounded-xl border-linea px-6 py-6">
        <div className="flex gap-2 justify-center py-2 ">
          <FaRegHospital className="text-IconoHospital size-8" />
          <p className="text-TituloNegro font-semibold text-[20px] ">
            Acceso al Sistema
          </p>
        </div>
        <p className=" flex justify-center py-4 text-SubtituloGris font-Inter text-[13px]">
          Ingresa con tu usuario y contraseña para continuar.
        </p>
        <form>
          <p className=" text-SubtituloGris font-Inter text-[13px]">Usuario</p>
          <div className="w-full items-center py-1 px-2 gap-2 flex border rounded-md outline-none text-SubtituloGris">
            <CiUser className="size-5" />
            <input className="w-full outline-none" type="text"></input>
          </div>
        </form>
        <form className="py-3">
          <p className=" text-SubtituloGris font-Inter text-[13px]">
            Contraseña
          </p>
          <div className="w-full items-center py-1 px-2 gap-2 flex border rounded-md outline-none text-SubtituloGris">
            <GiPadlock className="size-5" />
            <input className="w-full outline-none" type="text"></input>
          </div>
        </form>
        <form>
          <p className=" text-SubtituloGris font-Inter text-[13px]">Captcha</p>
          <div className="flex justify-center py-3">
            <ReCAPTCHA sitekey="6LeVKs0rAAAAAIicDlMm1HpBltmOrNJRbdv6UZTj" />
          </div>
          <p className="flex justify-center text-SubtituloGris font-Inter text-[13px]">
            Esto ayuda a proteger tu cuenta frente a accesos automatizados.
          </p>
        </form>
        <div className="flex justify-center items-center gap-2 py-3">
          <p className=" text-SubtituloGris font-Inter text-[13px] px-2">
            ¿Olvidaste tu contraseña?
          </p>
          <button className="flex border border-IconoHospital rounded-2xl py-3 px-5 bg-IconoHospital">
            <IoExitOutline className="text-white size-5" />
            <p className="text-white px-2">Iniciar Sesion</p>
          </button>
        </div>
      </div>
    </div>
  );
}
