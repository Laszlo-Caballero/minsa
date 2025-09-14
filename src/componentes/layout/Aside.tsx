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

export default function Aside() {
  return (
    <div className="w-[264px] bg-white h-full py-5 px-4 border-r border-linea">
      <div className="flex gap-2 justify-center ">
        <FaRegHospital className="text-IconoHospital size-5" />
        <p className="text-TituloNegro font-semibold ">
          Administrador Obstetricia
        </p>
      </div>
      <div className="py-4">
        <div className="py-1">
          <p className="text-SubtituloGris font-semibold text-xs">General</p>
        </div>
        <div>
          <div className=" border text-linea"></div>
          <button className="flex gap-2 justify-center py-3 px-3">
            <LuHouse className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Inicio
            </p>
          </button>
        </div>
        <div className="py-1">
          <p className="text-SubtituloGris font-semibold text-xs">Gestion</p>
        </div>
        <div>
          <div className=" border text-linea"></div>
          <button className="flex gap-2 justify-center py-3 px-3">
            <CiUser className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Registrar Citas
            </p>
          </button>
          <button className="flex gap-2 justify-center py-3 px-3">
            <LuUserPlus className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Resgitrar Obstetras
            </p>
          </button>
          <button className="flex gap-2 justify-center py-3 px-3">
            <LuUsers className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Registrar Pacientes
            </p>
          </button>
          <button className="flex gap-2 justify-center py-3 px-3">
            <TbBackground className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Registrar Programas
            </p>
          </button>
          <button className="flex gap-2 justify-center py-3 px-3">
            <FaHandHoldingMedical className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Historial Obstetra
            </p>
          </button>
        </div>
        <div className="py-1">
          <p className="text-SubtituloGris font-semibold text-xs">General</p>
        </div>
        <div>
          <div className=" border text-linea"></div>
          <button className="flex gap-2 justify-center py-3 px-3">
            <LuFileUser className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Registrar Atenciones
            </p>
          </button>
          <button className="flex gap-2 justify-center py-3 px-3">
            <BiReceipt className=" size-5.5" />
            <p className="text-TituloNegro font-semibold text-[16px] ">
              Historial Paciente
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
