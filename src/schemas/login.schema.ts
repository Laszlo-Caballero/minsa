import z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "El usuario es obligatorio"),
  password: z.string().min(4, "La contraseña es obligatoria"),
});
