import z from "zod";

export const PacienteSchema = z.object({
  dni: z.number().min(1, "El dni es obligatorio"),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellidos: z.string().min(1, "El apellido es obligatorio"),
  fecha_nacimiento: z.date({
    error: "El estado es obligatorio",
  }),
  correo: z.string().min(1, "El correo es obligatorio"),
  telefono: z.number().min(1, "El telefono es obligatorio"),
  direccion: z.string().min(1, "La direccion es obligatoria"),
});

export type PacienteType = z.infer<typeof PacienteSchema>;
