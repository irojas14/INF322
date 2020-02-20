/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, css, property, customElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { ListaCursos } from '../reducers/cursos';

@customElement('horario-clases')
export class HorarioClases extends connect(store)(LitElement) {
  @property({type: Object})
  public cursos: ListaCursos = {};

  /* Variable para guardar el depto selecionado */
  @property({type: String})
  private _selectedDepto: string = "";

  static get styles() {
    return [
      ButtonSharedStyles,
      css`
        :host {
            display: block;
        }

        .sigla {
            width: 10% 
        }
        
        .asignatura{
            width: 25%
        }
        
        .departamento{
            width: 13%
        }
        
        .paralelo{
            width: 22%
        }
        
        .profesor{
            width: 15%
        }
        
        .cupos{
            width: 5%
        }
        
        .horario{
            width: 10%
        }

        .selector{
            width: 30%
            font-family: Arial
            border: 6px solid transparent;
            border-color: #fff transparent transparent transparent;
        }
        
        .left{
            text-align: left;
        }
      `
    ];
  }
  

  /*Esto ocurre cuando el selector cambia, entonces se cambia this._selectedDepto que efectua el filtro. */
  private _onDepartamentoChange () {
      let selector = this.shadowRoot!.getElementById('dpto-select') as HTMLInputElement;
      console.log(selector);
      if (selector) {
          this._selectedDepto = selector.value;
      }
  }

  protected render() {
    /* Vamos a trabajar con 'cursos', una copia filtrada de 'this.cursos'. */
    let cursos : ListaCursos = {} as ListaCursos;
    if (this._selectedDepto) { // || mas filtros
        Object.keys(this.cursos).forEach((key:string) => {
            if (this.cursos[key].departamento === this._selectedDepto) { // Y más condiciones.
                cursos[key] = this.cursos[key]
            }
        });
    } else {
        cursos = this.cursos;
    }

    let dptos = new Set(); // Un Set para guardar los departamentos.
    Object.values(this.cursos).forEach((curso:any) => {
        dptos.add(curso.departamento);
    });

    return html`
    <h2>Listado de Cursos</h2>

    <!-- Selector de departamento para hacer el filtro -->
    <select id="dpto-select" class="selector" style="background-color:#ffae19;" @change="${this._onDepartamentoChange}">
        <option selected value="">Todos los departamentos</option>
        ${Array.from(dptos).map(d => html`
        <option value="${d}">${d}</option>
        `)}
    </select>

    <select class="selector" style="background-color:#ffae19;">
    <option>1er Semestre</option>
    <option>2do Semestre</option>
    <option>3er Semestre</option>
    <option>4to Semestre</option>
    <option>5to Semestre</option>
    <option>6to Semestre</option>
    <option>7mo Semestre</option>
    <option>8vo Semestre</option>
    <option>9no Semestre</option>
    <option>10mo Semestre</option>
    <option>11vo Semestre</option>
    <option>12vo Semestre</option>
    </select> 
    <table class="left">
      <tbody>
        <tr>
          <th class="sigla">
            <strong> Sigla </strong>
          </th>
          <th class="asignatura">
            <strong> Asignatura </strong>
          </th>
          <th class="departamento">
            <strong> Departamento </strong>
          </th>
          <th class="paralelo">
            <strong> Paralelo </strong>
          </th>
          <th class="profesor">
            <strong> Profesor </strong>
          </th>
          <th class="cupos">
            <strong> Cupos </strong>
          </th>
          <th class="horario">
            <strong> Horario </strong>
          </th>
        </tr>
      ${Object.keys(cursos).map((key) => {
        const item = cursos[key];
        return html`
        ${Object.keys(item.paralelos).map((idies) => {
          // @ts-ignore
          const item2 = item.paralelos[idies];
          if(idies == '0'){
            return html`
          <tr>
          <td>
            ${item.sigla}
          </td>
          <td>
            ${item.asignatura}
          </td>
          <td>
            ${item.departamento}
          </td>
          <td>
            ${item2.id}
          </td> 
          <td>
            ${item2.profesor}
          </td> 
          <td>
            ${item2.cupos}
          </td> 
          <td>
          <button @click="${() => {console.log(item2)}}">
          Detalles
          </button>
          </td> 
        </tr>
          `;
          } else {
            return html`
          <tr>
          <td>
            
          </td>
          <td>
             
          </td>
          <td>
             
          </td>
          <td>
            ${item2.id}
          </td> 
          <td>
            ${item2.profesor}
          </td> 
          <td>
            ${item2.cupos}
          </td> 
          <td>
          <button @click="${() => {console.log(item2)}}">
          Detalles
          </button>
          </td> 
        </tr>
          `;
          }
          
        })}
        `;
      })}
      </tbody>
      </table> 
    `;
  
  }
}
