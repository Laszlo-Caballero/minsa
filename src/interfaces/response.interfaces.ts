export interface Obstetra {
  IdObstetra: number;
  dni: number;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  correo: string;
  telefono: number;
  CMP: string;
  especialidad: string;
  estado: boolean;
}

export interface Programa {
  programaId: number;
  nombrePrograma: string;
  codigo: string;
  duracion: number;
  estado: boolean;
  descripcion: string;
  requisitos: string;
}

export interface User {
  userId: number;
  username: string;
  password: string;
  role: string;
}

export interface ResponseAuth extends User {
  token: string;
}

export interface ResponseApi<T> {
  data: T;
  message: string;
  status: number;
  errors?: string[] | string;
}
export interface Paciente {
  IdPaciente: number;
  dni: number;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string;
  correo: string;
  telefono: number;
  direccion: string;
}
