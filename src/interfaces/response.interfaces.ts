
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