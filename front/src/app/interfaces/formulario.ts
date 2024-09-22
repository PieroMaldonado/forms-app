import { Campo } from './campo';

export interface Formulario {
    id_formulario?: number;
    nombre_formulario?: string;
    campos?: Campo[];
}