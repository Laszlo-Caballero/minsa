import { z } from "zod";

export const CitaSchema = z.object({
  pacienteId: z.coerce.number().min(1, "Seleccione un paciente"),
  obstetraId: z.coerce.number().min(1, "Seleccione un obstetra"),
  programaId: z.coerce.number().min(1, "Seleccione un programa"),
  fecha_cita: z.string().min(1, "Seleccione una fecha y hora"),
  motivo: z.string().min(1, "Ingrese el motivo de la cita"),
});

export type CitaType = z.infer<typeof CitaSchema>;
