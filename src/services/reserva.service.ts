import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ReservaGuardarModel } from '../models/reservaGuardarModel';
import { map, Observable } from 'rxjs';
import { ReservaModel } from '../models/reservaModel';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor() { }

  private httpClient = inject(HttpClient);

  guardarReserva(reserva: ReservaGuardarModel): Observable<ReservaGuardarModel> {

    return this.httpClient.post('https://671fe287e7a5792f052fdf93.mockapi.io/reservations', reserva).pipe(map(x => x as ReservaGuardarModel));
  }


  getReservas(): Observable<ReservaModel[]> {

    return this.httpClient.get('https://671fe287e7a5792f052fdf93.mockapi.io/reservations').pipe(map(x => x as ReservaModel[]));
  }


}
