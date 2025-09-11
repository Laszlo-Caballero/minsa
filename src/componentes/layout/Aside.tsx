import React from "react";
import { FaRegHospital } from "react-icons/fa";

export default function Aside() {
  return (
    <div className="w-[264px] bg-white h-full py-5 px-4">
      <div className="flex border gap-2 justify-center ">
        <FaRegHospital className="text-IconoHospital size-5" />
        <p className="text-TituloNegro font-semibold ">
          Administrador Obstetricia
        </p>
      </div>
    </div>
  );
}
