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

 /* Variable para guardar el depto seleccionado */
  @property({type: String})
  private _selectedDepto: string = "";

  @property({type: String})
  private _selectedSemestre: string = "";

  @property({type: String})
  private _filtroTexto: string = "";

/* Variable para guardar el semestre seleccionado*/
  /*@property({type: String})
  private _selectedSemestre: string = "";*/


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
        
       .scrollit{
        overflow:scroll;
        height:500px;
        width:900px;
        background:ff8000;
        scrollbar-color: #cc6600 orange; /* thumb and track color */
        scrollbar-width: thin;
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

  private _onSemestreChange () {
      let selector = this.shadowRoot!.getElementById('semestre-select') as HTMLInputElement;
      console.log(selector);
      if (selector) {
          this._selectedSemestre = selector.value;
      }
  }


  _buscarTexto (text) {
    alert('Pronto nueva función');
  }





  protected render() {
    /* Vamos a trabajar con 'cursos', una copia filtrada de 'this.cursos'. */
    let cursos : ListaCursos = {} as ListaCursos;
    
    /*let filtrados = cursos['asignatura'].filter(asignatura => curso.asignatura.includes(text));*/


    if ((this._selectedSemestre)||(this._selectedDepto)){ // || mas filtros
        Object.keys(this.cursos).forEach((key:string) => {
            if ((this._selectedSemestre!="") && (this._selectedDepto=="")){
               if ((this.cursos[key].semestre === this._selectedSemestre)){
                 cursos[key] = this.cursos[key]
               }

            }
             if ((this._selectedSemestre=="") && (this._selectedDepto!="")){
               if ((this.cursos[key].departamento === this._selectedDepto)){
                 cursos[key] = this.cursos[key]
               }

            }
            if ((this._selectedSemestre!="") && (this._selectedDepto!="")){
               if ((this.cursos[key].departamento === this._selectedDepto) && (this.cursos[key].semestre === this._selectedSemestre)){
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

      let sem = new Array(); // Un array para guardar los semestres y posteriormente poder ordenarlos. 
    Object.values(this.cursos).forEach((curso:any) => {
      if !sem.includes(curso.semestre){
        sem.push(curso.semestre);
      } 
    }
    )
    sem.sort();

     let asignaturas = new Array(); // Un array para guardar los semestres y posteriormente poder ordenarlos. 
    Object.values(this.cursos).forEach((curso:any) => {
      if !asignaturas.includes(curso.asignatura){
        asignaturas.push(curso.asignatura);
      } 
    }
    )
    asignaturas.sort();



    return html`
    
   
    <h2>Listado de Cursos</h2>

    <form>
      <input class="search-input" placeholder="Nombre de la asignatura" size="35" type="text">
       <input type="button" value="Buscar" class="btn" @click="${this._buscarTexto}"></form>

      <!-- Selector de departamento para hacer el filtro -->
    <select id="dpto-select" class="selector" style="background-color:#ffae19;" @change="${this._onDepartamentoChange}">
        <option selected value="">Todos los departamentos</option>
        ${Array.from(dptos).map(d => html`
        <option value="${d}">${d}</option>
        `)}
        
    </select>
   
      <!-- Selector de semestre para hacer el filtro -->
    <select id="semestre-select" class="selector" style="background-color:#106cdb; color:#ffffff" @change="${this._onSemestreChange}">
        <option selected value="">Todos los semestres</option>
        ${Array.from(sem).map(d => html`
        <option value="${d}">${d}</option>
        `)}
    </select>
    

    <div class="scrollit">
    <table width="100%" border="1" cellpadding="0" cellspacing="1" bordercolor="#000000" style="border-collapse:collapse;border-color:#ddd; text-align:center">
      <tbody>
        <tr  style="background-color: yellow">
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

      </div>
    `;
    
  }
} 
