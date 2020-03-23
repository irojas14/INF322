/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* En este archivo se escriben las aciones que serán llamadas por la vista, en general se debería obtener
 * datos de una API, pero acá, como ejemplo están escritos directamente. */

import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store.js';
import { ListaCursos} from '../reducers/cursos';
export const GET_CURSOS = 'GET_CURSOS';

export interface ActionGetCursos extends Action<'GET_CURSOS'> {cursos: ListaCursos};
export type CursosAction = ActionGetCursos;

type ThunkResult = ThunkAction<void, RootState, undefined, CursosAction>;

const CURSOS_LIST = [
   {
      "id": 1,
      "sigla": 'IWI131',
      "asignatura": 'Programación',
      "departamento": 'Informática' ,
      "semestre": '1er Semestre' ,
      "paralelos": [
        { "id": 1, "profesor": 'profe1', "cupos": 20, "semestre": 1},
        { "id": 2, "profesor": 'profe2', "cupos": 30, "semestre": 1},
        { "id": 3, "profesor": 'profe1', "cupos": 20, "semestre": 1},
        { "id": 4, "profesor": 'profe1', "cupos": 40, "semestre": 2},
        { "id": 5, "profesor": 'profe3', "cupos": 20, "semestre": 3},
        { "id": 6, "profesor": 'profe1', "cupos": 20, "semestre": 3}
      ]
  }, {
      "id": 2,
      "sigla": 'IWI133',
      "asignatura": 'Base de datos',
      "departamento": 'Informática' ,
      "semestre": '1er Semestre' ,
      "paralelos": [
        { "id": 1, "profesor": 'profe3', "cupos": 20, "semestre": 1},
        { "id": 2, "profesor": 'profe2', "cupos": 20, "semestre": 1},
        { "id": 3, "profesor": 'profe3', "cupos": 40, "semestre": 2},
        { "id": 4, "profesor": 'profe2', "cupos": 40, "semestre": 3}
      ]
  }, {
      "id": 3,
      "sigla": 'FIS100',
      "asignatura": 'Introducción a la Física',
      "departamento": 'Física' ,
      "semestre": '1er Semestre' ,
      "paralelos": [
        {"id": 1, "profesor": 'Hakobyan', "cupos": 50, "semestre": 1},
        {"id": 2, "profesor": 'profe3', "cupos": 20, "semestre": 2},
        {"id": 3, "profesor": 'Yansen', "cupos": 30, "semestre": 2},
        {"id": 4, "profesor": 'Hakobyan', "cupos": 50, "semestre": 3}
      ]
  }, {
      "id": 4,
      "sigla": 'MAT021',
      "asignatura": 'Matemáticas I',
      "departamento": 'Matemáticas',
      "semestre": '1er Semestre' ,
      "paralelos": [
        {"id": 1, "profesor": 'Yansen', "cupos": 35, "semestre": 1},
        {"id": 2, "profesor": 'Tuma', "cupos": 5, "semestre": 1},
        {"id": 1, "profesor": 'Yansen', "cupos": 50, "semestre": 2},
        {"id": 2, "profesor": 'Yansen', "cupos": 20, "semestre": 3},
        {"id": 1, "profesor": 'profe3', "cupos": 20, "semestre": 3}
      ]
  }, {
      "id": 5,
      "sigla": 'MAT022',
      "asignatura": 'Matemáticas II',
      "departamento": 'Matemáticas',
      "semestre": '2do Semestre' ,
      "paralelos": [
        {"id": 1, "profesor": 'Tuma', "cupos": 14, "semestre": 1},
        {"id": 2, "profesor": 'Tuma', "cupos": 7, "semestre": 2},
        {"id": 3, "profesor": 'Tuma', "cupos": 4, "semestre": 3}
      ]
  },  {
      "id": 6,
      "sigla": 'FIS110',
      "asignatura": 'Física I',
      "departamento": 'Física',
      "semestre": '2do Semestre' ,
      "paralelos": [
        {"id": 1, "profesor": 'Aravena', "cupos": 20, "semestre": 1},
        {"id": 2, "profesor": 'Espoz', "cupos": 7, "semestre": 2},
        {"id": 3, "profesor": 'Cvetic', "cupos": 4, "semestre": 3}
      ]
  }, {
      "id": 7,
      "sigla": 'IWI101',
      "asignatura": 'Introducción a la Ingeniería',
      "departamento": 'Informática',
      "semestre": '2do Semestre' ,
      "paralelos": [
        {"id": 1, "profesor": 'Torres', "cupos": 50, "semestre": 1},
        {"id": 2, "profesor": 'Moltedo', "cupos": 30, "semestre": 2}
      ]
  }, {
      "id": 8,
      "sigla": 'INF134',
      "asignatura": 'Estructura de Datos',
      "departamento": 'Informática',
      "semestre": '3er Semestre' ,
      "paralelos": [
        {"id": 1, "profesor": 'Hubert Hoffman', "cupos": 40, "semestre": 1},
      ]
  }, {
      "id": 9,
      "sigla": 'INF152',
      "asignatura": 'Estructuras Discretas',
      "departamento": 'Informática',
      "semestre": '3er Semestre' ,
      "paralelos": [
        {"id": 1, "profesor": 'Horst Von Brand', "cupos": 40, "semestre": 1},
      ]
  }, {
      "id": 10,
      "sigla": 'MAT023',
      "asignatura": 'Matemáticas III',
      "departamento": 'Matemáticas',
      "semestre": '3er Semestre' ,
      "paralelos": [
       {"id": 1, "profesor": 'Tuma', "cupos": 14, "semestre": 1},
       {"id": 2, "profesor": 'Tuma', "cupos": 7, "semestre": 2},
       {"id": 3, "profesor": 'Tuma', "cupos": 4, "semestre": 3}
      ]
  }, {
      "id": 11,
      "sigla": 'INF322',
      "asignatura": 'Diseño de Interaces Usuarias',
      "departamento": 'Informática',
      "semestre": "8vo Semestre",
      "paralelos": [
        {"id": 1, "profesor": 'H. Vargas', "cupos": 50, "semestre": 1}
      ]
  }, {
      "id": 12,
      "sigla": 'INF322',
      "asignatura": 'Economía IA',
      "departamento": 'Industrias',
      "semestre": "4to Semestre",
      "paralelos": [
        {"id": 1, "profesor": 'A.Sanchez', "cupos": 40, "semestre": 1},
        {"id": 2, "profesor": 'R. Sanchez', "cupos": 25, "semestre": 2},
        {"id": 3, "profesor": 'A. Vidal', "cupos": 35, "semestre": 3}
      ]
  },

];

export const getAllCursos: ActionCreator<ThunkResult> = () => (dispatch) => {
  const cursos = CURSOS_LIST.reduce((obj, curso) => {
    obj[curso.id] = curso;
    return obj
  }, {} as ListaCursos);

  dispatch({
    type: GET_CURSOS,
    cursos
  });
};
