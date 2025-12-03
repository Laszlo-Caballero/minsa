"use client";
import React from "react";
import { FaRegHospital } from "react-icons/fa";
import { LuHouse, LuLogOut, LuClipboardList, LuTarget } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { LuUserPlus } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { TbBackground } from "react-icons/tb";
import { FaHandHoldingMedical } from "react-icons/fa";
import { BiReceipt } from "react-icons/bi";
import { LuFileUser } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cx from "@/utils/cx";
import { useAuth } from "@/context/AuthContext";

export default function Aside() {
  const pathName = usePathname();
  const { logout } = useAuth();
  return (
    <div className="w-[264px] flex flex-col bg-white h-full py-5 px-4 border-r border-linea">
      <div className="flex gap-2 justify-center ">
        <FaRegHospital className="text-IconoHospital size-5" />
        <p className="text-TituloNegro font-semibold">
          Administrador Obstetricia
        </p>
      </div>
      <div className="py-4">
        <div className="py-1">
          <p className="text-SubtituloGris font-semibold text-xs">General</p>
        </div>
        <div>
          <div className=" border-t text-linea py-0.5"></div>
          <Link
            href="/"
            className={cx(
              "flex gap-2 py-3 px-3 rounded-lg text-TituloNegro",
              pathName === "/" && "bg-bg text-IconoHospital"
            )}
          >
            <LuHouse className=" size-5.5" />
            <p className="font-semibold text-[16px]">Inicio</p>
          </Link>
        </div>
        <div className="py-1">
          <p className="text-SubtituloGris font-semibold text-xs">Gestion</p>
        </div>
        <div>
          <div className=" borde-t border-t text-linea py-0.5"></div>

          <Link
            href="/cita"
            className={cx(
              "flex gap-2  py-3 px-3 rounded-lg text-TituloNegro",
              pathName === "/cita" && "bg-bg text-IconoHospital"
            )}
          >
            <CiUser className=" size-5.5" />
            <p className="font-semibold text-[16px]">Citas</p>
          </Link>

          <Link
            href="/cita/registrar"
            className={cx(
              "flex gap-2  py-3 px-3 rounded-lg text-TituloNegro",
              pathName === "/cita/registrar" && "bg-bg text-IconoHospital"
            )}
          >
            <CiUser className=" size-5.5" />
            <p className="font-semibold text-[16px]">Registrar Citas</p>
          </Link>

          <Link
            href="/obstetras/registrar"
            className={cx(
              "flex gap-2 py-3 px-3 rounded-lg",
              pathName === "/obstetras/registrar" && "bg-bg text-IconoHospital"
            )}
          >
            <LuUserPlus className=" size-5.5" />
            <p className="font-semibold text-[16px] ">Registrar Obstetras</p>
          </Link>

          <Link
            href="/pacientes"
            className={cx(
              "flex gap-2  py-3 px-3 rounded-lg",
              pathName === "/pacientes" && "bg-bg text-IconoHospital"
            )}
          >
            <LuUsers className=" size-5.5 " />
            <p className=" font-semibold text-[16px] "> Pacientes</p>
          </Link>
          <Link
            href="/pacientes/registrar"
            className={cx(
              "flex gap-2  py-3 px-3 rounded-lg",
              pathName === "/pacientes/registrar" && "bg-bg text-IconoHospital"
            )}
          >
            <LuUsers className=" size-5.5 " />
            <p className=" font-semibold text-[16px] ">Registrar Pacientes</p>
          </Link>

          <Link
            href="/programas"
            className={cx(
              "flex gap-2  py-3 px-3 rounded-lg",
              pathName === "/programas" && "bg-bg text-IconoHospital"
            )}
          >
            <TbBackground className=" size-5.5" />
            <p className="font-semibold text-[16px] "> Programas</p>
          </Link>
          <Link
            href="/programas/registrar"
            className={cx(
              "flex gap-2  py-3 px-3 rounded-lg",
              pathName === "/programas/registrar" && "bg-bg text-IconoHospital"
            )}
          >
            <TbBackground className=" size-5.5" />
            <p className="font-semibold text-[16px] ">Registrar Programas</p>
          </Link>
        </div>
        <div className="py-1">
          <p className="text-SubtituloGris font-semibold text-xs">Obstetra</p>
        </div>
        <div>
          <div className=" border-t py-0.5 text-linea"></div>
          <Link
            href="/atenciones/registrar"
            className={cx(
              "flex gap-2  py-3 px-3 rounded-lg",
              pathName === "/atenciones/registrar" && "bg-bg text-IconoHospital"
            )}
          >
            <LuFileUser className=" size-5.5" />
            <p className="font-semibold text-[16px] ">Registrar Atenciones</p>
          </Link>

          <Link
            href="/atenciones"
            className={cx(
              "flex gap-2  py-3 px-3 rounded-lg",
              pathName === "/atenciones" && "bg-bg text-IconoHospital"
            )}
          >
            <LuClipboardList className=" size-5.5" />
            <p className="font-semibold text-[16px] ">Atenciones</p>
          </Link>
          <Link
            href="/metas"
            className={cx(
              "flex gap-2  py-3 px-3 rounded-lg",
              pathName === "/metas" && "bg-bg text-IconoHospital"
            )}
          >
            <LuTarget className=" size-5.5" />
            <p className="font-semibold text-[16px] ">Metas</p>
          </Link>
        </div>
      </div>

      <div className="mt-auto w-full">
        <button className="flex items-center w-full justify-center cursor-pointer">
          <LuLogOut className=" size-5.5 text-red-600" />
          <p
            onClick={logout}
            className="font-semibold text-[16px] text-red-600"
          >
            Cerrar Sesión
          </p>
        </button>
      </div>
    </div>
  );
}
