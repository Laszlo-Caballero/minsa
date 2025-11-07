import z from "zod";

export const ObstetraSchema = z.object({
  dni: z.number().min(1, "El dni es obligatorio"),
  nombres: z.string().min(1, "El nombre es obligatorio"),
  apellidos: z.string().min(1, "El apellido es obligatorio"),
  fecha_nacimiento: z.date({
    error: "La fecha de nacimiento es obligatorio",
  }),
  correo: z.string().min(1, "El correo es obligatorio"),
  telefono: z.number().min(1, "El telefono es obligatorio"),
  CMP: z.string().min(1, "CMP es obligatoria"),
  especialidad: z.string().min(1, "La especialidad es obligatoria"),
  estado: z.boolean({
    error: "El estado es obligatorio",
  }),
});

export type ObstetraType = z.infer<typeof ObstetraSchema>;
