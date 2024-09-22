import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formulario } from '../interfaces/formulario';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private apiUrl = 'http://localhost:5131/api/Formulario';

  constructor(private http: HttpClient) { }

  getFormularios() : Observable<Formulario[]> {
    return this.http.get<Formulario[]>(this.apiUrl);
  }

  getFormularioById(id: number): Observable<Formulario> {
    return this.http.get<Formulario>(`${this.apiUrl}/${id}`);
  }

  createFormulario(formulario: Formulario): Observable<Formulario> {
    return this.http.post<Formulario>(this.apiUrl, formulario);
  }

  updateFormulario(id: number, formulario: Formulario): Observable<Formulario> {
    return this.http.put<Formulario>(`${this.apiUrl}/${id}`, formulario);
  }

  deleteFormulario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
