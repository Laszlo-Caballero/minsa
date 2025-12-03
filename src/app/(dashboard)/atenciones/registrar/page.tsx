"use client";

import { ENV } from "@/config/env";
import { useQuery } from "@/hooks/useQuery";
import { Cita, ResponseApi } from "@/interfaces/response.interfaces";
import axios from "axios";
import { useState } from "react";

export default function AtencionPage() {
  const [search, setSearch] = useState("");

  const { isLoading, data: citas } = useQuery<ResponseApi<Cita[]>>({
    queryFn: async () => {
      const url = new URL(`${ENV.API_URL}/citas`);
      if (search) {
        url.searchParams.append("search", search);
      }
      const res = await axios.get(url.toString());
      return res.data;
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <main className=""></main>
    </div>
  );
}
