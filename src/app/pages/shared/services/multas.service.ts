import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Multa } from '../models/multa.model';

@Injectable({
  providedIn: 'root'
})
export class MultasService {

  readonly apiPath = '/api'

  constructor(private http: HttpClient) { }

  getAll(ano: number): Observable<Multa[]> {
    return this.http
      .get<Multa[]>(`${this.apiPath}/${ano}`)
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      );
  }

  // PRIVATE METHODS
  private jsonDataToResources(jsonData: any[]): Multa[] {
    const resources: Multa[] = [];
    jsonData.forEach((element) =>
      resources.push(Multa.fromJson(element))
    );
    return resources;
  }

  private jsonDataToResource(jsonData: any[]): Multa {
    return Multa.fromJson(jsonData);
  }

  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição => ', error);
    return throwError(error);
  }
}
