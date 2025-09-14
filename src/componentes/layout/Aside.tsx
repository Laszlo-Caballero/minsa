"use client";
import React from "react";
import { FaRegHospital } from "react-icons/fa";
import { LuHouse } from "react-icons/lu";
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

export default function Aside() {
  const pathName = usePathname();

  return (
    <div className="w-[264px] bg-white h-full py-5 px-4 border-r border-linea">
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
          <div className=" border text-linea"></div>
          <Link
            href="/"
            className={cx(
              "flex gap-2 justify-center py-3 px-3 rounded-lg text-TituloNegro",
              pathName === "/" && "bg-IconoHospital text-white"
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
          <div className=" border text-linea"></div>
          <Link
            href="/cita/registrar"
            className={cx(
              "flex gap-2 justify-center py-3 px-3 rounded-lg text-TituloNegro",
              pathName === "/cita/registrar" && "bg-IconoHospital text-white"
            )}
          >
            <CiUser className=" size-5.5" />
            <p className="font-semibold text-[16px]">Registrar Citas</p>
          </Link>
          <Link
            href="/obstetras/registrar"
            className="flex gap-2 justify-center py-3 px-3"
          >
            <LuUserPlus className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Resgitrar Obstetras
            </p>
          </Link>
          <Link href="/pacientes/registrar" className="flex gap-2  py-3 px-3">
            <LuUsers className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Registrar Pacientes
            </p>
          </Link>
          <Link href="/programas/registrar" className="flex gap-2 py-3 px-3">
            <TbBackground className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Registrar Programas
            </p>
          </Link>
          <Link href="/obstetras/historial" className="flex gap-2 py-3 px-3">
            <FaHandHoldingMedical className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Historial Obstetra
            </p>
          </Link>
        </div>
        <div className="py-1">
          <p className="text-SubtituloGris font-semibold text-xs">General</p>
        </div>
        <div>
          <div className=" border text-linea"></div>
          <Link href="/atenciones/registrar" className="flex gap-2 py-3 px-3">
            <LuFileUser className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Registrar Atenciones
            </p>
          </Link>
          <Link
            href="/pacientes/historial"
            className="flex w-full gap-2 py-3 px-3"
          >
            <BiReceipt className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Historial Paciente
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
