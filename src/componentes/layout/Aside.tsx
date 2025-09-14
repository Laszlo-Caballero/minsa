import React from "react";
import { FaRegHospital } from "react-icons/fa";
import { LuHouse } from "react-icons/lu";

export default function Aside() {
  return (
    <div className="w-[264px] bg-white h-full py-5 px-4">
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
      </div>
    </div>
  );
}
