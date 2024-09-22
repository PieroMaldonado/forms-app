import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campo } from '../interfaces/campo';

@Injectable({
  providedIn: 'root'
})
export class CampoService {
  private apiUrl = 'http://localhost:5131/api/Campo';

  constructor(private http: HttpClient) { }

  getCampos(): Observable<Campo[]> {
    return this.http.get<Campo[]>(this.apiUrl);
  }

  getCamposByFormularioId(formularioId: number): Observable<Campo[]> {
    return this.http.get<Campo[]>(`${this.apiUrl}/${formularioId}`);
  }

  createCampo(campo: Campo): Observable<Campo> {
    return this.http.post<Campo>(this.apiUrl, campo);
  }

  updateCampo(id: number, campo: Campo): Observable<Campo> {
    return this.http.put<Campo>(`${this.apiUrl}/${id}`, campo);
  }

  deleteCampo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}