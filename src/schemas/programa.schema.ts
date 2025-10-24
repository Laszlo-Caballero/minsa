import z from "zod";

export const ProgramaSchema = z.object({
  nombrePrograma: z.string().min(1, "El nombre del programa es obligatorio"),
  codigo: z.string().min(1, "El código es obligatorio"),
  duracion: z.number().min(1, "La duración es obligatoria"),
  estado: z.boolean({
    error: "El estado es obligatorio",
  }),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  requisitos: z.string().min(1, "Los requisitos son obligatorios"),
});

export type ProgramType = z.infer<typeof ProgramaSchema>;
