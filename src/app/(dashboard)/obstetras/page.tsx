import {ObstetraCard} from "@/componentes/ui/card-obstetra/CardObstetra";
import { ENV } from "@/config/env";
import { Obstetra } from "@/interfaces/response.interfaces";
import axios from "axios";



export default async function ObstretrasPage(){
    const resO = await axios.get(`${ENV.API_URL}/obstetras`)

    const obstetras: Obstetra[] = resO.data

    return(
        <div className="flex flex-col w-full p-4">
            <h1 className="font-semibold text-xl">
                Obstetras 
            </h1>
        <div className="grid grid-cols-3 gap-4 mt-2">
        {obstetras.map((ob)=>(
            <ObstetraCard obstetra={ob} />
        ))}
        </div>
        </div>
    )
}