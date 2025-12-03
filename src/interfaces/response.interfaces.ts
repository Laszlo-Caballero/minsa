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
  obstetra: Obstetra;
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

export interface Cita {
  citaId: number;
  fecha_cita: string;
  estado: string;
  motivo: string;
  obstetra: Obstetra;
  paciente: Paciente;
  programa: Programa;
}

export interface Atencion {
  atencionId: number;
  fecha_atencion: string;
  diagnostico: string;
  nota_clinica: string;
  estado: string;
  cita: Cita;
  paciente: Paciente;
  obstetra: Obstetra;
}

export interface Meta {
  metaId: number;
  objetivo: string;
  descripcion: string;
  estado: string;
  valor: number;
  meta_display: string;
  porcentaje: number;
  color?: string;
}

export interface Inicio {
  citas: Cita[];
  metas: Meta[];
  countCitasEsteMes: number;
  countCitasHoy: number;
}
