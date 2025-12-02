import { ObstetraCard } from "@/componentes/ui/card-obstetra/CardObstetra";
import ProgramaCard from "@/componentes/ui/card-programa/CardPrograma";
import { ENV } from "@/config/env";
import {
  Obstetra,
  Programa,
  ResponseApi,
} from "@/interfaces/response.interfaces";
import axios from "axios";

export default async function ProgramaPage() {
  const resP = await axios.get(`${ENV.API_URL}/programas`);

  const programa: ResponseApi<Programa[]> = resP.data;

  return (
    <div className="flex flex-col w-full p-4">
      <h1 className="font-semibold text-xl">Programas</h1>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {programa.data.map((ob) => (
          <ProgramaCard programa={ob} />
        ))}
      </div>
    </div>
  );
}
